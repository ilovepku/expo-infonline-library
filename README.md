# Expo INFOnline Library

A React Native wrapper for native INFOnline SDKs, providing seamless integration with the INFOnline(pseudonym measurements) analytics and tracking functionality in your Expo/React Native applications.

> **Note**: Currently, this library only supports iOS. Android support is planned for a future release.

## Requirements

- iOS: minSdkVersion 15.1
- Android: Planned for future release
- Native iOS INFOnline library (v.2.7.0 now embedded)

## Features

- 📈 Parallel operation support for SZM and OEWA measurement sessions
- 📊 Session configuration and management
- 📱 View event tracking
- 🔍 Debug level control and logging
- 📝 Manual processing of TCF consent

## Installation

### In Managed Expo Projects

```bash
npx expo install expo-infonline-library
```

## Usage

### Initialize Session

```typescript
import ExpoInfonlineLibrary, {
  IOLSessionType,
  IOLPrivacyType,
} from "expo-infonline-library";

// Configure and start session
await ExpoInfonlineLibrary.startIOMpSession({
  sessionType: IOLSessionType.SZM,
  type: IOLPrivacyType.ACK,
  offerIdentifier: "your-offer-id",
});
```

### Track View Events

```typescript
import { IOLViewEventType, IOLSessionType } from "expo-infonline-library";

await ExpoInfonlineLibrary.logViewEvent({
  sessionType: IOLSessionType.SZM,
  type: IOLViewEventType.APPEARED,
  category: "your-category",
  comment: "your-optional-comment",
});
```

### Set Custom Consent

```typescript
await ExpoInfonlineLibrary.setCustomConsent({
  sessionType: IOLSessionType.SZM,
  consent: "your-consent-string",
});
```

### Send Logged Events

```typescript
await ExpoInfonlineLibrary.sendLoggedEvents(IOLSessionType.SZM);
```

### Set Debug Level (iOS)

```typescript
import { IOLDebugLevel } from "expo-infonline-library";

await ExpoInfonlineLibrary.setDebugLogLevel(IOLDebugLevel.TRACE);
```

### Get Recent Logs

```typescript
const logs = await ExpoInfonlineLibrary.mostRecentLogs(50); // Get last 50 logs
```

### Cleanup

```typescript
await ExpoInfonlineLibrary.terminateSession(IOLSessionType.SZM);
```

## API Reference

### Session Management

- `startIOMpSession(payload: StartIOMpSessionPayload)`: Initializes the INFOnline session

  - `payload.sessionType`: Type of session (`SZM` or `OEWA`)
  - `payload.type`: Privacy type (`ACK`, `LIN`, or `PIO`)
  - `payload.offerIdentifier`: Identifier for the offer
  - `payload.hybridIdentifier`: Optional hybrid identifier
  - `payload.customerData`: Optional customer data

- `terminateSession(sessionType: IOLSessionType)`: Terminates the specified session
- `sendLoggedEvents(sessionType: IOLSessionType)`: Sends logged events for the specified session

### Event Logging

- `logViewEvent(payload: LogViewEventPayload)`: Logs view-related events
  - `payload.sessionType`: Type of session
  - `payload.type`: One of `APPEARED`, `REFRESHED`, or `DISAPPEARED`
  - `payload.category`: Category of the view
  - `payload.comment`: Optional comment

### Manual processing of TCF Consent

- `setCustomConsent(payload: SetCustomConsentPayload)`: Processes TCF consent string (IO notation)
  - `payload.sessionType`: Type of session
  - `payload.consent`: Consent string

### Debug & Logging

- `setDebugLogLevel(level: IOLDebugLevel)`: Sets debug logging level (iOS only)
  - Levels: `OFF`, `ERROR`, `WARNING`, `INFO`, `TRACE`
- `mostRecentLogs(limit: number)`: Retrieves recent logs with specified limit

## Types

```typescript
enum IOLSessionType {
  SZM = "szm",
  OEWA = "oewa",
}

enum IOLPrivacyType {
  ACK = "ack",
  LIN = "lin",
  PIO = "pio",
}

enum IOLViewEventType {
  APPEARED = "appeared",
  REFRESHED = "refreshed",
  DISAPPEARED = "disappeared",
}

enum IOLDebugLevel {
  OFF = "off",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  TRACE = "trace",
}

interface StartIOMpSessionPayload {
  sessionType: IOLSessionType;
  type: IOLPrivacyType;
  offerIdentifier: string;
  hybridIdentifier?: string;
  customerData?: string;
}

interface LogViewEventPayload {
  sessionType: IOLSessionType;
  type: IOLViewEventType;
  category: string;
  comment?: string;
}

interface SetCustomConsentPayload {
  sessionType: IOLSessionType;
  consent: string;
}
```

## Example

Check out the [example](./example) directory for a complete working demo of all features.

## Documentation References

For more detailed information about the native SDKs, refer to the official documentation:

- [iOS Documentation](https://docs.infonline.de/infonline-measurement/integration/lib/iOS/pseudonym/ios_pseudonym_funktionen/)
- [Android Documentation](https://docs.infonline.de/infonline-measurement/integration/lib/android/pseudonym/android_pseudonym_funktion/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
