import { Platform } from "react-native";
import { Stack } from "expo-router";

// Standalone app pages: these do not share the Mac desktop chrome or styling
// used by the rest of the site. They are the pages linked from store listings.
if (Platform.OS === "web") {
  require("./app-page.css");
}

export default function AppSiteLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
