const normalizeBetweenTwoRanges = (
  val,
  minVal,
  maxVal,
  newMin,
  newMax
) => {
  const newVal =
    newMin + ((val - minVal) * (newMax - newMin)) / (maxVal - minVal);
  if (newVal < newMin) return newMin;
  if (newVal > newMax) return newMax;
  return newVal;
};

export default normalizeBetweenTwoRanges;
