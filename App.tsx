import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {LoginScreen} from "./src/components/LoginScreen";
import {Provider} from "react-redux";
import {store} from "./src/api/store";

export default function App() {
  return (
      <Provider store={store}>
        <View style={styles.container}>
          <LoginScreen/>
        </View>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
