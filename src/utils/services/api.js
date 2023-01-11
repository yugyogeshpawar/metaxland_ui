import axios from "axios";

const URL = "http://localhost:3001";

let Sold_Area = {};
export const GetSoldTiles = async() => {
  try {
    Sold_Area = await axios.get(`${URL}/show`)
    // console.log(Sold_Area);
    return Sold_Area.data;
  } catch (error) {
    console.log("error while calling get api ", error);
  }
};

export const SaveSoldTiles = async (selctedSet) => {
  const dataTosave = {
    value: selctedSet
  }
  console.log(selctedSet);
  try {
    return await axios.post(`${URL}/store`, dataTosave);
  } catch (error) {
    console.log("error while calling store api ", error);
  }
}
