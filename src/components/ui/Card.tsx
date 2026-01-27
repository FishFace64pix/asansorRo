import React from 'react';

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    glass?: boolean;
    imageBackground?: string;
    overlay?: boolean;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    glass = false,
    imageBackground,
    overlay = false,
    onClick,
}) => {
    const cardClass = glass ? 'glass-card' : 'card';
    const cursorClass = onClick ? 'cursor-pointer' : '';

    if (imageBackground) {
        return (
            <div
                className={`${cardClass} ${cursorClass} ${className} card-image`}
                onClick={onClick}
                style={{
                    backgroundImage: `url(${imageBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {overlay && <div className="image-overlay" />}
                <div style={{ position: 'relative', zIndex: 2 }}>
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className={`${cardClass} ${cursorClass} ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};
