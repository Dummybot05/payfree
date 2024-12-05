import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ animation: "ios_from_right" }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        <Stack.Screen name="profile" options={{ headerStyle: {
      backgroundColor: "#ff3456",
    },
    headerTintColor: '#fff'
}} />
<Stack.Screen name="edit_details" options={{ headerStyle: {
      backgroundColor: "#ff3456",
    },
    headerTintColor: '#fff'
}} />
        <Stack.Screen name="qrcode" options={{ headerStyle: {
      backgroundColor: "#ff3456",
    },
    headerTintColor: '#fff'
}} />
<Stack.Screen name="book_tickets" options={{ headerStyle: {
      backgroundColor: "#ff3456",
    },
    headerTintColor: '#fff'
}} />
<Stack.Screen name="people" options={{ headerStyle: {
      backgroundColor: "#ff3456",
    },
    headerTintColor: '#fff'
}} />
<Stack.Screen name="paycid" options={{ headerStyle: {
      backgroundColor: "#ff3456",
    },
    headerTintColor: '#fff'
}} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
