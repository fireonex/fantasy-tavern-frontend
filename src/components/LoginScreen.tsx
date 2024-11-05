import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, ImageBackground} from 'react-native';
import {useLoginUserMutation} from "../api/userApi";

const img = require('../../assets/images/tavern-img.png');

export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, {isLoading, isSuccess, error}] = useLoginUserMutation();

    const handleLogin = async () => {
        try {
            const result = await loginUser({email, password}).unwrap();
            console.log('Login successful:', result);
        } catch (err) {
            console.error('Failed to login:', err);
        }
    };

    return (
        <ImageBackground source={img} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={{marginBottom: 50}}>
                    <Text style={styles.title}>Welcome to Tavern</Text>
                </View>
                <View>
                    <View style={styles.inputsContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button title="Login" color={'white'} onPress={handleLogin} disabled={isLoading}/>
                    </View>
                </View>
                {isSuccess && <Text style={styles.successText}>Login successful!</Text>}
                {error && <Text style={styles.errorText}>Login failed. Try again.</Text>}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    button: {
        fontFamily: 'FantasyRegular',
        backgroundColor: 'black',
        paddingHorizontal: 10
    },
    inputsContainer: {
        minWidth: 250
    },
    container: {
        marginVertical: '40%',
        marginHorizontal: '8%',
        backgroundColor: 'rgba(255,255,255,0.48)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        borderRadius: 6
    },
    title: {
        fontSize: 60,
        textAlign: 'center',
        fontFamily: 'FantasyH1',
        color: 'black',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    successText: {
        marginTop: 10,
    },
    errorText: {
        marginTop: 10,
    }
});

