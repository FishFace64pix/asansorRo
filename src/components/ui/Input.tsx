import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && <label className="label">{label}</label>}
                <input
                    ref={ref}
                    className={`input ${error ? 'input-error' : ''} ${className}`}
                    {...props}
                />
                {error && <p className="error-message">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && <label className="label">{label}</label>}
                <textarea
                    ref={ref}
                    className={`textarea ${error ? 'input-error' : ''} ${className}`}
                    {...props}
                />
                {error && <p className="error-message">{error}</p>}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && <label className="label">{label}</label>}
                <select
                    ref={ref}
                    className={`select ${error ? 'input-error' : ''} ${className}`}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && <p className="error-message">{error}</p>}
            </div>
        );
    }
);

Select.displayName = 'Select';
