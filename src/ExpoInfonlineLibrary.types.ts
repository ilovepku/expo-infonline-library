export enum INFOnlineDebugLevel {
  OFF = "off",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  TRACE = "trace",
}

export interface StartIOMpSessionPayload {
  sessionType: string;
  type: string;
  offerIdentifier: string;
  hybridIdentifier?: string;
  customerData?: string;
}
