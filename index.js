const Client = require('./src/Client');

module.exports = Client;

const unhandledRejections = new Map();
process.on('unhandledRejection', function(reason, promise) {
  console.log(reason);
});

process.on('rejectionHandled', (promise) => {
  unhandledRejections.delete(promise);
});
