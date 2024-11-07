import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {Provider} from "react-redux";
import {store} from "./src/app/store";
import {LoginScreen} from "./src/auth/ui/LoginScreen";
import {RegistrationScreen} from "./src/auth/ui/RegistrationScreen";
import {createNativeStackNavigator} from "react-native-screens/native-stack";

// Функция для загрузки шрифтов
const loadFonts = async () => {
    await Font.loadAsync({
        'FantasyH1': require('./assets/fonts/dragon-slayer.regular.ttf'),
        'FantasyRegular': require('./assets/fonts/morris-roman.black.ttf'),
        'SeparateText': require('./assets/fonts/Harpers.ttf'),
        'Regular': require('./assets/fonts/IMFellEnglish-Regular.ttf'),
    });
};

export type RootStackParamList = {};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomePage() {
    return null;
}

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
            {/*<Stack.Navigator initialRouteName="Login">*/}
                <View style={styles.container}>
                    {/*<Stack.Screen name="Login"*/}
                    {/*              component={LoginScreen}*/}
                    {/*              options={{headerTitleStyle: {fontWeight: 'bold', fontSize: 22}}}/>*/}
                    {/*<Stack.Screen*/}
                    {/*    name="Register"*/}
                    {/*    component={RegistrationScreen}*/}
                    {/*    options={*/}
                    {/*        {*/}
                    {/*            headerTitleStyle: {fontWeight: 'bold', fontSize: 22}*/}
                    {/*        }*/}
                    {/*    }*/}
                    {/*/>*/}


                    <LoginScreen />
                    {/*<RegistrationScreen/>*/}
                </View>
            {/*</Stack.Navigator>*/}
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
