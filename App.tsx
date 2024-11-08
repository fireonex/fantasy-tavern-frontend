import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as Font from 'expo-font';
import {Provider} from "react-redux";
import {store} from "./src/app/store";
import {RegistrationScreen} from "./src/auth/ui/RegistrationScreen";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
    await Font.loadAsync({
        'FantasyH1': require('./assets/fonts/dragon-slayer.regular.ttf'),
        'FantasyRegular': require('./assets/fonts/morris-roman.black.ttf'),
        'SeparateText': require('./assets/fonts/Harpers.ttf'),
        'Regular': require('./assets/fonts/IMFellEnglish-Regular.ttf'),
    });
};


export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const prepare = async () => {
            try {
                await loadFonts();
            } catch (error) {
                console.warn('Ошибка загрузки шрифтов:', error);
            } finally {
                setFontsLoaded(true);
                await SplashScreen.hideAsync();
            }
        };

        prepare();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <View style={styles.container}>
                {/*<LoginScreen/>*/}
                <RegistrationScreen/>
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
