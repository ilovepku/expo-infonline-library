import { NativeModule, requireNativeModule } from "expo";

import {
  IOLDebugLevel,
  IOLSessionType,
  LogViewEventPayload,
  SetCustomConsentPayload,
  StartIOMpSessionPayload,
} from "./ExpoInfonlineLibrary.types";

declare class ExpoInfonlineLibraryModule extends NativeModule {
  startIOMpSession(payload: StartIOMpSessionPayload): Promise<void>;
  logViewEvent(payload: LogViewEventPayload): Promise<void>;
  setCustomConsent(payload: SetCustomConsentPayload): Promise<void>;
  sendLoggedEvents(sessionType: IOLSessionType): Promise<void>;
  terminateSession(sessionType: IOLSessionType): Promise<void>;
  mostRecentLogs(limit: number): Promise<string[]>;
  // iOS specific
  setDebugLogLevel(level: IOLDebugLevel): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoInfonlineLibraryModule>(
  "ExpoInfonlineLibrary"
);
