import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Provider } from "react-redux";
import { store } from "./src/api/store";
import { LoginScreen } from "./src/components/LoginScreen";

// Функция для загрузки шрифтов
const loadFonts = async () => {
    await Font.loadAsync({
        'FantasyH1': require('./assets/fonts/dragon-slayer.regular.ttf'),
        'FantasyRegular': require('./assets/fonts/morris-roman.black.ttf'),
    });
};

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if (!fontsLoaded) {
        return (
            <AppLoading
                startAsync={loadFonts}
                onFinish={() => setFontsLoaded(true)}
                onError={(error) => console.warn('Ошибка загрузки шрифтов:', error)}
            />
        );
    }

    return (
        <Provider store={store}>
            <View style={styles.container}>
                <LoginScreen />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
