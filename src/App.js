import React, { useRef, useEffect, useState, useMemo } from "react";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Source,
  Layer,
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
  ScaleControl,
} from "react-map-gl";
import { FindOthers } from "./utils/helper";
import {
  mapboxStyle,
  mapboxglAccessToken,
  MAX_TILE_LIMIT,
} from "./utils/consts";
import * as MaplibreGrid from "./utils/grid/index";
import { Sold_area } from "./utils/consts/soldArea";
import { CreateGeojson } from "./utils/createGeoJson";
import { SelectSoldAreaa } from "./utils/grids_comp/selectSoldArea";
import {
  GetAllSoldTiles,
  SaveSoldTiles,
  DeleteSoldArea,
  GetSoldTiles,
} from "./utils/services/api";
import Leftmenus from './components/Leftmenus'



function App() {


  const [viewState, setViewState] = useState({
    longitude: 72.52783064016589,
    latitude: 23.03354684389069,
    zoom: 17
  });

  let bbox1 = [];
  let active = false;
  let dif = 0.0000899320363724538;
  const [selctedSet, setSelctedSet] = useState(new Set());
  
  const [selectedCells, setCellsToArray] = useState([]);
  const [sCells, setCells] = useState([]);
  const [SoldCells, setSoldCells] = useState([]);
  const [SoldSelCells, setSelSoldCells] = useState([]);


  const geojson = useMemo(
    () => ({
      type: "FeatureCollection",
      features: selectedCells,
    }),
    [selectedCells]
  );

  const geojson2 = useMemo(
    () => ({
      type: "FeatureCollection",
      features: sCells,
    }),
    [sCells]
  );

  const geojson3 = useMemo(
    () => ({
      type: "FeatureCollection",
      features: SoldCells,
    }),
    [SoldCells]
  );

  const geojson4 = useMemo(
    () => ({
      type: "FeatureCollection",
      features: SoldSelCells,
    }),
    [SoldCells]
  );

  const grid = new MaplibreGrid.Grid({
    gridWidth: 0.01,
    gridHeight: 0.01,
    units: "kilometers",
    minZoom: 16,
    maxZoom: 24,
    paint: {
      "line-opacity": 0.35,
      "line-color": "#fff",
    },
  });

  const layerStyle = {
    id: "selected-cells",
    type: "fill",
    layout: {},
    paint: {
      "fill-color": "#0000FF",
      "fill-opacity": 0.4,
    },
  };

  const layerStyle2 = {
    id: "selected-cells2",
    type: "fill",
    layout: {},
    paint: {
      "fill-color": "#f08",
      "fill-opacity": 0.4,
    },
  };

  const layerStyle3 = {
    id: "sold_area",
    type: "fill",
    layout: {},
    paint: {
      "fill-color": "#FFF",
      "fill-opacity": 0.3,
    },
  };

  const layerStyle4 = {
    id: "sold_sel_area",
    type: "fill",
    layout: {},
    paint: {
      "fill-color": "#f08",
      "fill-opacity": 0.4,
    },
  };
  const layerStyle5 = {
    // id: "sold_sel_area",
    // type: "fill",
    // layout: {},
    // paint: {
    //   "fill-color": "#f08",
    //   "fill-opacity": 0.4,
    // },
    id: "sold_sel_area2",
    type: "line",
    source:"sold_sel_area",
    layout: {},
    paint: {
      "line-color": "#000",
      "line-width": 0.8,
    },
  };

  // useEffect(() => {
  //   GetSoldTiles(viewState);
  // }, [viewState]);

  const [sold_Area2, setSold_area] = useState(new Set());

  /**
   * @param {GeoJSON.BBox} bbox
   * @returns {index of the selected tile}
   */

  const checkSelecion = (bbox) => {
    const cellIndex2 = sCells.findIndex(
      (x) =>
        `${x.geometry.bbox[0].toFixed(8)} ${x.geometry.bbox[1].toFixed(
          8
        )} ${x.geometry.bbox[2].toFixed(8)} ${x.geometry.bbox[3].toFixed(
          8
        )}` ===
        `${bbox[0].toFixed(8)} ${bbox[1].toFixed(8)} ${bbox[2].toFixed(
          8
        )} ${bbox[3].toFixed(8)}`
    );
    return cellIndex2;
  };

  /**
   * @param {GeoJSON.BBox} bbox
   * @returns {true or false} -- this function returns true or false it means the tile is selected or not
   */

  const checkSelection2 = (bbox) => {
    const x = `${bbox[0].toFixed(8)} ${bbox[1].toFixed(8)} ${bbox[2].toFixed(
      8
    )} ${bbox[3].toFixed(8)}`;
    
    return sold_Area2.has(x) || selctedSet.has(x);  
  };

  const mapRef = useRef();

  const onMapLoad = React.useCallback(() => {

    mapRef.current.addControl(grid);
    
    mapRef.current.on(MaplibreGrid.GRID_CLICK_EVENT, (event) => {
      const bbox = event.bbox;
      // console.log(bbox.toString());
      const cellIndex = checkSelecion(bbox);

      // this if for deselecting the sold if seleted
      if (SoldSelCells.length !== 0) {
        SoldSelCells.length = 0;
        mapRef.current.getSource("layer4").setData({
          type: "FeatureCollection",
          features: SoldSelCells,
        });
      }

      // this if for converting the first blue(first Section layer) layer into red layer ... like selection layer to selected layer
      if (active === true) {
        for (var i = 0; i < selectedCells.length; i++) {
          if (
            sCells.length >= MAX_TILE_LIMIT &&
            sCells.length >= MAX_TILE_LIMIT
          )
            continue;

          sCells.push(selectedCells[i]);

          // setCells([...selectedCells, selectedCells[i]]);

          selctedSet.add(
            `${selectedCells[i].geometry.bbox[0].toFixed(8)} ${selectedCells[
              i
            ].geometry.bbox[1].toFixed(8)} ${selectedCells[
              i
            ].geometry.bbox[2].toFixed(8)} ${selectedCells[
              i
            ].geometry.bbox[3].toFixed(8)}`
          );
        }

        selectedCells.length = 0;
        // setCellsToArray([]);

        mapRef.current.getSource("layer").setData({
          type: "FeatureCollection",
          features: selectedCells,
        });

        mapRef.current.getSource("layer2").setData({
          type: "FeatureCollection",
          features: sCells,
        });
      }

      // this if for select the sold area .....
      if (cellIndex === -1 && active === false) {
        if (checkSelection2(bbox)) {
          let soldSelectedArea = SelectSoldAreaa(Sold_area, bbox);
          console.log(soldSelectedArea);
          if (typeof soldSelectedArea !== "undefined") {
            SoldSelCells.length = 0;
            soldSelectedArea.value.forEach((ele22) => {
              const myArray = ele22.split(" ");
              const cell = CreateGeojson(myArray);
              SoldSelCells.push(cell);
            });
          }

          mapRef.current.getSource("layer4").setData({
            type: "FeatureCollection",
            features: SoldSelCells,
          });
          return;
        }
        const cell = CreateGeojson(bbox);
        selectedCells.push(cell);
        mapRef.current.getSource("layer").setData({
          type: "FeatureCollection",
          features: selectedCells,
        });
      }

      // if tile is already seleceted after we click again then ... This if checks the conditions and remove the seleced tile......
      if (cellIndex !== -1 && active === false) {
        var x = sCells[cellIndex].geometry.bbox;
        selctedSet.delete(
          x[0].toFixed(8) +
            " " +
            x[1].toFixed(8) +
            " " +
            x[2].toFixed(8) +
            " " +
            x[3].toFixed(8)
        );
        sCells.splice(cellIndex, 1);
        mapRef.current.getSource("layer2").setData({
          type: "FeatureCollection",
          features: sCells,
        });
      } else {
        bbox1 = bbox;
        active = active ? false : true;
      }
    });

    mapRef.current.on(MaplibreGrid.GRID_MOVE_EVENT, (event) => {
      if (active !== true) return;
      let bbox2 = event.bbox;
      const cellIndex = checkSelecion(bbox2);
      if (cellIndex === selectedCells.length - 1) return;
      let arr1 = [Math.round(bbox1[0] / dif), Math.round(bbox1[1] / dif)];
      let arr2 = [Math.round(bbox2[0] / dif), Math.round(bbox2[1] / dif)];
      let arr = FindOthers(arr1, arr2);

      selectedCells.length = 0;
      for (let i = 0; i < arr.length; i++) {
        const [x, y] = arr[i];
        const bbox = [x * dif, y * dif, x * dif + dif, y * dif + dif];
        const cellIndex = checkSelection2(bbox);
        if (cellIndex === false) {
          const cell = CreateGeojson(bbox);
          selectedCells.push(cell);
        }
      }

      mapRef.current.getSource("layer").setData({
        type: "FeatureCollection",
        features: selectedCells,
      });
    });
    console.log(createSoldLayer(Sold_area));

    GetSoldAreaAuto();
  }, []);

  const GetSoldAreaAuto = async () => {

    let soldAreaJson = await GetAllSoldTiles();
    soldAreaJson.forEach((element) => {
      Sold_area.push(element);
      element.value.forEach((element2) => {     
        const str = `${element2[0].toFixed(8)} ${element2[1].toFixed(8)} ${element2[2].toFixed(8)} ${element2[3].toFixed(8)}`
        if (sold_Area2.has(str) == false) {
          sold_Area2.add(str);
          const myArray = str.split(" ");
          const cell = CreateGeojson(myArray);
          SoldCells.push(cell);
        }
      });
    });
    mapRef.current.getSource("layer3").setData({
      type: "FeatureCollection",
      features: SoldCells,
    });
  };

  /**
   * @param {Sold_area.BBox} sold_Area = 2d array
   * @returns {true or false} -- this function returns true or false it means the tile is created or not
   */

  const createSoldLayer = (sold_Area) => {
    try {
      sold_Area.forEach((element) => {
        element.forEach((ele) => {
          sold_Area2.add(ele);
          const myArray = ele.split(" ");
          const cell = CreateGeojson(myArray);
          // SoldCells.push(cell);
        });
      });

      mapRef.current.getSource("layer3").setData({
        type: "FeatureCollection",
        features: SoldCells,
      });
      return "done";
    } catch (error) {
      console.log(error);
      return "not done";
    }
  };

  /**
   * @returns {void} This functions for clear the selected layer
   */

  const reset = () => {
    selctedSet.clear();
    sCells.length = 0;
    mapRef.current.getSource("layer2").setData({
      type: "FeatureCollection",
      features: sCells,
    });
  };

  const SaveSoldArea = async () => {
    if (selctedSet.size < 1) return;
    let arr = Array.from(selctedSet);
    console.log(arr);
    await SaveSoldTiles(arr);
    selctedSet.clear();
    sCells.length = 0;
    mapRef.current.getSource("layer2").setData({
      type: "FeatureCollection",
      features: sCells,
    });
    GetSoldAreaAuto();
  };

  const deleteSoldArea = async () => {

    await DeleteSoldArea();
    mapRef.current.getSource("layer2").setData({
      type: "FeatureCollection",
      features: sCells,
    });

    GetSoldAreaAuto();
  };

  const Screenshot = () => {
    var img = mapRef.current.getCanvas().toDataURL();
    var imgHTML = `<img src="${img}", width=500, height = 500/>`;
    document.getElementById("imag").append(imgHTML);
  };

  const getTile = () => {
    GetSoldTiles(viewState)
  }

  return (
    <div className="w-full h-full ">
      <Leftmenus />
      <Map
        attributionControl={false}
        ref={mapRef}
        onLoad={onMapLoad}
        mapboxAccessToken={mapboxglAccessToken}
        style={{
          width: "100vw",
          height: "100vh",
        }}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle={mapboxStyle}
      >
        <NavigationControl />
        <GeolocateControl />
        <FullscreenControl />
        <ScaleControl />

        <Source id="layer" type="geojson" data={geojson}>
          <Layer {...layerStyle} minzoom={15} />
        </Source>

        <Source id="layer2" type="geojson" data={geojson2}>
          <Layer {...layerStyle2} minzoom={15} />
        </Source>

        <Source id="layer3" type="geojson" data={geojson3}>
          <Layer {...layerStyle3} minzoom={15} />
        </Source>

        <Source id="layer4" type="geojson" data={geojson4}>
          <Layer {...layerStyle4} minzoom={15} />
        </Source>
        {/* <Source id="layer5" type="geojson" data={geojson4}>
          <Layer {...layerStyle5} minzoom={15} />
        </Source> */}
      </Map>
      <div className="z-10 absolute bottom-10 left-32" id="imag"></div>

      <button
        className=" z-10 absolute bottom-4 right-2 bg-white px-2 rounded-sm hover:bg-slate-300"
        onClick={reset}
      >
        Reset
      </button>
      <button
        className=" z-10 absolute bottom-12 right-2 bg-white px-2 rounded-sm hover:bg-slate-300"
        onClick={GetSoldAreaAuto}
      >
        GetSoldArea
      </button>
      <button
        className=" z-10 absolute bottom-20 right-2 bg-white px-2 rounded-sm hover:bg-slate-300"
        onClick={SaveSoldArea}
      >
        SaveToSoldArea
      </button>
      <button
        className=" z-10 absolute bottom-28 right-2 bg-white px-2 rounded-sm hover:bg-slate-300"
        onClick={deleteSoldArea}
      >
        Delete
      </button>
      <button
        className=" z-10 absolute bottom-36 right-2 bg-white px-2 rounded-sm hover:bg-slate-300"
        onClick={getTile}
      >
        Check
      </button>
    </div>
  );
}

export default App;
