import polyline from '@mapbox/polyline';

const polylineToPath = (encodedPolyline) => {
  return poly_gm2svg([polyline.decode(encodedPolyline)], function (latLng) {
      return {
          lat: latLng[0],
          lng: latLng[1]
      }
  });

  function latLng2point(latLng) {

    return {
        x: (latLng.lng + 180) * (256 / 360),
        y: (256 / 2) - (256 * Math.log(Math.tan((Math.PI / 4) + ((latLng.lat * Math.PI / 180) / 2))) / (2 * Math.PI))
    };
}

function poly_gm2svg(gmPaths, fx) {

    var point,
    gmPath,
    svgPath,
    svgPaths = [],
        minX = 256,
        minY = 256,
        maxX = 0,
        maxY = 0;

    for (var pp = 0; pp < gmPaths.length; ++pp) {
        gmPath = gmPaths[pp], svgPath = [];
        for (var p = 0; p < gmPath.length; ++p) {
            point = latLng2point(fx(gmPath[p]));
            minX = Math.min(minX, point.x);
            minY = Math.min(minY, point.y);
            maxX = Math.max(maxX, point.x);
            maxY = Math.max(maxY, point.y);
            svgPath.push([point.x, point.y].join(','));
        }


        svgPaths.push(svgPath.join(' '))


    }
    return {
      path: 'M' + svgPaths.join('z M') + 'z',
      viewBox: [minX, minY, (maxX - minX), (maxY - minY)].join(' '),
    };

}
};

export default polylineToPath;
