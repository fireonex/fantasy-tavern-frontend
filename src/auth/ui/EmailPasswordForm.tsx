import {Text, TextInput} from "react-native";
import {authStyles} from "./styles/authStyles";
import React from "react";
import {FormErrors} from "../model/useValidation";

type Props = {
    email: string;
    password: string;
    handleEmailChange: (email: string) => void;
    handlePasswordChange: (email: string) => void;
    errors: FormErrors
};

export const EmailPasswordForm = ({email, password, handleEmailChange, handlePasswordChange, errors}: Props) => {
    return (
        <>
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
        </>
    );
};
