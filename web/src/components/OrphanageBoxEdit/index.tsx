import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiEdit3, FiTrash, FiArrowRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapIcon from '../../utils/mapIcon';
import { OrphanageDataProps } from '../../utils/apiFake';

import './styles.css';

interface OrphanageBoxEditProps {
  orphanage: OrphanageDataProps;
  pending?: boolean;
}

function OrphanageBoxEdit({ pending, orphanage }: OrphanageBoxEditProps) {
  const { push } = useHistory();

  return (
    <div id="box-edit-container">
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
        <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
      </Map>

      <footer>
        <h2>{orphanage.name}</h2>

        <div className="buttons-container">
          {!pending ? (
            <>
              <button type="button" onClick={() => push(`/dashboard/edit/${orphanage.id}`)}>
                <FiEdit3 size={24} color="#15C3D6" />
              </button>

              <button type="button" onClick={() => push(`/dashboard/delete/${orphanage.id}`, orphanage.name)}>
                <FiTrash size={24} color="#15C3D6" />
              </button>
            </>
          ): (
            <button type="button" onClick={() => push(`/dashboard/pending/${orphanage.id}`)}>
              <FiArrowRight size={24} color="#15C3D6" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

export default OrphanageBoxEdit;