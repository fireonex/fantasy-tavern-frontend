import React from 'react';
import {Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View,} from 'react-native';
import {useLoginUserMutation} from "../api/authApi";
import {authStyles} from "./styles/authStyles";

import {EmailPasswordForm} from "./EmailPasswordForm";
import {useRegistration} from "../model/useRegistartion";

export const LoginScreen = () => {
    const [loginUser, {isLoading, isSuccess, error: apiError}] = useLoginUserMutation();
    const {
        email,
        password,
        errors,
        validateFields,
        handleEmailChange,
        handlePasswordChange,
    } = useRegistration()

    const handleLogin = async () => {
        const fieldsToValidate = {email, password};
        const newErrors = validateFields(fieldsToValidate);

        if (Object.keys(newErrors).length === 0) {
            try {
                await loginUser({email, password}).unwrap();
            } catch (err) {
                console.error('Failed to login:', err);
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
                <View style={authStyles.container}>
                    <View style={{marginBottom: 50}}>
                        <Text style={authStyles.title}>Login</Text>
                    </View>
                    <View>
                        <View style={authStyles.inputsContainer}>
                            <EmailPasswordForm password={password} email={email} handleEmailChange={handleEmailChange}
                                               handlePasswordChange={handlePasswordChange} errors={errors}/>
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
                    <View>
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity style={authStyles.customButton}
                                          onPress={() => {}}
                                          disabled={isLoading}>
                            <Text style={authStyles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};


