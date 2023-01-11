import axios from "axios";

const URL = "http://localhost:3001/api/data";


export const GetSoldTiles = () => {
  try {
    axios
      .get(URL)
      .then(function (response) {
        // handle success
        // console.log(response);
        
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
};

export const SaveSoldTiles = () => {
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
