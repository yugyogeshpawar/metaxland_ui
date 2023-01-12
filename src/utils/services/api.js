import axios from "axios";

const URL = "http://localhost:3001";
let lastLat, lastLan ;

let Sold_Area = {};
export const GetSoldTiles = async () => {
  
  try {
    Sold_Area = await axios.get(`${URL}/show`)
    // console.log(Sold_Area);
    return Sold_Area.data;
  } catch (error) {
    console.log("error while calling get api ", error);
  }
};

export const GetSoldTile = async (viewState) => {
  // console.log(viewState.longitude, viewState.latitude, viewState.zoom);
  // console.log(lastOne, viewState.latitude);
  if (typeof lastLat === "undefined" || (lastLat + 0.001) < viewState.latitude || (lastLat + 0.001) < viewState.latitude)   {
    console.log(viewState.longitude);
    console.log(viewState.latitude);
    lastLat = viewState.latitude
    lastLan = viewState.longitude
  }
}

export const SaveSoldTiles = async (selctedSet) => {

  if (selctedSet.length<1) return;
  const dataTosave = {
    value: selctedSet
  }
  try {
    return await axios.post(`${URL}/store`, dataTosave);
  } catch (error) {
    console.log("error while calling store api ", error);
  }
}

export const DeleteSoldArea = async(SoldSelCells) => {
  console.log(SoldSelCells);
}
