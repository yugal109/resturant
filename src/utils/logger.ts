import { SHOULD_LOG_IN_DEBUG } from '../config';

export function logSuccess(...data: any) {
  if (__DEV__ && SHOULD_LOG_IN_DEBUG) console.log('%c APP', `color: ${'green'};`, data);
  console.log('network type', typeof data[0]);
}

export function logError(...data: any) {
  if (__DEV__ && SHOULD_LOG_IN_DEBUG) console.log('%c APP', `color: white;background:red;`, data);
}

export function logInfo(...data: any) {
  if (__DEV__ && SHOULD_LOG_IN_DEBUG) console.log('%c APP', `color: ${'blue'};`, data);
}
