import axios from "axios";

const URL = "http://localhost:3001";
let lastLat, lastLog;

let Sold_Area = {};

export const GetAllSoldTiles = async () => {
  try {
    Sold_Area = await axios.get(`${URL}/show`);
    console.log(Sold_Area);
    return Sold_Area.data;
  } catch (error) {
    console.log("error while calling get api ", error);
  }
};

export const GetSoldTiles = async (viewState) => {
  // console.log(viewState.longitude, viewState.latitude, viewState.zoom);
  console.log(viewState.longitude, viewState.latitude);
  // console.log((lastLog),viewState.longitude);

  if (
    viewState.zoom > 16 &&
    (typeof lastLog === "undefined" ||
      lastLog + 0.001 < viewState.longitude ||
      lastLat + 0.001 < viewState.latitude ||
      viewState.longitude < lastLog - 0.001 ||
      viewState.latitude < lastLat - 0.001)
  ) {
    lastLog = viewState.longitude;
    lastLat = viewState.latitude;

    try {
      //  console.log( await axios.post(`${URL}/gettiles`, viewState))
    } catch (error) {
      console.log("error while calling store api ", error);
    }
  }

  try {
    console.log(await axios.post(`${URL}/gettiles`, viewState));
  } catch (error) {
    console.log("error while calling store api ", error);
  }
};

export const SaveSoldTiles = async (selctedSet) => {
  if (selctedSet.length < 1) return;
  const dataTosave = {
    value: selctedSet,
  };
  // selctedSet.forEach(element => {
  //   console.log(element.split(" "));

  // });

  try {
    return await axios.post(`${URL}/store`, dataTosave);
  } catch (error) {
    console.log("error while calling store api ", error);
  }
};

export const DeleteSoldArea = async (soldSelectedArea) => {
  console.log(soldSelectedArea);
};
