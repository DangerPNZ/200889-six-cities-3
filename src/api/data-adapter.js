import nanoid from 'nanoid';
import {CompareDirection} from '../utils/utils.js';
import {compare} from '../utils/utils.js';

const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
const changeReviewsDateFormat = (reviews) => {
  reviews.forEach((item, index, arr) => {
    arr[index].date = `${MONTHS[new Date(item.date).getMonth()]} ${new Date(item.date).getFullYear()}`;
  });
  return reviews;
};
const getReviews = (rawReviews) => {
  const sortedReviews = rawReviews.slice().sort(compare(`date`, CompareDirection.ASC));
  const sortedAndLimitedReviews = sortedReviews.slice(0, 10);
  return changeReviewsDateFormat(sortedAndLimitedReviews);
};
const getGoods = (rawGoods) => {
  const goods = [];
  rawGoods.forEach((item) => {
    goods.push({
      text: item,
      id: nanoid()
    });
  });
  return goods;
};
const getImages = (rawImages) => {
  const images = rawImages.map((item) => ({
    url: item,
    id: nanoid()
  }));
  const limitedImages = images.slice(0, 6);
  return limitedImages;
};

export const DataAdapter = {
  formatCityOffersInAppFormat(rawOffers) {
    const offers = [];
    rawOffers.forEach((item) => {
      offers.push({
        city: {
          name: item.city.name,
          coordinates: [
            item.city.location.latitude,
            item.city.location.longitude
          ],
          mapZoom: item.city.location.zoom
        },
        name: item.title,
        description: item.description,
        goods: getGoods(item.goods),
        bedrooms: item.bedrooms,
        host: {
          avatarUrl: item.host.avatar_url,
          id: item.host.id,
          isPro: item.host.is_pro,
          name: item.host.name
        },
        images: getImages(item.images),
        previewImage: item.preview_image,
        location: {
          coordinates: [
            item.location.latitude,
            item.location.longitude
          ],
          zoom: item.location.zoom
        },
        id: item.id,
        price: item.price,
        type: item.type,
        premium: item.is_premium,
        isFavorites: item.is_favorite,
        rating: item.rating,
        maxAdults: item.max_adults
      });
    });
    return offers;
  },
  formatReviewsInAppFormat(rawReviews) {
    const reviews = [];
    rawReviews.forEach((item) => {
      reviews.push({
        review: item.comment,
        userRating: item.rating,
        date: item.date,
        commentId: item.id,
        author: {
          avatarUrl: item.user.avatar_url,
          id: item.user.id,
          isPro: item.user.is_pro,
          name: item.user.name
        }
      });
    });
    return getReviews(reviews);
  }
};
