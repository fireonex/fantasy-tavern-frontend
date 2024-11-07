import React, {useState} from 'react';
import {Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {useRegisterUserMutation} from "../api/authApi";
import {useValidation} from "../model/useValidation";
import {authStyles} from "./authStyles";

export const RegistrationScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [registerUser, {isLoading, isSuccess, error: apiError}] = useRegisterUserMutation();
    const { errors, validateFields, setErrors } = useValidation();

    const handleRegister = async () => {
        const fieldsToValidate = { email, password, username };
        const newErrors = validateFields(fieldsToValidate);

        // Если ошибок нет, выполняем регистрацию
        if (Object.keys(newErrors).length === 0) {
            try {
                const result = await registerUser({username, email, password}).unwrap();
                console.log('Register successful:', result);
            } catch (err) {
                console.error('Failed to register:', err);
            }
        }
    };

    const handleUsernameChange = (name: string) => {
        setUsername(name);
        const newErrors = {...errors};
        validateFields({ username });
        setErrors(newErrors);
    };

    const handleEmailChange = (email: string) => {
        setEmail(email);
        const newErrors = {...errors};
        validateFields({ email });
        setErrors(newErrors);
    };

    const handlePasswordChange = (password: string) => {
        setPassword(password);
        const newErrors = {...errors};
        validateFields({ password });
        setErrors(newErrors);
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
                        <TouchableOpacity style={authStyles.customButton} onPress={() => {}} disabled={isLoading}>
                            <Text style={authStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};


