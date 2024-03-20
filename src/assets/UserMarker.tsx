import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

export const DefaultIcon = L.icon({
  iconUrl: "/user-marker.png",
  shadowUrl: iconShadow,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  shadowAnchor: [15, 40],
  popupAnchor: [0, -38],
});

export const VendorIcon = L.icon({
  iconUrl: "/vendor-marker.png",
  shadowUrl: iconShadow,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  shadowAnchor: [15, 40],
  popupAnchor: [0, -38],
});
