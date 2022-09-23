const normalizeBetweenTwoRanges = (
  val: number,
  minVal: number,
  maxVal: number,
  newMin: number,
  newMax: number
) => {
  const newVal =
    newMin + ((val - minVal) * (newMax - newMin)) / (maxVal - minVal);
  if (newVal < newMin) return newMin;
  if (newVal > newMax) return newMax;
  return newVal;
};

export default normalizeBetweenTwoRanges;
