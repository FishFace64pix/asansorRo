import React from 'react';

export interface ContactInfoProps {
    translations: any;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ translations }) => {
    const contactDetails = [
        {
            icon: '📍',
            title: translations.contact.info.office,
            value: 'Bulevardul Pipera nr 23, Voluntari 077191',
        },
        {
            icon: '📞',
            title: translations.common.phone,
            value: '0725 545 452',
            link: 'tel:0725545452',
        },
        {
            icon: '📧',
            title: translations.common.email,
            value: 'info@asansor.ro',
            link: 'mailto:info@asansor.ro',
        },
        {
            icon: '🕐',
            title: translations.contact.info.hours,
            value: translations.contact.info.hoursValue,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactDetails.map((detail, index) => (
                <div
                    key={index}
                    className="glass-card p-6 hover-lift"
                >
                    <div className="flex items-start gap-4">
                        <div className="text-4xl">{detail.icon}</div>
                        <div className="flex-1">
                            <h4 className="font-bold text-primary mb-2">{detail.title}</h4>
                            {detail.link ? (
                                <a href={detail.link} className="text-gray-600 hover:text-secondary transition-colors">
                                    {detail.value}
                                </a>
                            ) : (
                                <p className="text-gray-600">{detail.value}</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
