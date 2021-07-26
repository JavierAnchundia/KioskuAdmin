const URL_ROOT = 'http://localhost:8000/api';
const URL_ROOT_AUTH = 'http://localhost:8000';


const URL_SERVICIOS = {
  login: URL_ROOT + '/token/',
  refresh: URL_ROOT + '/token/refresh/',
  register: URL_ROOT + '/register/',
  user: URL_ROOT + '/user/',

  url_backend: URL_ROOT_AUTH,
  categoria: URL_ROOT + '/categoria/',
  subcategoria_categoria: URL_ROOT + '/subcategoriacategoria/',
  subcategoria: URL_ROOT + '/subcategoria/',
  bodegas_ciudad: URL_ROOT + '/bodegasciudad/',
  bodega_viewset: URL_ROOT + '/bodega/',
  ciudad:  URL_ROOT + '/ciudad/',

};

export default URL_SERVICIOS;
