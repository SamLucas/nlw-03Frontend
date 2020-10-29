import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from 'react-router-dom'
import L from 'leaflet';

import { FiPlus } from "react-icons/fi";

import mapMarkerImg from '../images/map_marker.svg';

import OrphanageController from '../controler/orphanage'
import '../styles/pages/create-orphanage.css';
import SideBar from "../components/SideBar";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function CreateOrphanage() {

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLogitude] = useState(0)
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstruction] = useState('')
  const [openingHours, setOpeningHours] = useState('')
  const [openOnWeekends, setOpenOnWeekends] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const hystory = useHistory()

  const handleMapClick = (event: L.LeafletMouseEvent) => {
    const { lat, lng } = event.latlng
    setLatitude(lat)
    setLogitude(lng)
  }

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();

    OrphanageController.createOrphange({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours: openingHours,
      open_on_weekends: openOnWeekends,
      images,
    })

    hystory.push('/app')
  }

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedImages = Array.from(event.target.files)

      setImages(selectedImages)

      const selectedImagesPreview = selectedImages.map(image => {
        return URL.createObjectURL(image)
      })

      setPreviewImages(selectedImagesPreview)
    }
  }

  return (
    <div id="page-create-orphanage">
      <SideBar />
      <main>
        <form className="create-orphanage-form" onSubmit={handleCreate}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              // center={[-27.2092052, -49.6401092]}
              center={[-21.2993976, -46.7188515]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`}
              />

              {latitude !== 0 &&
                longitude !== 0 && <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[latitude,
                    longitude]}
                />}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={e => {
                  const value = e.target.value
                  setName(value)
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={e => {
                  const value = e.target.value
                  setAbout(value)
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {previewImages.map(image => (
                  <img key={image} src={image} alt={name} />
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                <input
                  multiple
                  onChange={handleSelectImages}
                  style={{ display: "none" }}
                  type="file"
                  name="image"
                  id="image[]"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions"
                value={instructions}
                onChange={e => {
                  const value = e.target.value
                  setInstruction(value)
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={openingHours}
                onChange={e => {
                  const value = e.target.value
                  setOpeningHours(value)
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>
              <div className="button-select">
                <button
                  type="button"
                  className={openOnWeekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!openOnWeekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>
          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
