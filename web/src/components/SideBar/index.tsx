import React from 'react';
import { FiArrowLeft, FiPower, FiMapPin, FiInfo } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../../images/map-marker.svg';

import './styles.css';

interface SidebarProps {
  dashboard?: boolean;
  buttonActive?: 'location' | 'info';
}

function Sidebar({ dashboard, buttonActive }: SidebarProps) {

  const { goBack, push } = useHistory();

  return (
      <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      {dashboard && (
          <main>
            <button 
              type="button" 
              className={buttonActive === 'location' ? 'active' : ''}
              onClick={() => buttonActive !== 'location' && push('orphanages')}
            >
              <FiMapPin 
                size={24} 
                color={buttonActive === 'location' ? '#0089A5' : '#FFF'} 
              />
            </button>
            <button 
              type="button" 
              className={buttonActive === 'info' ? 'active' : ''}
              onClick={() => buttonActive !== 'info' && push('pending') }
            >
              <FiInfo 
                size={24} 
                color={buttonActive === 'info' ? '#0089A5' : '#FFF'} 
              />
            </button>
          </main>
        )
      }

      <footer>
        {!dashboard ? (
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
          ) : (
            <button type="button" onClick={() => {}}>
              <FiPower size={24} color="#FFF" />
            </button>
          )
        }
      </footer>
    </aside>
  );
}

export default Sidebar;