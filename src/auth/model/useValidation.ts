import { useState } from 'react';

export type FormErrors = {
    email?: string;
    password?: string;
    username?: string;
}

export type Fields = {
    email?: string;
    password?: string;
    username?: string;
};

export const useValidation = () => {
    const [errors, setErrors] = useState<FormErrors>({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateFields = (fields: Fields): FormErrors => {
        const newErrors: FormErrors = {};

        if (fields.email !== undefined) {
            if (!fields.email || !emailRegex.test(fields.email.trim())) {
                newErrors.email = "Invalid email address";
            }
        }

        if (fields.password !== undefined) {
            if (!fields.password || fields.password.trim().length < 3) {
                newErrors.password = "Password must be at least 3 characters long";
            } else if (fields.password.trim().length > 30) {
                newErrors.password = "Password cannot be longer than 30 characters";
            }
        }

        if (fields.username !== undefined) {
            if (!fields.username || fields.username.trim().length < 3) {
                newErrors.username = "Username must be at least 3 characters long";
            } else if (fields.username.trim().length > 30) {
                newErrors.username = "Username cannot be longer than 30 characters";
            }
        }

        setErrors(newErrors);
        return newErrors;
    };

    return { errors, validateFields, setErrors };
};


