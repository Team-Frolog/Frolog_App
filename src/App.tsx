import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainWebView from './components/MainWebView';

export default function App() {
  return (
    <SafeAreaProvider>
      <MainWebView />
    </SafeAreaProvider>
  );
}
