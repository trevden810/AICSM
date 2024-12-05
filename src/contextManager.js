const db = require('./db');

class ContextManager {
  constructor() {
    this.contexts = new Map();
  }

  async loadContext(sessionId) {
    if (this.contexts.has(sessionId)) {
      return this.contexts.get(sessionId);
    }

    const context = await db.query(
      'SELECT context_data FROM session_contexts WHERE session_id = $1',
      [sessionId]
    );

    if (context.rows.length > 0) {
      this.contexts.set(sessionId, context.rows[0].context_data);
      return context.rows[0].context_data;
    }

    return this.createNewContext(sessionId);
  }

  async updateContext(sessionId, updates) {
    const context = await this.loadContext(sessionId);
    const updatedContext = {...context, ...updates};
    
    await db.query(
      'INSERT INTO session_contexts (session_id, context_data) VALUES ($1, $2) ON CONFLICT (session_id) DO UPDATE SET context_data = $2',
      [sessionId, updatedContext]
    );

    this.contexts.set(sessionId, updatedContext);
    return updatedContext;
  }

  private createNewContext(sessionId) {
    const newContext = {
      created: Date.now(),
      entities: {},
      lastIntent: null,
      preferences: {}
    };

    this.contexts.set(sessionId, newContext);
    return newContext;
  }
}

module.exports = new ContextManager();