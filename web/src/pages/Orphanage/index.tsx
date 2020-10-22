import React, { useEffect, useState } from 'react';
import { FiClock, FiInfo, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FaWhatsapp } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import Sidebar from '../../components/SideBar';
import mapIcon from '../../utils/mapIcon';

import api from '../../services/api';
import { 
  OrphanageDataProps,
  PreviewImagesProps
} from '../../utils/apiFake';

import './styles.css';

interface OrphanageParams {
  id: string;
}

function Orphanage() {
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<OrphanageDataProps>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imagesPreview, setImagesPreview] = useState<PreviewImagesProps>({
    image_initial: 0,
    images: []
  });
  
  useEffect(() => {
    api.get(`orphanage/${params.id}`).then((response: AxiosResponse<OrphanageDataProps>)=> {
      setOrphanage(response.data);
      
      const newImagesPreview: PreviewImagesProps = {
        image_initial: 0,
        images: []
      };
      
      response.data.images.forEach((image, index) => {
        if (index < 3) {
          newImagesPreview.images.push(image);
        }
      });

      setImagesPreview(newImagesPreview);
    });
  }, [params.id]);

  if (!orphanage) {
    return <p>Carregando...</p>
  }

  function handleAfterImage() {
    const indexInitial = imagesPreview.image_initial + 1;
    const newImagesPreview = orphanage?.images.slice(indexInitial, indexInitial + 3);

    if (!newImagesPreview) return;

    setImagesPreview({
      image_initial: indexInitial,
      images: newImagesPreview
    });
  }

  function handleBeforeImage() {
    const indexInitial = imagesPreview.image_initial -1;
    const newImagesPreview = orphanage?.images.slice(indexInitial, indexInitial + 3);

    if (!newImagesPreview) return;
    
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

              {imagesPreview.image_initial + 3 < orphanage.images.length ? (
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

            <button 
              type="button" 
              className="contact-button"
              onClick={() => {
                window.open(`https://api.whatsapp.com/send?phone=${orphanage.whatsapp}`)
              }}
            >
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Orphanage;