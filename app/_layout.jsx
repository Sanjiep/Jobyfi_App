import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react"; // useCallback is no longer needed if we remove onLayoutRootView

// Call preventAutoHideAsync once at the module level
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  useEffect(() => {
    console.log("useEffect check. Fonts loaded:", fontsLoaded, "Font error:", fontError);
    if (fontsLoaded || fontError) { // If fonts are loaded OR there's an error, attempt to hide splash
      console.log("Attempting to hide SplashScreen from useEffect.");
      SplashScreen.hideAsync()
        .then(() => console.log("SplashScreen hidden successfully via useEffect."))
        .catch((e) => console.warn("SplashScreen.hideAsync error from useEffect:", e));
    }
  }, [fontsLoaded, fontError]); // Re-run when fontsLoaded or fontError changes

  if (!fontsLoaded && !fontError) {
    console.log("Fonts not yet loaded and no error, RootLayout returning null.");
    return null;
  }

  if (fontError && !fontsLoaded) {
    console.error("Font loading error. RootLayout returning null. Error:", fontError);
    // Splash screen hiding is attempted in useEffect, so just return null or an error component
    return null;
  }

  console.log("Fonts loaded or font error occurred, RootLayout rendering Stack.");
  // We no longer need onLayout on the Stack for hiding the splash screen
  return <Stack />;
}