import { useState } from "react";
import { useAddresses } from "../contexts/AddressContext";
import InputField from "../components/InputField";
import { validateAddress, emptyAddressForm } from "../utils/addressValidation";

export default function AddressBook() {
  const {
    addresses,
    addAddress,
    removeAddress,
    updateAddress,
    setDefaultAddress,
    loading,
  } = useAddresses();
  const [editingId, setEditingId] = useState(null); // null = fără formular deschis, "new" = adăugare
  const [formData, setFormData] = useState(emptyAddressForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [saving, setSaving] = useState(false);

  const openNewForm = () => {
    setFormData(emptyAddressForm);
    setErrors({});
    setTouched({});
    setEditingId("new");
  };

  const openEditForm = (addr) => {
    setFormData({
      fullName: addr.full_name,
      phone: addr.phone,
      addressLine1: addr.address_line1,
      addressLine2: addr.address_line2 || "",
      city: addr.city,
      state: addr.state || "",
      zipCode: addr.zip_code,
      country: addr.country || "United States",
    });
    setErrors({});
    setTouched({});
    setEditingId(addr.id);
  };

  const closeForm = () => setEditingId(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (touched[name]) setErrors(validateAddress(updated));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validateAddress(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {},
    );
    setTouched(allTouched);

    const validationErrors = validateAddress(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    try {
      const payload = {
        full_name: formData.fullName,
        phone: formData.phone,
        address_line1: formData.addressLine1,
        address_line2: formData.addressLine2 || null,
        city: formData.city,
        state: formData.state || null,
        zip_code: formData.zipCode,
        country: formData.country,
      };

      if (editingId === "new") {
        await addAddress({ ...payload, is_default: addresses.length === 0 });
      } else {
        await updateAddress(editingId, payload);
      }

      closeForm();
    } catch {
      alert("Something went wrong saving the address. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (addressId) => {
    if (!confirm("Remove this address?")) return;
    removeAddress(addressId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 pt-24 text-gray-500">
        Loading addresses...
      </div>
    );
  }

  return (
    <div className="w-full max-w-[700px] mx-auto px-4 sm:px-6 pt-25 xl:pt-32 pb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[26px] sm:text-[32px] font-serif">
          Your addresses
        </h2>
        {editingId === null && (
          <button
            onClick={openNewForm}
            className="text-blue-700 font-semibold text-[14px] hover:underline cursor-pointer"
          >
            + Add new
          </button>
        )}
      </div>

      {editingId !== null && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 border border-gray-200 rounded-xl p-5 mb-6"
        >
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-[16px]">
              {editingId === "new" ? "New address" : "Edit address"}
            </h3>
            <button
              type="button"
              onClick={closeForm}
              className="text-[13px] text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              Cancel
            </button>
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

          <button
            type="submit"
            disabled={saving}
            className="mt-2 bg-[#1050D0] text-white font-semibold py-3 rounded-full hover:bg-[#0c3fb3] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? "Saving..." : "Save address"}
          </button>
        </form>
      )}

      {addresses.length === 0 && editingId === null && (
        <p className="text-gray-600">You don't have any saved addresses yet.</p>
      )}

      <div className="flex flex-col gap-3">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="border border-gray-200 rounded-xl p-4 flex justify-between items-start"
          >
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
                {addr.city}
                {addr.state ? `, ${addr.state}` : ""} {addr.zip_code}
              </p>
              <p className="text-[14px] text-gray-700">{addr.country}</p>
              <p className="text-[14px] text-gray-600 mt-1">{addr.phone}</p>

              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => openEditForm(addr)}
                  className="text-[13px] text-blue-700 font-semibold hover:underline cursor-pointer"
                >
                  Edit
                </button>
                {!addr.is_default && (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-[13px] text-blue-700 font-semibold hover:underline cursor-pointer"
                  >
                    Set as default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-[13px] text-red-600 font-semibold hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
