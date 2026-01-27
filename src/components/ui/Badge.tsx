import React from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'outline';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'primary',
    className = '',
}) => {
    return (
        <span className={`badge badge-${variant} ${className}`}>
            {children}
        </span>
    );
};
