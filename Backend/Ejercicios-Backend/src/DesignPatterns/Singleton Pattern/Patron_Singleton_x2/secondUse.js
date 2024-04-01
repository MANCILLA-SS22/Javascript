import logger from './fancyLogger.js'

function logSecondImplementation() {
  logger.log('Second File')
  logger.printLogCount()
  logger.printLogCount()
};

export {logSecondImplementation}