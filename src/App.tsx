import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WebScreen from './components/WebScreen';
import { RootStackParamList } from './types/rootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='/'
          component={WebScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='/onboarding'
          component={WebScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='feed/:contentId/comments' component={WebScreen} />
        <Stack.Screen name='Review' component={WebScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <WebView
//         allowsBackForwardNavigationGestures
//         bounces={false}
//         source={{ uri: 'https://www.frolog.kr' }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
