import React, { useState } from 'react';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { THEME_COLOR } from '../constants/theme';

function MainWebView() {
  const [themeState, setThemeState] = useState({
    color: 'light' as StatusBarStyle,
    bgColor: '#fff',
  });
  const insets = useSafeAreaInsets();

  const handleMessage = (event: WebViewMessageEvent) => {
    const { nativeEvent } = event;
    const { type, data } = JSON.parse(nativeEvent.data);

    if (type === 'THEME' && THEME_COLOR[data]) setThemeState(THEME_COLOR[data]);
  };
  return (
    <>
      <StatusBar style={themeState.color} />
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: themeState.bgColor,
          },
        ]}
      >
        <WebView
          source={{ uri: 'https://frolog.kr' }}
          onMessage={(event) => handleMessage(event)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainWebView;
