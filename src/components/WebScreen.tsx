import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { RootStackParamList } from '../types/rootStackParamList';

type WebScreenRouteProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, keyof RootStackParamList>;
};

const generateUrl = (baseUrl: string, searchParams: string) =>
  // const urlWithParams = baseUri.replace(
  //   /:(\w+)/g,
  //   (_, key) => params[key] || ''
  // );
  `${baseUrl}?${searchParams}`;
function WebScreen({ navigation, route }: WebScreenRouteProps) {
  const webViewRef = useRef<WebView>(null);
  const baseUri = 'http://localhost:3000';
  const convertedUrl = route.params
    ? `${baseUri}${generateUrl(route.params.path, route.params.searchParams)}`
    : baseUri;
  console.log(convertedUrl);

  const onMessage = async (event: WebViewMessageEvent) => {
    const { data, type } = JSON.parse(event.nativeEvent.data);
    if (type === 'ROUTER_EVENT') {
      const [onlyPath, queryParams] = data.path.split('?');

      navigation.navigate(onlyPath, {
        path: onlyPath,
        searchParams: queryParams,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: convertedUrl }}
        ref={webViewRef}
        onMessage={onMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebScreen;
