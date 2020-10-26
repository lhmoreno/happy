import React, {
  useState,
  ChangeEvent,
  useRef,
  useCallback,
  useEffect
} from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus, FiX } from 'react-icons/fi';

import happyMapIcon from '../../utils/mapIcon';
import Sidebar from '../../components/SideBar';

import { OrphanageDataProps } from '../../utils/apiFake';

import './styles.css';

export interface FormDataOrphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  whatsapp: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: File[];
  deleteImages?: string[];
}

interface OrphanageFormProps {
  onSubmitForm: (orphanage: FormDataOrphanage) => void;
  onCancelOrphanage?: () => void;
  orphanage?: OrphanageDataProps;
  orphanagePending?: boolean;
}

function OrphanageForm({ orphanage, orphanagePending, onSubmitForm, onCancelOrphanage }: OrphanageFormProps) {
  const [position, setPosition] = useState({ 
    latitude: 0, 
    longitude: 0
  })
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);

  const imagesRef = useRef<any>(null);

  useEffect(() => {
    if (orphanage) {
      setPosition({
        latitude: orphanage.latitude,
        longitude: orphanage.longitude
      });
      setName(orphanage.name);
      setAbout(orphanage.about);
      setWhatsapp(orphanage.whatsapp);
      setInstructions(orphanage.instructions);
      setOpeningHours(orphanage.opening_hours);
      setOpenOnWeekends(orphanage.open_on_weekends ? true : false);

      const newPreviewImages = orphanage.images.map(({ url }) => url);
      setPreviewImages(newPreviewImages);
    }
  }, [orphanage]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(before => [...before, ...selectedImages]);

    const selectedImagesPreview = selectedImages.map(image => URL.createObjectURL(image));

    newFileList([...images, ...selectedImages]);

    setPreviewImages(before => [...before, ...selectedImagesPreview]);
  }

  function handleDeleteImage(image: string) {
    const newPreviewImages = [];
    const newImages = [];
    setDeleteImages(before => [...before, image])

    let indexImage = '0';

    for (let savedImage in previewImages) {
      if (image !== previewImages[savedImage]) {
        newPreviewImages.push(previewImages[savedImage]);
      } else {
        indexImage = savedImage;
      }
    }

    for (let savedImage in images) {
      if (savedImage !== indexImage) {
        newImages.push(images[savedImage]);
      }
    }

    newFileList(newImages);
    setImages(newImages);
    setPreviewImages(newPreviewImages);
  }

  const newFileList = useCallback((newImages: File[]) => {
    const list = new DataTransfer();
    for (let file in newImages) {
      list.items.add(newImages[file]);
    }

    imagesRef.current.files = list.files;
  }, []);

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form
          className="create-orphanage-form"
          onSubmit={(ev) => {
            ev.preventDefault();
            onSubmitForm({
              name,
              about,
              instructions,
              open_on_weekends,
              opening_hours,
              whatsapp,
              images,
              latitude: position.latitude,
              longitude: position.longitude,
              deleteImages
            })}
          }
        >
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={ orphanage ?
                [position.latitude, position.longitude] :
                [-24.105356, -49.326778]
              }
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={(ev: LeafletMouseEvent) => !orphanagePending && handleMapClick(ev)}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={orphanagePending}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
                disabled={orphanagePending}
              />
            </div>

            <div className="input-block">
              <label htmlFor="name">Número de Whatsapp</label>
              <input
                id="name"
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)}
                disabled={orphanagePending}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map(image => {
                    return (
                      <div
                        key={image}
                        className="image-container"
                      >
                        <img src={image} alt={name} />
                        {!orphanagePending && (
                          <div 
                            className="image-delete"
                            onClick={() => handleDeleteImage(image)}
                          >
                            <FiX size={24} color="#FF669D" />
                          </div>
                        )}
                      </div>
                    )
                  })
                }
                {!orphanagePending && (
                  <label className="new-image" htmlFor="image[]">
                    <FiPlus size={24} color="#15b6d6" />
                  </label>
                )}
              </div>
              <input
                ref={imagesRef}
                type="file"
                id="image[]"
                multiple
                onChange={handleSelectImages}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
                disabled={orphanagePending}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário das visitas</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(event) => setOpeningHours(event.target.value)}
                disabled={orphanagePending}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana?</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => !orphanagePending && setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => !orphanagePending && setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          {!orphanagePending && (
            <button className="confirm-button button" type="submit">
              Confirmar
            </button>
          )}
        </form>

        {orphanagePending && (
          <div className="delete-buttons">
            <button 
              className="cancel-button button" 
              type="button"
              onClick={onCancelOrphanage}
            >
              Não
            </button>
            <button 
              className="delete-button button" 
              type="button"
              onClick={() => onSubmitForm({} as FormDataOrphanage)}
            >
              Sim
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default OrphanageForm;