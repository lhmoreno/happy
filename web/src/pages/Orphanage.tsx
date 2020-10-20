import React, { useEffect, useState } from "react";
// import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import Sidebar from "../components/SideBar";
import mapIcon from '../utils/mapIcon';

import '../styles/pages/orphanage.css';
import api from "../services/api";

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

interface PreviewImages {
  image_initial: number;
  images: Array<{
    id: number;
    url: string;
  }>
}

const initialOrphanage: Orphanage = {
  latitude: -24.105356,
  longitude: -49.326778,
  name: 'Primeiro',
  about: 'Descrição.',
  instructions: 'Instruções.',
  opening_hours: 'Das 0h as 0h',
  open_on_weekends: 'true',
  images: [{
    id: 1,
    url: 'https://s2.glbimg.com/4SqTyOje7Dk8G-vRmqFd2qbmRC4=/0x0:3648x2432/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2017/H/U/5IQDymSwGgkQBZ2ImVkg/img-9489.jpg'
  }, {
    id: 2,
    url: 'https://www.kickante.com.br/sites/default/files/financiamento-coletivo/pitch/natal-solidario-orfanato-502967.jpg'
  }, {
    id: 3,
    url: 'https://conceitos.com/wp-content/uploads/direito/Orfanato.jpg'
  }, {
    id: 4,
    url: 'https://mundodastrevas.com/uploads/zine/139/image/bunny.jpg'
  }, {
    id: 5,
    url: 'https://lh3.googleusercontent.com/proxy/R65g2360nskpj2c0FG1-XpS9-XrSYj9hEHUcvz0rwgowN3FR8GZJp6NkhZwYEc6g80oJTSsADIXeNUoctXT49v_th2hALzcQDnfa-Fstd9EMlzXwRF06TTwglLzcV-5Z'
  }]
}

const initialImages: PreviewImages = {
  image_initial: 0,
  images: [
    {
      id: 1,
      url: 'https://s2.glbimg.com/4SqTyOje7Dk8G-vRmqFd2qbmRC4=/0x0:3648x2432/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2017/H/U/5IQDymSwGgkQBZ2ImVkg/img-9489.jpg'
    }, {
      id: 2,
      url: 'https://www.kickante.com.br/sites/default/files/financiamento-coletivo/pitch/natal-solidario-orfanato-502967.jpg'
    }, {
      id: 3,
      url: 'https://conceitos.com/wp-content/uploads/direito/Orfanato.jpg'
    }
  ]
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>(initialOrphanage);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imagesPreview, setImagesPreview] = useState<PreviewImages>(initialImages);
  
  // useEffect(() => {
  //   api.get(`orphanages/${params.id}`).then(response => {
  //     setOrphanage(response.data);
  //   });
  // }, [params.id]);

  if (!orphanage) {
    return <p>Carregando...</p>
  }

  function handleAfterImage() {
    const indexInitial = imagesPreview.image_initial + 1;
    const newImagesPreview = orphanage.images.slice(indexInitial, indexInitial + 3);

    setImagesPreview({
      image_initial: indexInitial,
      images: newImagesPreview
    });
  }

  function handleBeforeImage() {
    const indexInitial = imagesPreview.image_initial -1;
    const newImagesPreview = orphanage.images.slice(indexInitial, indexInitial + 3);
    
    setImagesPreview({
      image_initial: indexInitial,
      images: newImagesPreview
    });
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="images">

              {imagesPreview.image_initial !== 0 ? (
                  <button
                    type="button"
                    className="button-next"
                    onClick={handleBeforeImage}
                  >
                    <FiArrowLeft size={26} color="#29B6D1" />
                  </button>
                ) : (
                  <div />
                )
              }

              {imagesPreview.images.map((image, index) => {
                return (
                  <button 
                  key={image.id}
                  className={
                    activeImageIndex === (index + imagesPreview.image_initial) ? 
                    'active button-image' : 
                    'button-image'
                  }
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index + imagesPreview.image_initial);
                  }}>
                    <img src={image.url} alt={orphanage.name} />
                  </button>
                )
              })}

              {imagesPreview.image_initial + 3 !== orphanage.images.length ? (
                  <button
                    type="button"
                    className="button-next"
                    onClick={handleAfterImage}
                  >
                    <FiArrowRight size={26} color="#29B6D1" />
                  </button>
                ) : (
                  <div />
                )
              }
            </div>

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
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude,orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}> Ver rotas no Google Maps </a>
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
              { orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
              ) : (
                <div className="open-on-weekends dont-open">
                <FiInfo size={32} color="#FF669D" />
                Não atendemos <br />
                fim de semana
              </div>
              ) }
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