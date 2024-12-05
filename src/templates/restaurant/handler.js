const nlu = require('../../nlu');
const config = require('./config');

class RestaurantHandler {
  constructor(restaurantData) {
    this.data = restaurantData;
    this.activeOrders = new Map();
  }

  async handleCall(input, sessionId) {
    const result = await nlu.processMessage(input, sessionId);
    const { intent, entities } = result;

    switch(intent.type) {
      case 'reservation':
        return this.handleReservation(entities);
      case 'menu':
        return this.handleMenuInquiry(entities);
      case 'takeout':
        return this.handleTakeout(entities, sessionId);
      case 'hours':
        return this.handleHoursInquiry(entities);
      case 'location':
        return this.handleLocationInquiry(entities);
      default:
        return this.handleGeneralInquiry(input);
    }
  }

  async handleReservation(entities) {
    const { date, time, party_size } = entities;
    // Implement reservation logic
    return {
      success: true,
      message: config.prompts.reservation_confirm
        .replace('{date}', date)
        .replace('{time}', time)
        .replace('{party_size}', party_size)
    };
  }

  async handleMenuInquiry(entities) {
    // Implement menu inquiry logic
  }

  async handleTakeout(entities, sessionId) {
    // Implement takeout order logic
  }

  async handleHoursInquiry(entities) {
    // Implement hours inquiry logic
  }

  async handleLocationInquiry(entities) {
    // Implement location inquiry logic
  }
}

module.exports = RestaurantHandler;