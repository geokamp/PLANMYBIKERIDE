export function mapsSelector(coords, route) {
    const userAgent = window.navigator.userAgent;



    const latorigin = coords[0][1];
    const longorigin = coords[0][0];

    const latd = coords[1][1];
    const longd = coords[1][0];

       
    const lat = route[0][0];
    const lon = route[0][0];
console.log(route);

    if (/iPhone|iPad|iPod/.test(userAgent)) {
      window.open(`maps://maps.google.com/maps?daddr=${lat},${long}&amp;ll=`);
    } else {
      window.open(`https://www.google.com/maps/dir/?api=1&origin=${latorigin},${longorigin}&destination=${latd},${longd}&travelmode=driving&waypoints=${lat},${lon}`);
    }
  }