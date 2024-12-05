module.exports = {
  limits: {
    maxConcurrentCalls: 5,
    monthlyCallMinutes: 1000,
    maxQueueLength: 10
  },
  features: {
    voicemail: true,
    basicRouting: true,
    businessHours: true,
    simpleReporting: true
  },
  pricing: {
    monthly: 199,
    additionalMinutes: 0.05
  }
}