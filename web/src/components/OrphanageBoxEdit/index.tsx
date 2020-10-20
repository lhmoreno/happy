import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiEdit3, FiTrash, FiArrowRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapIcon from '../../utils/mapIcon';

import './styles.css';

interface OrphanageBoxEditProps {
  pending?:boolean
}

function OrphanageBoxEdit({ pending }: OrphanageBoxEditProps) {
  const { push } = useHistory();

  return (
    <div id="box-edit-container">
      <Map 
        center={[-24.112883, -49.337641]} 
        zoom={16} 
        style={{ width: '100%', height: 280 }}
        dragging={false}
        touchZoom={false}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker interactive={false} icon={mapIcon} position={[-24.112883, -49.337641]} />
      </Map>

      <footer>
        <h2>Primeiro</h2>

        <div className="buttons-container">
          {!pending ? (
            <>
              <button type="button" onClick={() => push('dashboard/edit/1')}>
                <FiEdit3 size={24} color="#15C3D6" />
              </button>

              <button type="button" onClick={() => push('dashboard/delete/1')}>
                <FiTrash size={24} color="#15C3D6" />
              </button>
            </>
          ): (
            <button type="button" onClick={() => push('dashboard/pending/1')}>
              <FiArrowRight size={24} color="#15C3D6" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

export default OrphanageBoxEdit;