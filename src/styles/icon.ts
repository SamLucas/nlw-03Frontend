import L from 'leaflet'

import MapMarker from '../images/map_marker.svg'

export const IconMarker = L.icon({
  iconUrl: MapMarker,
  iconSize: [59, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})