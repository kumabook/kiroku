var LEVEL = {
  TRACE: 0,
  DEBUG: 1,
  INFO:  2,
  WARN:  3,
  ERROR: 4,
  FATAL: 5,
};
var level = 'TRACE';

var logger = {};

function setLevel(newLevel) {
  if (!Object.keys(LEVEL).includes(newLevel)) {
    throw new Error('Unknown log level ' + newLevel);
  }
  Object.keys(LEVEL).forEach((l) => {
    if (LEVEL[l] >= LEVEL[newLevel]) {
      /* eslint-disable no-console */
      if (LEVEL[l] >= LEVEL.ERROR && console.error) {
        logger[l.toLowerCase()] = console.error.bind(console);
      } else {
        logger[l.toLowerCase()] = console.log.bind(console);
      }
    } else {
      logger[l.toLowerCase()] = () => {};
    }
  });
  level = newLevel;
}

function getLevel() {
  return level;
}

logger.setLevel = setLevel;
logger.getLevel = getLevel;

logger.setLevel(level);

module.exports = logger;
