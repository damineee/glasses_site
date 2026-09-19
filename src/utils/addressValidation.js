export function validateAddress(data) {
  const errs = {};

  if (!data.fullName.trim()) errs.fullName = "Full name is required.";

  if (!data.phone.trim()) {
    errs.phone = "Phone number is required.";
  } else if (!/^[0-9+()\-\s]{7,20}$/.test(data.phone.trim())) {
    errs.phone = "Enter a valid phone number.";
  }

  if (!data.addressLine1.trim()) errs.addressLine1 = "Address is required.";
  if (!data.city.trim()) errs.city = "City is required.";
if (!data.country.trim()) errs.country = "Country is required.";
  if (!data.zipCode.trim()) {
    errs.zipCode = "Zip code is required.";
  } else if (!/^\d{5}(-\d{4})?$/.test(data.zipCode.trim())) {
    errs.zipCode = "Enter a valid zip code.";
  }

  return errs;
}

export const emptyAddressForm = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
};
