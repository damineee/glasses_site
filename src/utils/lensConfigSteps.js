export const STEP_TYPES = {
  PRESCRIPTION: "prescription",
  READER_STRENGTH: "readerStrength",
  LENS_TYPE: "lensType",
  LENS_COLOR: "lensColor",
  LENS_MATERIAL: "lensMaterial",
  SUMMARY: "summary",
};

export function getNextAfterPrescription(prescriptionType) {
  return prescriptionType.requires_strength
    ? STEP_TYPES.READER_STRENGTH
    : STEP_TYPES.LENS_TYPE;
}

export function getNextAfterReaderStrength() {
  return STEP_TYPES.LENS_TYPE;
}

export function getNextAfterLensType(lensType) {
  return lensType.requires_color
    ? STEP_TYPES.LENS_COLOR
    : STEP_TYPES.LENS_MATERIAL;
}

export function getNextAfterLensColor() {
  return STEP_TYPES.LENS_MATERIAL;
}

export function getNextAfterLensMaterial() {
  return STEP_TYPES.SUMMARY;
}
