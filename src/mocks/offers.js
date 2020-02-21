import nanoid from 'nanoid';
const REVIEWS_MOCK = [
  {
    author: `Max`,
    review: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    userRating: 4,
    date: `April 2019`
  },
  {
    author: `Adelina`,
    review: `A quiet cozy and picturesque that.`,
    userRating: 3,
    date: `May 2018`
  },
  {
    author: `John`,
    review: `The building is green and from 18th century.`,
    userRating: 5,
    date: `June 2018`
  }
];

export const DataValue = {
  OFFERS_MOCK: [
    {
      name: `Beautiful & luxurious apartment at great location`,
      coordinates: [52.3909553943508, 4.85309666406198],
      id: nanoid(),
      price: 120,
      type: `Apartment`,
      premium: true,
      isFavorites: false,
      rating: 4.7,
      reviews: REVIEWS_MOCK
    },
    {
      name: `Wood and stone place`,
      coordinates: [52.369553943508, 4.85309666406198],
      id: nanoid(),
      price: 150,
      type: `Room`,
      premium: false,
      isFavorites: false,
      rating: 4.2,
      reviews: REVIEWS_MOCK
    },
    {
      name: `Canal View Prinsengracht`,
      coordinates: [52.3909553943508, 4.929309666406198],
      id: nanoid(),
      price: 100,
      type: `Hotel room`,
      premium: false,
      isFavorites: true,
      rating: 2.7,
      reviews: REVIEWS_MOCK
    },
    {
      name: `Nice, cozy, warm big bed apartment`,
      coordinates: [52.3809553943508, 4.939309666406198],
      id: nanoid(),
      price: 170,
      type: `Lux apartment`,
      premium: true,
      isFavorites: true,
      rating: 3.9,
      reviews: REVIEWS_MOCK
    }
  ]
};
