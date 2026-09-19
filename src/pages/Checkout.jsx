import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useAddresses } from "../contexts/AddressContext";
import { supabase } from "../utils/supabase";
import InputField from "../components/InputField";
import { validateAddress, emptyAddressForm } from "../utils/addressValidation";

export default function Checkout() {
  const { user } = useAuth();
  const { cartItems, itemsTotal, clearCart } = useCart();
  const { addresses, addAddress, loading: addressesLoading } = useAddresses();
  const navigate = useNavigate();

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState(emptyAddressForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);

 
  const defaultAddress = addresses.find((a) => a.is_default) || addresses[0];
useEffect(() => {
  if (!selectedAddressId && defaultAddress && !isAddingNew) {
    setSelectedAddressId(defaultAddress.id);
  }
}, [defaultAddress, selectedAddressId, isAddingNew]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (touched[name]) {
      setErrors(validateAddress(updated));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validateAddress(formData));
  };

  const handleSaveNewAddress = async () => {
    const allTouched = Object.keys(formData).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {},
    );
    setTouched(allTouched);

    const validationErrors = validateAddress(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return null;

    const saved = await addAddress({
      full_name: formData.fullName,
      phone: formData.phone,
      address_line1: formData.addressLine1,
      address_line2: formData.addressLine2 || null,
      city: formData.city,
      state: formData.state || null,
      zip_code: formData.zipCode,
      country: formData.country,
      is_default: addresses.length === 0,
    });

    return saved;
  };

  const handlePlaceOrder = async () => {
    if (!user || cartItems.length === 0) return;

    setPlacingOrder(true);
    try {
      let addressId = selectedAddressId;

      // Dacă userul completa o adresă nouă, o salvăm întâi
      if (isAddingNew || addresses.length === 0) {
        const saved = await handleSaveNewAddress();
        if (!saved) {
          setPlacingOrder(false);
          return;
        }
        addressId = saved.id;
      }

      if (!addressId) {
        alert("Please select or add a shipping address.");
        setPlacingOrder(false);
        return;
      }

      // 1. Creăm comanda
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
            shipping_address_id: addressId,
            payment_method: "cash_on_delivery",
            status: "pending",
            total_price: itemsTotal,
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Legăm toate itemii din coș de comanda nou creată
      const itemIds = cartItems.map((i) => i.id);
      const { error: linkError } = await supabase
        .from("order_items")
        .update({ order_id: order.id })
        .in("id", itemIds)
        .is("order_id",null);

      if (linkError) throw linkError;

      if (clearCart) {
        await clearCart();
      }

      navigate(`/order-confirmation/${order.id}`);
    } catch (err) {
      console.error("Error placing order:", err.message);
      alert("Something went wrong placing your order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] pt-24 gap-4">
        <h2 className="text-[26px] font-serif">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 pt-25 xl:pt-32 pb-16">
      <h2 className="text-[26px] sm:text-[32px] font-serif mb-6">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-8">
        <div className="flex flex-col gap-6">
          {/* Adrese existente */}
          {!addressesLoading && addresses.length > 0 && !isAddingNew && (
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-[17px]">Shipping address</h3>
              {addresses.map((addr) => (
                <label
                  key={addr.id}
                  className={`flex items-start gap-3 border rounded-xl p-4 cursor-pointer transition-colors ${
                    selectedAddressId === addr.id
                      ? "border-black"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddressId === addr.id}
                    onChange={() => setSelectedAddressId(addr.id)}
                    className="mt-1 accent-black cursor-pointer"
                  />
                  <div>
                    <p className="font-semibold">
                      {addr.full_name}{" "}
                      {addr.is_default && (
                        <span className="text-[12px] text-gray-500 font-normal">
                          (Default)
                        </span>
                      )}
                    </p>
                    <p className="text-[14px] text-gray-700">
                      {addr.address_line1}
                      {addr.address_line2 ? `, ${addr.address_line2}` : ""}
                    </p>
                    <p className="text-[14px] text-gray-700">
                      {addr.city}, {addr.state ? `${addr.state} ` : ""}
                      {addr.zip_code}
                    </p>
                    <p className="text-[14px] text-gray-700">{addr.country}</p>
                    <p className="text-[14px] text-gray-600 mt-1">
                      {addr.phone}
                    </p>
                  </div>
                </label>
              ))}

              <button
                onClick={() => setIsAddingNew(true)}
                className="text-blue-700 font-semibold text-[14px] hover:underline self-start cursor-pointer"
              >
                + Add a new address
              </button>
            </div>
          )}

          {/* Formular adresă nouă */}
          {(isAddingNew || addresses.length === 0) && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[17px]">
                  {addresses.length === 0 ? "Shipping address" : "New address"}
                </h3>
                {addresses.length > 0 && (
                  <button
                    onClick={() => setIsAddingNew(false)}
                    className="text-[13px] text-gray-500 hover:text-gray-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <InputField
                name="fullName"
                label="Full name"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.fullName}
                touched={touched.fullName}
              />
              <InputField
                name="phone"
                label="Phone number"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                touched={touched.phone}
              />
              <InputField
                name="addressLine1"
                label="Address"
                value={formData.addressLine1}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.addressLine1}
                touched={touched.addressLine1}
              />
              <InputField
                name="addressLine2"
                label="Apt, suite, etc. (optional)"
                value={formData.addressLine2}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.addressLine2}
                touched={touched.addressLine2}
              />

              <div className="grid grid-cols-2 gap-3">
                <InputField
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.city}
                  touched={touched.city}
                />
                <InputField
                  name="state"
                  label="State (optional)"
                  value={formData.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.state}
                  touched={touched.state}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <InputField
                  name="zipCode"
                  label="Zip code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.zipCode}
                  touched={touched.zipCode}
                />
                <InputField
                  name="country"
                  label="Country"
                  value={formData.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.country}
                  touched={touched.country}
                />
              </div>
            </div>
          )}

          {/* Metodă de plată */}
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
            <h3 className="font-semibold text-[17px] pt-4">Payment method</h3>
            <div className="flex items-center gap-3 border border-black rounded-xl p-4">
              <input type="radio" checked readOnly className="accent-black" />
              <span className="font-medium">Cash on delivery</span>
            </div>
          </div>
        </div>

        {/* Sumar comandă */}
        <div className="flex flex-col gap-4 h-fit md:sticky md:top-28">
          <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
            <div className="flex justify-between text-[15px]">
              <span>Item(s) total</span>
              <span>${itemsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[15px] text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="h-[1px] bg-gray-200 my-1" />
            <div className="flex justify-between text-[17px] font-bold">
              <span>Total</span>
              <span>${itemsTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder}
              className="mt-2 bg-[#1050D0] text-white font-semibold py-3 rounded-full hover:bg-[#0c3fb3] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {placingOrder ? "Placing order..." : "Place order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
