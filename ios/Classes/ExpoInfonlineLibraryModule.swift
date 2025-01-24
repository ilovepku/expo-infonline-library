import ExpoModulesCore
import INFOnlineLibrary

// Define payload types for better type safety
struct StartIOMpSession: Record {
  @Field var sessionType: String
  @Field var type: String
  @Field var offerIdentifier: String
  @Field var hybridIdentifier: String?
  @Field var customerData: String?
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

    AsyncFunction("startIOMpSession") { (payload: StartIOMpSession) -> Void in
      let sessionType = payload.sessionType

      let types = ["ack", "lin", "pio"]
      IOLSession.defaultSession(for: sessionTypeToEnum(sessionType)).start(
        withOfferIdentifier: payload.offerIdentifier,
        privacyType: IOLPrivacyType(rawValue: stringToEnumValue(payload.type, values: types))!,
        hybridIdentifier: payload.hybridIdentifier,
        customerData: payload.customerData
      )
    }

    AsyncFunction("terminateSession") { (_ sessionType: String) -> Void in
      IOLSession.defaultSession(for: sessionTypeToEnum(sessionType)).terminateSession()
    }

    AsyncFunction("setDebugLogLevel") { [self] (_ level: String) -> Void in
      let levels = ["off", "error", "warning", "info", "trace"]
      let level = IOLDebugLevel(rawValue: stringToEnumValue(level, values: levels))!
      IOLLogging.setDebugLogLevel(level)
    }
  }
}
