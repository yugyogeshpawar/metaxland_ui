import axios from "axios";

const URL = "http://localhost:3001/api/data";

let Sold_Area = {};
export const GetSoldTiles = async() => {
  try {
    Sold_Area = await axios.get(URL)
    return Sold_Area.data;
  
  } catch (error) {
    console.log("error while calling api ", error);
  }
};

export const saveSoldTiles = () => {
  try {
    axios
      .post(`${URL}/store`,)
      .then(function (response) {
        // handle success
        return response.data;
      })
      .catch(function (error) {
        // handle error
        console.log("error");
      })
      .then(function () {
        // always executed
        console.log("Done");
      });
  } catch (error) {
    console.log("error while calling api ", error);
  }
}
