import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'

import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { IconMarker } from '../styles/icon'
import "leaflet/dist/leaflet.css"

import MapMarker from '../images/map_marker.svg'

import OrphanageController from '../controler/orphanage'
import '../styles/pages/orphanagesMap.css'

interface IOrphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export default function OrphanagesMap() {

  const [orphanages, setOrphanage] = useState<IOrphanage[]>([])

  useEffect(() => {
    OrphanageController.listOrphanagesApi(setOrphanage)
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={MapMarker} alt="Haapy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Guaxupé</strong>
          <span>Minas Gerais</span>
        </footer>
      </aside>

      <Map
        center={[-21.2993976, -46.7188515]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`} />

        {orphanages.map(orphanage => {
          const { id, latitude, longitude, name } = orphanage
          return (
            <Marker key={id} icon={IconMarker} position={[latitude, longitude]}>
              <Popup maxWidth={240} minWidth={240} closeButton={false} className="popup" >
                {name}
                <Link to={`/details/${id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
        })}

      </Map>

      <Link to="/create" className="create-orphanage">
        <FiPlus size={26} color="white" />
      </Link>
    </div >
  )
}