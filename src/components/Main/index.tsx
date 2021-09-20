import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import dynamic from "next/dynamic";
import { MapProps } from "components/Map";

const Map = dynamic(() => import("components/Map"), { ssr: false });

const Main = ({ places }: MapProps) => <Map places={places} />;

export default Main;
