const URL_ROOT = 'http://localhost:8000/api';
const URL_ROOT_AUTH = 'http://localhost:8000';
const URL_STATIC = 'http://localhost:8000/static';


const URL_SERVICIOS = {
  login: URL_ROOT + '/token/',
  refresh: URL_ROOT + '/token/refresh/',
  register: URL_ROOT + '/register/',
  user: URL_ROOT + '/user/',

  url_backend: URL_ROOT_AUTH,
  url_static: URL_STATIC,
  categoria: URL_ROOT + '/categoria/',
  subcategoria_categoria: URL_ROOT + '/subcategoriacategoria/',
  subcategoria: URL_ROOT + '/subcategoria/',
  bodegas_ciudad: URL_ROOT + '/bodegasciudad/',
  bodega_viewset: URL_ROOT + '/bodega/',
  ciudad:  URL_ROOT + '/ciudad/',
  itemunassigned: URL_ROOT + '/itemunassigned/',
  itemassigned: URL_ROOT + '/itemassigned/',
  items_user_accepted: URL_ROOT + '/itemsuseraccepted/',
  item: URL_ROOT + '/item/',
  adminItem: URL_ROOT + '/adminItem/',
  producto: URL_ROOT + '/producto/',
  item_imagen: URL_ROOT + '/img-item/',
  imagen_producto: URL_ROOT + '/img-producto/',
  estado: URL_ROOT + '/estado/',
  estado_id: URL_ROOT + '/estado-id/',
  bodega_item: URL_ROOT + '/bodega-item/',
  statistics: URL_ROOT + '/statistics/',
  dailyOrders: URL_ROOT + '/dailyOrders/',
  recentSubmissions: URL_ROOT + '/recentSubmissions/',
  recentProducts: URL_ROOT + '/most-recent/'
};

export default URL_SERVICIOS;
