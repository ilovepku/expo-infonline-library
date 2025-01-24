import { NativeModule, requireNativeModule } from 'expo';

import {
  INFOnlineDebugLevel,
  StartIOMpSessionPayload,
} from './ExpoInfonlineLibrary.types';

declare class ExpoInfonlineLibraryModule extends NativeModule {
  startIOMpSession(payload: StartIOMpSessionPayload): Promise<void>;
  terminateSession(sessionType: string): Promise<void>;
  // iOS specific
  setDebugLogLevel(level: INFOnlineDebugLevel): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoInfonlineLibraryModule>(
  "ExpoInfonlineLibrary"
);
