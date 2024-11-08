import React from 'react';
import {Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {useRegisterUserMutation} from "../api/authApi";
import {useRegistration} from "../model/useRegistartion";
import {authStyles} from "./styles/authStyles";
import {EmailPasswordForm} from "./EmailPasswordForm";



export const RegistrationScreen = () => {
    const [registerUser, {isLoading, isSuccess, error: apiError}] = useRegisterUserMutation();
    const {
        email,
        password,
        username,
        errors,
        validateFields,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
    } = useRegistration()

    const handleRegister = async () => {
        const fieldsToValidate = {email, password, username};
        const newErrors = validateFields(fieldsToValidate);

        if (Object.keys(newErrors).length === 0) {
            try {
                const result = await registerUser({username, email, password}).unwrap();
                console.log('Register successful:', result);
            } catch (err) {
                console.error('Failed to register:', err);
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
                <View style={authStyles.container}>
                    <View style={{marginBottom: 50}}>
                        <Text style={authStyles.title}>Register</Text>
                    </View>
                    <View>
                        <View style={authStyles.inputsContainer}>
                            <TextInput
                                style={authStyles.input}
                                placeholder="Username"
                                value={username}
                                onChangeText={handleUsernameChange}
                            />
                            {errors.username && <Text style={authStyles.errorText}>{errors.username}</Text>}

                            <EmailPasswordForm password={password} email={email} handleEmailChange={handleEmailChange}
                                               handlePasswordChange={handlePasswordChange} errors={errors}/>
                        </View>
                        <TouchableOpacity style={authStyles.customButton} onPress={handleRegister} disabled={isLoading}>
                            <Text style={authStyles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        isSuccess && <Text style={authStyles.successText}>Register successful!</Text>
                    }
                    {
                        apiError && (
                            <Text style={authStyles.errorText}>
                                {(apiError as any).data?.message || "An error occurred during registration"}
                            </Text>
                        )
                    }
                    <View>
                        <Text>Already have an account?</Text>
                        <TouchableOpacity style={authStyles.customButton} onPress={() => {}}
                                          disabled={isLoading}>
                            <Text style={authStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
