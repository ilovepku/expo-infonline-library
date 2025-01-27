import ExpoModulesCore
import INFOnlineLibrary

// Define payload types for better type safety
struct StartIOMpSessionPayload: Record {
  @Field var sessionType: String
  @Field var type: String
  @Field var offerIdentifier: String
  @Field var hybridIdentifier: String?
  @Field var customerData: String?
}

struct LogViewEventPayload: Record {
  @Field var sessionType: String
  @Field var type: String
  @Field var category: String
  @Field var comment: String?
}

struct SetCustomConsentPayload: Record {
  @Field var sessionType: String
  @Field var consent: String
}

public class ExpoInfonlineLibraryModule: Module {
  // helper functions
  private func stringToEnumValue(_ value: String, values: [String]) -> UInt {
    return UInt(values.firstIndex(where: { $0 == value }) ?? 0)
  }

  private func sessionTypeToEnum(_ type: String) -> IOLSessionType {
    let types = ["SZM", "OEWA"]
    return IOLSessionType(rawValue: stringToEnumValue(type, values: types))!
  }

  public func definition() -> ModuleDefinition {
    Name("ExpoInfonlineLibrary")

    AsyncFunction("startIOMpSession") { (payload: StartIOMpSessionPayload) -> Void in
      let types = ["ack", "lin", "pio"]
      IOLSession.defaultSession(for: sessionTypeToEnum(payload.sessionType)).start(
        withOfferIdentifier: payload.offerIdentifier,
        privacyType: IOLPrivacyType(rawValue: stringToEnumValue(payload.type, values: types))!,
        hybridIdentifier: payload.hybridIdentifier,
        customerData: payload.customerData
      )
    }

    AsyncFunction("logViewEvent") { (payload: LogViewEventPayload) -> Void in
      let types = ["appeared", "refreshed", "disappeared"]
      let eventType = IOLViewEventType(rawValue: stringToEnumValue(payload.type, values: types))!
      let event = IOLViewEvent(
        type: eventType, category: payload.category, comment: payload.comment)
      IOLSession.defaultSession(for: sessionTypeToEnum(payload.sessionType)).logEvent(event)
    }

    AsyncFunction("setCustomConsent") { (payload: SetCustomConsentPayload) -> Void in
      IOLSession.defaultSession(for: sessionTypeToEnum(payload.sessionType)).setCustomConsent(
        payload.consent)
    }

    AsyncFunction("sendLoggedEvents") { (_ sessionType: String) -> Void in
      IOLSession.defaultSession(for: sessionTypeToEnum(sessionType)).sendLoggedEvents()
    }

    AsyncFunction("terminateSession") { (_ sessionType: String) -> Void in
      IOLSession.defaultSession(for: sessionTypeToEnum(sessionType)).terminateSession()
    }

    AsyncFunction("mostRecentLogs") { (_ limit: UInt) -> [String] in
      return IOLLogging.mostRecentLogs(withLimit: limit)
    }

    AsyncFunction("setDebugLogLevel") { [self] (_ level: String) -> Void in
      let levels = ["off", "error", "warning", "info", "trace"]
      let level = IOLDebugLevel(rawValue: stringToEnumValue(level, values: levels))!
      IOLLogging.setDebugLogLevel(level)
    }
  }
}
