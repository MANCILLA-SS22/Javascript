import logger from './fancyLogger.js'

function logFirstImplementation() {
  logger.log('First File')
  logger.printLogCount()
  logger.printLogCount()
};

export {logFirstImplementation}