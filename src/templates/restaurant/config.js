module.exports = {
  intents: {
    reservation: {
      required: ['date', 'time', 'party_size'],
      optional: ['special_requests']
    },
    menu: {
      required: ['category'],
      optional: ['dietary_restrictions', 'price_range']
    },
    hours: {
      required: ['day'],
      optional: ['special_dates']
    },
    takeout: {
      required: ['order_items'],
      optional: ['pickup_time', 'special_instructions']
    },
    location: {
      required: ['inquiry_type'],
      optional: ['transportation_method']
    }
  },
  prompts: {
    greeting: 'Welcome to {restaurant_name}. I can help you with reservations, menu information, takeout orders, hours, and directions.',
    busy_response: 'We're experiencing high call volume. I can help you immediately with most requests.',
    menu_daily: 'Today\'s specials: {specials_list}. Would you like to hear our regular menu options?',
    reservation_confirm: 'I\'ve reserved a table for {party_size} on {date} at {time}. A confirmation will be sent to {contact_info}.'
  },
  settings: {
    reservation_advance_days: 30,
    busy_threshold: 15,
    menu_update_frequency: 'daily',
    operating_hours: {
      mon_fri: '11:00-22:00',
      sat_sun: '10:00-23:00'
    }
  }
}