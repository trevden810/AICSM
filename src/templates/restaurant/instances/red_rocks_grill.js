const RestaurantHandler = require('../handler');

const redRocksData = {
  name: 'Red Rocks Grill',
  location: '116 Stone Street, Morrison, CO 80465',
  phone: '(303) 697-5352',
  hours: {
    mon_fri: '11:00-21:00',
    sat_sun: '10:00-22:00',
    holidays: 'Call for holiday hours'
  },
  menu: {
    categories: ['Mexican', 'American', 'Burgers', 'Fajitas'],
    specials: {
      monday: 'Fajita Monday - $14.99',
      tuesday: 'Taco Tuesday - $2.50 each',
      friday: 'Fish Fry Friday - $16.99'
    },
    popular: [
      'Black Angus Burgers',
      'Sizzling Fajitas',
      'Green Chile'
    ],
    dietary_options: [
      'Vegetarian',
      'Gluten-Free Options',
      'Kids Menu'
    ]
  },
  seating: {
    indoor: 75,
    outdoor: 30,
    bar: 15
  },
  features: [
    'Full Bar',
    'Outdoor Seating',
    'Takeout',
    'Family Friendly',
    'Live Music Weekends'
  ],
  parking: 'Free street and lot parking available',
  nearbyAttractions: ['Red Rocks Amphitheatre', 'Downtown Morrison']
};

module.exports = new RestaurantHandler(redRocksData);