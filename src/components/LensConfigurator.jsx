import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  STEP_TYPES,
  getNextAfterPrescription,
  getNextAfterReaderStrength,
  getNextAfterLensType,
  getNextAfterLensColor,
  getNextAfterLensMaterial,
} from "../utils/lensConfigSteps";
import { supabase } from "../utils/supabase";

export default function LensConfigurator({
  isOpen,
  onClose,
  product,
  variant,
  onAddToCart,
}) {
  const [stepStack, setStepStack] = useState([STEP_TYPES.PRESCRIPTION]);
  const [direction, setDirection] = useState("forward");
  const [previewOverride, setPreviewOverride] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [config, setConfig] = useState({
    prescriptionType: null,
    readerStrength: null,
    lensType: null,
    lensColor: null,
    lensMaterial: null,
  });

  const [options, setOptions] = useState({
    prescriptionTypes: [],
    readerStrengths: [],
    lensTypes: [],
    lensColors: [],
    lensMaterials: [],
  });
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);

  // Reset complet de fiecare dată când se deschide configuratorul
  useEffect(() => {
    if (isOpen) {
      setStepStack([STEP_TYPES.PRESCRIPTION]);
      setPreviewOverride(null);
      setConfig({
        prescriptionType: null,
        readerStrength: null,
        lensType: null,
        lensColor: null,
        lensMaterial: null,
      });
    }
  }, [isOpen]);

  // Fetch inițial — datele de bază, o singură dată
  useEffect(() => {
    if (!isOpen) return;

    const fetchAllOptions = async () => {
      const [presc, strengths, lensTypes, materials] = await Promise.all([
        supabase.from("prescription_types").select("*").order("display_order"),
        supabase.from("reader_strengths").select("*").order("display_order"),
        supabase.from("lens_types").select("*").order("display_order"),
        supabase.from("lens_materials").select("*").order("display_order"),
      ]);

      setOptions((prev) => ({
        ...prev,
        prescriptionTypes: presc.data || [],
        readerStrengths: strengths.data || [],
        lensTypes: lensTypes.data || [],
        lensMaterials: materials.data || [],
      }));
    };

    fetchAllOptions();
  }, [isOpen]);

  const fetchLensColors = async (lensTypeId) => {
    const { data, error } = await supabase
      .from("lens_colors")
      .select("*, variant_lens_previews!left(image_url, variant_id)")
      .eq("lens_type_id", lensTypeId);

    if (error) {
      console.error("Error fetching lens colors:", error.message);
      return;
    }

    const withPreview = (data || []).map((color) => ({
      ...color,
      previewImage:
        color.variant_lens_previews?.find((p) => p.variant_id === variant?.id)
          ?.image_url || null,
    }));

    setOptions((prev) => ({ ...prev, lensColors: withPreview }));
  };

  const pushStep = (nextStep) => {
    setDirection("forward");
    setStepStack((prev) => [...prev, nextStep]);
  };

const goBack = () => {
  setDirection("back");

  // Doar scoatem ultimul pas din stivă, PĂSTRĂM opțiunile selectate în config
  setStepStack((prev) => prev.slice(0, -1));
  setPreviewOverride(null);
};



  const currentStep = stepStack[stepStack.length - 1];
  const canGoBack = stepStack.length > 1;

  const handleSelectPrescription = (type) => {
    setConfig((prev) => ({
      ...prev,
      prescriptionType: type,
      readerStrength: null,
    }));
    pushStep(getNextAfterPrescription(type));
  };

  const handleSelectReaderStrength = (strength) => {
    setConfig((prev) => ({ ...prev, readerStrength: strength }));
    pushStep(getNextAfterReaderStrength());
  };

  const handleSelectLensType = async (lensType) => {
    setConfig((prev) => ({ ...prev, lensType, lensColor: null }));
    if (lensType.requires_color) {
      await fetchLensColors(lensType.id);
    }
    pushStep(getNextAfterLensType(lensType));
  };

  const handleSelectLensColor = (color) => {
    setConfig((prev) => ({ ...prev, lensColor: color }));
    setPreviewOverride(color.previewImage);
    pushStep(getNextAfterLensColor());
  };

  const handleSelectLensMaterial = (material) => {
    setConfig((prev) => ({ ...prev, lensMaterial: material }));
    pushStep(getNextAfterLensMaterial());
  };

const subtotal = useMemo(() => {
  let total = 0;

  if (config.prescriptionType) {
    total += config.prescriptionType.base_price || 0;
  }
  if (config.lensType) {
    total += config.lensType.extra_price || 0;
  }
  if (config.lensColor) {
    total += config.lensColor.extra_price || 0;
  }
  if (config.lensMaterial) {
    total += config.lensMaterial.extra_price || 0;
  }

  return total;
}, [config]);

  const handleClose = () => {
    onClose();
  };

  const handleFinalAdd = async () => {
    setSubmitting(true);
    try {
      await onAddToCart({
        variantId: variant.id,
        prescriptionTypeId: config.prescriptionType?.id,
        readerStrengthId: config.readerStrength?.id || null,
        lensTypeId: config.lensType?.id,
        lensColorId: config.lensColor?.id || null,
        lensMaterialId: config.lensMaterial?.id,
        unitPrice: subtotal,
      });
      handleClose();
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const displayImage = previewOverride || config.lensColor?.previewImage || variant?.main_image_url;

  const slideVariants = {
    enter: (dir) => ({
      x: dir === "forward" ? "100%" : "-30%",
      opacity: dir === "forward" ? 1 : 0.5,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: dir === "forward" ? "-30%" : "100%",
      opacity: dir === "forward" ? 0.5 : 1,
    }),
  };

  return (
    <div className="fixed inset-0 z-50 flex ">
      {/* Poza fixă, nu se schimbă la navigare între pași */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#FCFBF9] relative">
        <img
          src={displayImage || "https://placehold.co/400"}
          alt={product?.name}
          className="max-w-[70%] max-h-[70%] object-contain transition-opacity duration-300"
        />
        <div className="absolute bottom-8 left-8">
          <p className="font-serif text-[22px]">{product?.name}</p>
          <p className="text-gray-600 text-[14px] italic">
            {variant?.color_name}
          </p>
        </div>
      </div>

      {/* Overlay pentru mobil */}
      <div
        onClick={handleClose}
        className="md:hidden fixed inset-0 bg-black/30"
      />

      {/* Panoul drept, cu pașii */}
      <div className="relative w-full md:w-[420px] h-full bg-white overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          {canGoBack ? (
            <button
              onClick={goBack}
              className="cursor-pointer"
              aria-label="Back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          ) : (
            <div className="w-6" />
          )}
          <button
            onClick={handleClose}
            className="cursor-pointer"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 overflow-y-auto px-6 py-6"
            >
              {currentStep === STEP_TYPES.PRESCRIPTION && (
                <ChoiceList
                  title="Select a prescription type"
                  items={options.prescriptionTypes}
                  selectedId={config.prescriptionType?.id}
                  renderPrice={(item) => `$${item.base_price}`}
                  onSelect={handleSelectPrescription}
                />
              )}

              {currentStep === STEP_TYPES.READER_STRENGTH && (
                <StrengthGrid
                  title="Select a readers strength"
                  items={options.readerStrengths}
                  selectedId={config.readerStrength?.id}
                  onSelect={handleSelectReaderStrength}
                />
              )}

              {currentStep === STEP_TYPES.LENS_TYPE && (
                <ChoiceList
                  title="Select a lens type"
                  items={options.lensTypes}
                  selectedId={config.lensType?.id}
                  renderPrice={(item) =>
                    item.extra_price > 0 ? `+$${item.extra_price}` : "Free"
                  }
                  onSelect={handleSelectLensType}
                />
              )}

              {currentStep === STEP_TYPES.LENS_COLOR && (
                <ChoiceList
                  title="Select a color"
                  items={options.lensColors}
                  selectedId={config.lensColor?.id}
                  onSelect={handleSelectLensColor}
                  onHoverItem={(color) =>
                    setPreviewOverride(color.previewImage)
                  }
                  onLeaveItem={() =>
                    setPreviewOverride( null)
                  }
                />
              )}

              {currentStep === STEP_TYPES.LENS_MATERIAL && (
                <ChoiceList
                  title="Select a lens material"
                  items={options.lensMaterials}
                  selectedId={config.lensMaterial?.id}
                  renderPrice={(item) =>
                    item.extra_price > 0 ? `+$${item.extra_price}` : "Free"
                  }
                  onSelect={handleSelectLensMaterial}
                />
              )}

              {currentStep === STEP_TYPES.SUMMARY && (
                <SummaryPanel
                  config={config}
                  onConfirm={handleFinalAdd}
                  submitting={submitting}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-white shrink-0">
          <span className="font-semibold text-gray-700">Subtotal</span>
          <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function ChoiceList({
  title,
  items, 
  selectedId,
  renderPrice,
  onSelect,
  onHoverItem,
  onLeaveItem,
 
}) {
  return (
    <div>
      <h2 className="font-serif text-[26px] text-center mb-6">{title}</h2>
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const isSelected=item.id ===selectedId;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            onMouseEnter={() => onHoverItem?.(item)}
            onMouseLeave={() => onLeaveItem?.()}
            className={`flex justify-between items-start text-left border rounded-xl p-4  transition-colors cursor-pointer 
              ${isSelected ? "border-black" : "border-gray-200 hover:border-gray-600"}`}
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              {item.description && (
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              )}
            </div>
            {renderPrice && (
              <span className="font-semibold whitespace-nowrap ml-3">
                {renderPrice(item)}
              </span>
            )}
          </button>
        );
})}
      </div>
    </div>
  );
}

function StrengthGrid({ title, items,selectedId, onSelect }) {
  return (
    <div>
      <h2 className="font-serif text-[26px] text-center mb-6">{title}</h2>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => {
          const isSelected = item.id === selectedId;
          return ( 
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`border  rounded-xl py-4 font-semibold  transition-colors cursor-pointer  ${isSelected ? "border-transparent text-white bg-blue-500" : "border-gray-200 hover:border-gray-600 text-black"}`}
          >
            {item.label}
          </button>
          );
})}
      </div>
    </div>
  );
}

function SummaryPanel({ config, onConfirm, submitting }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-serif text-[26px] text-center mb-2">
        Review your selection
      </h2>
      <SummaryRow label="Prescription" value={config.prescriptionType?.name} />
      {config.readerStrength && (
        <SummaryRow label="Strength" value={config.readerStrength.label} />
      )}
      <SummaryRow label="Lens type" value={config.lensType?.name} />
      {config.lensColor && (
        <SummaryRow label="Color" value={config.lensColor.name} />
      )}
      <SummaryRow label="Material" value={config.lensMaterial?.name} />

      <button
        onClick={onConfirm}
        disabled={submitting}
        className="mt-6 bg-[#1050D0] text-white font-semibold py-3 rounded-full hover:bg-[#0c3fb3] transition-colors disabled:opacity-50 cursor-pointer"
      >
        {submitting ? "Adding..." : "Add to cart"}
      </button>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-100 pb-3">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
