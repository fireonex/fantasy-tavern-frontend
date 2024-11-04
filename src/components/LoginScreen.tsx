import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {useLoginUserMutation} from "../api/userApi";

export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { isLoading, isSuccess, error }] = useLoginUserMutation();

    const handleLogin = async () => {
        try {
            const result = await loginUser({ email, password }).unwrap();
            console.log('Login successful:', result);
        } catch (err) {
            console.error('Failed to login:', err);
        }
    };

    return (
        <View style={styles.container}>
            {/*<Text style={{textAlign: "center", marginBottom: 40}}>Login</Text>*/}
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
            <Button title="Login" onPress={handleLogin} disabled={isLoading} />
            {isSuccess && <Text>Login successful!</Text>}
            {error && <Text style={{ color: 'red' }}>Login failed. Try again.</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 40,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
