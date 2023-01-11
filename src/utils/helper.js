export const round = (value) => {
  return Math.floor(value * 10 ** 6) / 10 ** 6;
};

export const FindOthers = (x, y) => {
        let xDiff = y[0] - x[0];
        let yDiff = y[1] - x[1];
        let output = [];
        if (xDiff >= 0 && yDiff <= 0) {
          for (let i = 0; i <= Math.abs(yDiff); i++) {
            for (let j = 0; j <= xDiff; j++) {
              let toAdd = [];
              toAdd.push(x[0] + j);
              toAdd.push(x[1] - i);
              output.push(toAdd);
            }
          }
        } else if (xDiff >= 0 && yDiff >= 0) {
          for (let i = 0; i <= yDiff; i++) {
            for (let j = 0; j <= xDiff; j++) {
              let toAdd = [];
              toAdd.push(x[0] + j);
              toAdd.push(x[1] + i);
              output.push(toAdd);
            }
          }
        } else if (xDiff <= 0 && yDiff >= 0) {
          for (let i = 0; i <= yDiff; i++) {
            for (let j = 0; j <= Math.abs(xDiff); j++) {
              let toAdd = [];
              toAdd.push(x[0] - j);
              toAdd.push(x[1] + i);
              output.push(toAdd);
            }
          }
        } else {
          for (let i = 0; i <= Math.abs(yDiff); i++) {
            for (let j = 0; j <= Math.abs(xDiff); j++) {
              let toAdd = [];
              toAdd.push(x[0] - j);
              toAdd.push(x[1] - i);
              output.push(toAdd);
            }
          }
        }
        return output;
      };