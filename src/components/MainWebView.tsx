import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { BackHandler, Linking, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
import { THEME_COLOR } from '../constants/theme';

function MainWebView() {
  const webViewRef = useRef<WebView>(null);
  const [themeState, setThemeState] = useState({
    color: 'light' as StatusBarStyle,
    bgColor: '#fff',
  });
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  const userAgent =
    'Mozilla/5.0 (Linux; Android 10; Android SDK built for x86 Build/LMY48X) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.117 Mobile Safari/608.2.11 WebView/1.0';

  useEffect(() => {
    const handleBack = () => {
      webViewRef.current?.goBack();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBack);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
  }, [canGoBack]);

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
          ref={webViewRef}
          userAgent={userAgent}
          source={{ uri: 'https://frolog.kr' }}
          onMessage={(event) => handleMessage(event)}
          onShouldStartLoadWithRequest={(req) => handleExternalPage(req)}
          onNavigationStateChange={(nav) => setCanGoBack(nav.canGoBack)}
          allowsBackForwardNavigationGestures
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
