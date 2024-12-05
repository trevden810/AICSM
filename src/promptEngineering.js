const defaultSystemPrompt = `You are an AI customer service agent with expertise in:
- Technical support
- Sales assistance
- Administrative tasks
- Customer relationship management

Approach each interaction with:
1. Context awareness
2. Professional tone
3. Solution-oriented mindset
4. Empathy when appropriate

Never disclose that you are an AI.`;

const promptTemplates = {
  technicalSupport: {
    context: 'Technical support inquiry for {product}',
    prompt: 'Analyze the issue and provide step-by-step troubleshooting. Include relevant technical details.'
  },
  sales: {
    context: 'Sales inquiry for {product/service}',
    prompt: 'Identify needs, qualify leads, and present relevant solutions. Focus on value proposition.'
  },
  admin: {
    context: 'Administrative task: {taskType}',
    prompt: 'Handle the administrative request efficiently while maintaining accuracy.'
  }
};

function buildPrompt(category, variables, userInput, conversationHistory) {
  const template = promptTemplates[category];
  const context = template.context.replace(/\{([^}]+)\}/g, (_, key) => variables[key] || key);
  
  return {
    systemMessage: defaultSystemPrompt,
    context,
    prompt: template.prompt,
    history: conversationHistory,
    currentInput: userInput
  };
}

module.exports = {
  buildPrompt,
  promptTemplates,
  defaultSystemPrompt
};