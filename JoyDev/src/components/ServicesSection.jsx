import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ServicesSection = () => {
    const { services } = useContext(AppContext);
    const [activeService, setActiveService] = useState(0);

    return (
        <section id="services" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl text-green-300 mb-3 text-center">Services I Offer</h1>
            <p className="text-lg text-green-200 max-w-2xl mx-auto">
                I provide comprehensive digital solutions to help businesses establish their online presence and optimize their operations.
            </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
                <div 
                key={index}
                className={`bg-gradient-to-l from-green-800 to-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
                    activeService === index 
                    ? 'ring-2 ring-blue-500 shadow-xl' 
                    : 'hover:shadow-xl'
                }`}
                onClick={() => setActiveService(index)}
                onMouseEnter={() => setActiveService(index)}
                >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                
                <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-200">
                        <svg className="w-4 h-4 fill-current text-blue-500 mr-2" viewBox="0 0 20 20">
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                        </svg>
                        {feature}
                    </li>
                    ))}
                </ul>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
};

export default ServicesSection;