import { Platform } from 'react-native';

import * as dateUtils from './dateUtils';
import * as logger from './logger';
import * as orderUtils from './orderUtils';
import * as printerUtils from './printerUtils';

export { logger, dateUtils, orderUtils, printerUtils };

export function isTerminalModel() {
  return Platform.OS === 'android'; // TODO: using env variable
}
