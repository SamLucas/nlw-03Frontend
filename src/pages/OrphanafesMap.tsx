import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

import { Map, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

import MapMarker from '../images/map_marker.svg'

import '../styles/pages/orphanagesMap.css'

export default function OrphanagesMap(){
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={MapMarker} alt="Haapy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Guaxupé</strong>
          <span>Minas Gerais</span>
        </footer>
      </aside>

      <Map
        center={[-21.2993976,-46.7188515]}
        zoom={15}
        style={{width: '100%', height: '100%'}}
       >
         {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
         <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`}/>
       </Map>

      <Link to="" className="create-orphanage">
        <FiPlus size={26} color="white" />
      </Link>
    </div>
  )
}