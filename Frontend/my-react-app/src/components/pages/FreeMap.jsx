import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const FreeMap = () => {
  const position = [12.228628,79.066544]; // Madhuravoyal, TN

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={position}>
        <Popup>SM Enterprises Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default FreeMap;