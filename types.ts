/// <reference types="nativewind/types" />

import * as FrontApi from './src/api/Frontend/apiTypes/baseFrontEndApiType';
import * as Api from './src/api/apiTypes';
import { RootState, Actions, AppDispatch } from './src/store';

export {};

declare global {
  namespace App {
    export type { Api };
    export type { FrontApi };
    export type { RootState, Actions, AppDispatch };
  }
}
