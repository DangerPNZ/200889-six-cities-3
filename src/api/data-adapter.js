import {CompareDirection} from '../utils/constants.js';
import {compare} from '../utils/utils.js';

const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
const MAX_REVIEWS_AMOUNT = 10;
const MAX_IMAGES_AMOUNT = 6;
const changeReviewsDateFormat = (reviews) => {
  reviews.forEach((item, index, arr) => {
    arr[index].date = `${MONTHS[new Date(item.date).getMonth()]} ${new Date(item.date).getFullYear()}`;
  });
  return reviews;
};
const formatReviews = (rawReviews) => {
  const sortedReviews = rawReviews.slice().sort(compare(`date`, CompareDirection.DESC));
  const sortedAndLimitedReviews = sortedReviews.slice(0, MAX_REVIEWS_AMOUNT);
  return changeReviewsDateFormat(sortedAndLimitedReviews);
};
const getImages = (rawImages) => {
  const limitedImages = rawImages.slice(0, MAX_IMAGES_AMOUNT);
  return limitedImages;
};

export const formatOfferItem = (offer) => ({
  city: {
    name: offer.city.name,
    coordinates: [
      offer.city.location.latitude,
      offer.city.location.longitude
    ],
    mapZoom: offer.city.location.zoom
  },
  name: offer.title,
  description: offer.description,
  goods: offer.goods,
  bedrooms: offer.bedrooms,
  host: {
    avatarUrl: offer.host.avatar_url,
    id: offer.host.id,
    isPro: offer.host.is_pro,
    name: offer.host.name
  },
  images: getImages(offer.images),
  previewImage: offer.preview_image,
  location: {
    coordinates: [
      offer.location.latitude,
      offer.location.longitude
    ],
    zoom: offer.location.zoom
  },
  id: offer.id,
  price: offer.price,
  type: offer.type,
  premium: offer.is_premium,
  isFavorites: offer.is_favorite,
  rating: offer.rating,
  maxAdults: offer.max_adults
});
export const DataAdapter = {
  formatOfferItemInAppFormat(offer) {
    return formatOfferItem(offer);
  },
  formatCityOffersInAppFormat(rawOffers) {
    return rawOffers.map((item) => {
      return formatOfferItem(item);
    });
  },
  formatReviewsInAppFormat(rawReviews) {
    const reviews = rawReviews.map((item) => {
      return {
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
      };
    });
    return formatReviews(reviews);
  }
};
