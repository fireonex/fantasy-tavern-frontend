import {useState} from "react";
import {useValidation} from "./useValidation";

export const useRegistration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const {errors, validateFields, setErrors} = useValidation();
    const handleUsernameChange = (name: string) => {
        setUsername(name);
        const newErrors = {...errors};
        validateFields({username});
        setErrors(newErrors);
    };

    const handleEmailChange = (email: string) => {
        setEmail(email);
        const newErrors = {...errors};
        validateFields({email});
        setErrors(newErrors);
    };

    const handlePasswordChange = (password: string) => {
        setPassword(password);
        const newErrors = {...errors};
        validateFields({password});
        setErrors(newErrors);
    };
    return {
        validateFields,
        email,
        password,
        username,
        errors,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange
    };
}