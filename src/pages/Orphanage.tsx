import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";

import { Map, Marker, TileLayer } from "react-leaflet";
import mapMarkerImg from '../images/map_marker.svg';
import L from 'leaflet';

import '../styles/pages/orphanage.css';
import SideBar from "../components/SideBar";

import OrphanageController from '../controler/orphanage'

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface IOrphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    path: string;
    url: string
  }>
}

interface OrphangeParams {
  id: string;
}

export default function Orphanage() {

  const [orphanage, setOrphanage] = useState<IOrphanage>()
  const [index, setIndex] = useState(0)
  const params = useParams<OrphangeParams>()

  useEffect(() => {
    OrphanageController.listOrphanageApi(setOrphanage, params.id)
  }, [])


  if (!orphanage) {
    return <h1>Carregando...</h1>
  }

  return (
    <div id="page-orphanage">
      <SideBar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[index].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((element, idx) => {
              return (
                <button
                  key={idx}
                  className={index === idx ? "active" : ""}
                  type="button"
                  onClick={() => { setIndex(idx) }}>
                  <img src={element.url} alt="Lar das meninas" />
                </button>
              )
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a
                  href={
                    `https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`
                  }
                  target="_black"
                  rel="noopener noreferrer"
                >
                  Ver rotas no Google Maps
                  </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends === "true" ?
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div> : <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                Não atendemos <br />
                fim de semana
              </div>
              }
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}