import { useEffect } from "react";

import ExpoInfonlineLibrary, {
  IOLDebugLevel,
  IOLPrivacyType,
  IOLSessionType,
  IOLViewEventType,
} from "expo-infonline-library";
import { Button, Platform, StyleSheet, View } from "react-native";

export default function App() {
  useEffect(() => {
    const initializeSessionAndLogViewEvent = async () => {
      try {
        if (Platform.OS === "ios") {
          await ExpoInfonlineLibrary.setDebugLogLevel(IOLDebugLevel.TRACE);
        }

        await ExpoInfonlineLibrary.startIOMpSession({
          sessionType: IOLSessionType.SZM,
          type: IOLPrivacyType.ACK,
          offerIdentifier: "<yourIdentifier>",
        });

        await ExpoInfonlineLibrary.setCustomConsent({
          sessionType: IOLSessionType.SZM,
          consent: "FF00810000",
        });

        await ExpoInfonlineLibrary.logViewEvent({
          sessionType: IOLSessionType.SZM,
          type: IOLViewEventType.APPEARED,
          category: "<category>",
        });

        // await ExpoInfonlineLibrary.sendLoggedEvents(IOLSessionType.SZM)

        // const logs = await ExpoInfonlineLibrary.mostRecentLogs(0);
        // console.log(`InfonlineLibrary Logs: ${logs.join("\n\n")}`);
      } catch (error) {
        console.error(
          "Failed to initialize session, set custom consent and log view event:",
          error
        );
      }
    };

    initializeSessionAndLogViewEvent();

    // Cleanup: terminate session when component unmounts
    return () => {
      ExpoInfonlineLibrary.terminateSession(IOLSessionType.SZM);
    };
  }, []);

  const handleRefresh = async () => {
    try {
      await ExpoInfonlineLibrary.logViewEvent({
        sessionType: IOLSessionType.SZM,
        type: IOLViewEventType.REFRESHED,
        category: "<category>",
        comment: "User triggered refresh",
      });
    } catch (error) {
      console.error("Failed to log refresh view event:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Trigger Refresh View Event" onPress={handleRefresh} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
