import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    children: React.ReactNode;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    children,
    icon,
    className = '',
    disabled,
    ...props
}) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClass = size !== 'md' ? `btn-${size}` : '';

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
            )}
            {!isLoading && icon && <span>{icon}</span>}
            {children}
        </button>
    );
};
