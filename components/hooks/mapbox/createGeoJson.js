  /**
   * @param {GeoJSON.BBox} bbox
   * @returns {GeoJSON of a tile}
   */



  export const  createGeojson = (bbox) => {
    const coordinates = [
        [
          [bbox[0], bbox[1]],
          [bbox[2], bbox[1]],
          [bbox[2], bbox[3]],
          [bbox[0], bbox[3]],
          [bbox[0], bbox[1]],
        ],
      ];
      const cell = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          bbox,
          coordinates,
        },
    };
    return cell;
}