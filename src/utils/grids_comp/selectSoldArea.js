export const SelectSoldAreaa = (Sold_area, bbox) => {
  let output;
  let bbb = [];
  // bbb = bbox[0].toFixed(8) + " " + bbox[1].toFixed(8) + " " + bbox[2].toFixed(8) + " " + bbox[3].toFixed(8);
  // bbb[0] = bbox[0].toFixed(8);
  // bbb[1] = bbox[1].toFixed(8);
  // bbb[2] = bbox[2].toFixed(8);
  // bbb[3] = bbox[3].toFixed(8);
  bbb = [0.9985154, 1.0004939, 0.99860533, 1.00058384]


  console.log({bbb});
  Sold_area.forEach((element, i) => {
    let ele = new Set(element.value);
    console.log(ele);
    if (ele.has(bbb)) {
      output = element;
      return;
    }
  });
  return output;
};
