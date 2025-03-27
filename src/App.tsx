import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
  const [statusBarStyle, setStatusBarStyle] = useState<
    'light' | 'dark' | 'auto'
  >('light');

  const handleChangeNavigation = (url: string) => {
    if (url.includes('search') && !url.includes('search-home'))
      return setStatusBarStyle('dark');
    setStatusBarStyle('light');
  };

  return (
    <View style={styles.container}>
      <StatusBar style={statusBarStyle} />
      <WebView
        source={{ uri: 'https://www.frolog.kr' }}
        onNavigationStateChange={(navState) =>
          handleChangeNavigation(navState.url)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
