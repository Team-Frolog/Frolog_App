/** @format */

import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://www.frolog.kr' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
