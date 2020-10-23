export interface OrphanagePinProps {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export interface OrphanageDataProps {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  whatsapp: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export interface PreviewImagesProps {
  image_initial: number;
  images: Array<{
    id: number;
    url: string;
  }>
}

export const initialOrphanagesMap: OrphanagePinProps[] = [
  {
    id: 1,
    latitude: -24.112883,
    longitude: -49.337641,
    name: 'Primeiro'
  }
];

export const initialOrphanageData: OrphanageDataProps = {
  id: 25,
  latitude: -24.105356,
  longitude: -49.326778,
  name: 'Primeiro',
  about: 'Descrição.',
  instructions: 'Instruções.',
  opening_hours: 'Das 0h as 0h',
  open_on_weekends: 'true',
  whatsapp: '15 9xxxx-xxxx',
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
    url: 'https://static1.squarespace.com/static/56b10ce8746fb97c2d267b79/56b10d85f85082c4982e0f00/58ff5f64197aea4f7f325abc/1510151388689/orfanatos+n%C3%A3o+existem4.jpg?format=1500w'
  }]
}

export const initialImagesPreview: PreviewImagesProps = {
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