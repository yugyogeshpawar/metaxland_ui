export const SelectSoldAreaa = (Sold_area, bbox) => {
  let output;
  Sold_area.forEach((element, i) => {
    let ele = new Set(element);
    let bbb =
      bbox[0].toFixed(8) +
      " " +
      bbox[1].toFixed(8) +
      " " +
      bbox[2].toFixed(8) +
      " " +
      bbox[3].toFixed(8);

    if (ele.has(bbb)) {
      output = element;
      return;
    }
  });
  return output;
};
