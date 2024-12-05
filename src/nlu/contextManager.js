class ContextManager {
  constructor() {
    this.contexts = new Map();
  }

  async get(sessionId) {
    return this.contexts.get(sessionId) || this.createContext(sessionId);
  }

  async update(sessionId, updates) {
    const current = await this.get(sessionId);
    const updated = {
      ...current,
      ...updates,
      lastUpdated: Date.now()
    };
    this.contexts.set(sessionId, updated);
    return updated;
  }

  createContext(sessionId) {
    const context = {
      sessionId,
      created: Date.now(),
      lastUpdated: Date.now(),
      entities: {},
      intents: [],
      memory: {}
    };
    this.contexts.set(sessionId, context);
    return context;
  }
}

module.exports = new ContextManager();