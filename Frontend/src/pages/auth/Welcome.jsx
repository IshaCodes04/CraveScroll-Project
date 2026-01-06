import { useState, useEffect } from "react";
import { ChefHat, Globe, Heart, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const quotes = [
    {
      text: "People who love to eat are always the best people.",
      author: "Julia Child",
    },
    {
      text: "Food is symbolic of love when words are inadequate.",
      author: "Alan D. Wolfelt",
    },
    {
      text: "One cannot think well, love well, sleep well, if one has not dined well.",
      author: "Virginia Woolf",
    },
    {
      text: "Cooking is like love. It should be entered into with abandon or not at all.",
      author: "Harriet Van Horne",
    },
    {
      text: "Food brings people together on many different levels.",
      author: "Yotam Ottolenghi",
    },
  ];

  const features = [
    {
      icon: ChefHat,
      title: "Endless Scroll",
      description: "Discover unlimited recipes",
    },
    {
      icon: Heart,
      title: "Save Favorites",
      description: "Keep your loved dishes",
    },
    {
      icon: Globe,
      title: "Global Cuisine",
      description: "Explore world flavors",
    },
    {
      icon: Share2,
      title: "Share Recipes",
      description: "Connect with foodies",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

   const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="/src/assets/6174380-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/60 to-black/85" />

      <div className="relative z-10 w-full max-w-[550px] px-6 py-10 text-center">
        <div className="mb-8 flex justify-center animate-float">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl">
            <ChefHat className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent animate-fadeIn">
          CraveScroll
        </h1>

        <p
          className="text-white/90 text-lg mb-8 font-medium animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          Discover & savor endless culinary delights
        </p>

        <div className="mb-10 min-h-[80px] flex items-center justify-center">
          <div
            className={`transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <blockquote className="text-white/95 text-base italic mb-2 px-4">
              "{quotes[currentQuoteIndex].text}"
            </blockquote>
            <cite className="text-orange-400 text-sm font-semibold not-italic">
              — {quotes[currentQuoteIndex].author}
            </cite>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/10 rounded-2xl p-5 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <Icon
                  className="w-8 h-8 text-orange-400 mx-auto mb-3"
                  strokeWidth={2}
                />
                <h3 className="text-white font-bold text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-xs">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {quotes.map((_, index) => (
            <div
              key={index}
              className={`rounded-full transition-all duration-300 ${
                index === currentQuoteIndex
                  ? "w-10 h-2.5 bg-orange-500"
                  : "w-2.5 h-2.5 bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleGetStarted}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg py-4 px-8 rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 hover:-translate-y-1 active:scale-100 animate-fadeIn"
          style={{ animationDelay: "0.7s" }}
        >
          Get Started
        </button>

        <p
          className="text-white/60 text-xs mt-6 animate-fadeIn"
          style={{ animationDelay: "0.8s" }}
        >
          Join thousands of food lovers worldwide
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Welcome;