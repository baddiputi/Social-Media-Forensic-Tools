import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const markers = [
  { id: 1, position: [51.505, -0.09], info: "Negative Post by Alice" },
  { id: 2, position: [51.51, -0.1], info: "Negative Post by Bob" },
];

function MapChart({ onMarkerClick }) {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} className="h-80 w-full rounded-xl">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map(marker => (
        <Marker key={marker.id} position={marker.position} eventHandlers={{ click: () => onMarkerClick && onMarkerClick(marker.info, "") }}>
          <Popup>{marker.info}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapChart;
