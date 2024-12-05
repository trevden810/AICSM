const menuItem = {
  name: String,
  description: String,
  price: Number,
  category: String,
  dietary_flags: Array,
  availability: Boolean,
  prep_time: Number
};

const reservation = {
  date: Date,
  time: String,
  party_size: Number,
  customer_name: String,
  contact: String,
  special_requests: String,
  status: String
};

const order = {
  items: Array,
  total: Number,
  status: String,
  pickup_time: Date,
  customer_info: Object,
  special_instructions: String
};

module.exports = {
  menuItem,
  reservation,
  order
};