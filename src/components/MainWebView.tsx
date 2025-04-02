import React, { useState } from 'react';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { Linking, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
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

  const handleExternalPage = (req: ShouldStartLoadRequest) => {
    if (req.url.includes('docs.google.com')) {
      Linking.openURL(req.url);
      return false;
    }
    return true;
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
          onShouldStartLoadWithRequest={(req) => handleExternalPage(req)}
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
