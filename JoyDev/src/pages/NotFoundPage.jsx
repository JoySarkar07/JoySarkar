import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0px, transparent 80px)`
        }}
      />
      
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* 404 Number */}
          <div className="relative mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              404
            </h1>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-blue-400 to-purple-500 blur-lg opacity-50" />
          </div>

          {/* Message */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Page Not Found</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Oops! It seems you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Home Page
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white bg-opacity-5 p-6 rounded-xl backdrop-filter backdrop-blur-lg border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-500">
                <div className="text-4xl mb-4">
                  {item === 1 ? '🔍' : item === 2 ? '🚀' : '💡'}
                </div>
                <h3 className="font-semibold mb-2">
                  {item === 1 ? 'Double-check URL' : item === 2 ? 'Explore Portfolio' : 'Get Inspired'}
                </h3>
                <p className="text-sm text-gray-400">
                  {item === 1 ? 'Make sure you typed the correct address' : item === 2 ? 'Discover my work and projects' : 'Check out my latest creations'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${6 + Math.random() * 10}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;