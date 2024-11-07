import React, {useState} from 'react';
import {Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View,} from 'react-native';
import {useLoginUserMutation} from "../api/authApi";
import {useValidation} from "../model/useValidation";
import {authStyles} from "./authStyles";

export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { isLoading, isSuccess, error: apiError }] = useLoginUserMutation();
    const { errors, validateFields, setErrors } = useValidation();

    const handleLogin = async () => {
        const fieldsToValidate = { email, password };
        const newErrors = validateFields(fieldsToValidate);

        // Если ошибок нет, выполняем вход
        if (Object.keys(newErrors).length === 0) {
            try {
                await loginUser({ email, password }).unwrap();
            } catch (err) {
                console.error('Failed to login:', err);
            }
        }
    };

    const handleEmailChange = (email: string) => {
        setEmail(email);
        const newErrors = { ...errors };
        validateFields({ email });
        setErrors(newErrors);
    };

    const handlePasswordChange = (password: string) => {
        setPassword(password);
        const newErrors = { ...errors };
        validateFields({ password });
        setErrors(newErrors);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
                <View style={authStyles.container}>
                    <View style={{ marginBottom: 50 }}>
                        <Text style={authStyles.title}>Login</Text>
                    </View>
                    <View>
                        <View style={authStyles.inputsContainer}>
                            <TextInput
                                style={authStyles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={handleEmailChange}
                            />
                            {errors.email && <Text style={authStyles.errorText}>{errors.email}</Text>}

                            <TextInput
                                style={authStyles.input}
                                placeholder="Password"
                                secureTextEntry
                                value={password}
                                onChangeText={handlePasswordChange}
                            />
                            {errors.password && <Text style={authStyles.errorText}>{errors.password}</Text>}
                        </View>
                        <TouchableOpacity style={authStyles.customButton} onPress={handleLogin} disabled={isLoading}>
                            <Text style={authStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    {isSuccess && <Text style={authStyles.successText}>Login successful!</Text>}
                    {apiError && (
                        <Text style={authStyles.errorText}>
                            {(apiError as any).data?.message || "An error occurred during login"}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};


