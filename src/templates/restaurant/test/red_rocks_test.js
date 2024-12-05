const redRocksGrill = require('../instances/red_rocks_grill');

async function runTests() {
  const tests = [
    {
      input: 'What time do you close today?',
      sessionId: 'test1'
    },
    {
      input: 'Can I make a reservation for 6 people tomorrow at 7pm?',
      sessionId: 'test2'
    },
    {
      input: 'What are your specials today?',
      sessionId: 'test3'
    },
    {
      input: 'Do you have outdoor seating?',
      sessionId: 'test4'
    },
    {
      input: 'Id like to order takeout',
      sessionId: 'test5'
    }
  ];

  for (const test of tests) {
    console.log(`\nTest: ${test.input}`);
    const response = await redRocksGrill.handleCall(test.input, test.sessionId);
    console.log('Response:', response);
  }
}

runTests();