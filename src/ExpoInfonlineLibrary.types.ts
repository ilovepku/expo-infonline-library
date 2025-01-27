export enum IOLViewEventType {
  APPEARED = "appeared",
  REFRESHED = "refreshed",
  DISAPPEARED = "disappeared",
}

export enum IOLPrivacyType {
  ACK = "ack",
  LIN = "lin",
  PIO = "pio",
}

export enum IOLDebugLevel {
  OFF = "off",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  TRACE = "trace",
}

export enum IOLSessionType {
  SZM = "szm",
  OEWA = "oewa",
}

export interface StartIOMpSessionPayload {
  sessionType: IOLSessionType;
  type: IOLPrivacyType;
  offerIdentifier: string;
  hybridIdentifier?: string;
  customerData?: string;
}

export interface LogViewEventPayload {
  sessionType: IOLSessionType;
  type: IOLViewEventType;
  category: string;
  comment?: string;
}

export interface SetCustomConsentPayload {
  sessionType: IOLSessionType;
  consent: string;
}
