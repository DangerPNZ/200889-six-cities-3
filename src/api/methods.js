// const getOffers = () => api.get(`/hotels`)
// .then((response) => response.data)
// .catch((err) => err.response.data.error);
// const getNearbyOffers = (offerId) => api.get(`/hotels/${offerId}/around`)
// .then((response) => response.data)
// .catch((err) => err.response.data.error);
// const getFavoritesOffers = () => api.get(`/favorite`)
// .then((response) => response.data)
// .catch((err) => err.response.data.error);
// const changeFavoriteStatus = (offerId, status) => api.post(`/favorite/${offerId}/${status}`)
// .then((response) => response.data)
// .catch((err) => err.response.data.error);
// const getOfferComments = (offerId) => api.get(`/comments/${offerId}`)
// .then((response) => response.data)
// .catch((err) => err.response.data.error);
// const sendComment = (offerId, comment, rating) => api.post(`/comments/${offerId}`, {
//   comment,
//   rating
// })
// .then((response) => response.data)
// .catch((err) => err.response.data.error);
// const logIn = (email, password) => api.post(`/login`, {
//   email,
//   password
// })
// .then((response) => response.data)
// .catch((err) => err.response.data.error);
// const checkAuthorization = () => api.get(`/login`)
// .then((response) => response.data)
// .catch((err) => err.response.data.error);

/* Разобраться:
1) Должны-ли методы именоваться как коллбеки (как в демке). В моем понимании, методы апи - не коллбеки
2) Можно ли сгруппировать записи then catch
3) Может, описать методы сразу в enum?
*/
import {api} from './api.js';

export const ApiMethod = {
  GET_OFFERS: api.get(`/hotels`)
  .then((response) => response.data)
  .catch((err) => err.response.data.error),

  GET_NEARBY_OFFERS: (offerId) => api.get(`/hotels/${offerId}/around`)
  .then((response) => response.data)
  .catch((err) => err.response.data.error),

  GET_FAVORITES_OFFERS: api.get(`/favorite`)
  .then((response) => response.data)
  .catch((err) => err.response.data.error),

  CHANGE_FAVORITE_STATUS: (offerId, status) => api.post(`/favorite/${offerId}/${status}`)
  .then((response) => response.data)
  .catch((err) => err.response.data.error),

  GET_OFFER_COMMENTS: (offerId) => api.get(`/comments/${offerId}`)
  .then((response) => response.data)
  .catch((err) => err.response.data.error),

  SEND_COMMENT: (offerId, comment, rating) => api.post(`/comments/${offerId}`, {
    comment,
    rating
  })
  .then((response) => response.data)
  .catch((err) => err.response.data.error),

  LOG_IN: (email, password) => api.post(`/login`, {
    email,
    password
  })
  .then((response) => response.data)
  .catch((err) => err.response.data.error),

  CHECK_AUTHORIZATION: api.get(`/login`)
  .then((response) => response.data)
  .catch((err) => err.response.data.error)
};
