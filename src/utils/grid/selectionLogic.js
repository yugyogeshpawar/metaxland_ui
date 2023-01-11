
/**
   * @param {MaplibreGrid starting Point array(a,b)}
   * @param {MaplibreGrid End Point array(e,f)}
   * @returns {arrays - from array(a,b) to array(e,f) - (ab,ac,ad,af,bb,bc,bd,bf)}
   */

const findOthers = (x, y) => {

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
    // console.log(output);
    return output;
}


/**     
* @param {arrays - from array(a,b) to array(e,f) - (ab,ac,ad,af,bb,bc,bd,bf)}
* @return {(a,b) to bbox} and pushed to update grid
*/

const convertToBboxs = (arrays, difference, selectedCells) => {

    let array = [];
    let output = [];

    for (let i = 0; i < arrays.length; i++) {
        array = []

        array.push(arrays[i][0] * difference);
        array.push(arrays[i][1] * difference);
        array.push((arrays[i][0] * difference) + difference);
        array.push((arrays[i][1] * difference) + difference);

        if (checkSelection(array) == -1) {
            updateGridLayer(array, selectedCells);
        }
    }
    // return output;
}


/**     
* @param {arrays - (a,b)}
* @return {bbox - ( x, x+1, y, y+1 )} 
*/

const convertToBbox = (arrays, difference) => {
    let array = [];

    array.push(arrays[0][0] * difference);
    array.push(arrays[0][1] * difference);
    array.push((arrays[0][0] * difference) + difference);
    array.push((arrays[0][1] * difference) + difference);
    return array;
}


/**     
* @param {MaplibreGrid starting Point array(in bbox)}
* @param {MaplibreGrid Ending Point array(in bbox)}
* @return {void}
*/



const createOtherBbox = (bbox1, bbox2, selectedCellsId) => {

    let difference = 0.00089932036;
    let digit1, digit2, digit3, digit4;

    digit1 = bbox1[0] / difference;
    digit2 = bbox1[1] / difference;
    digit3 = bbox2[0] / difference;
    digit4 = bbox2[1] / difference;

    let arr1 = [Math.round(digit1), Math.round(digit2)];
    let arr2 = [Math.round(digit3), Math.round(digit4)];
    let arrays = findOthers(arr1, arr2);
    let bboxs = convertToBbox(arrays, difference, selectedCellsId);

};






