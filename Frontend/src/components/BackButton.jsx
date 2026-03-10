import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to, className = "" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1); // Default to browser back
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`absolute top-6 left-6 text-white/60 hover:text-white transition-colors z-50 ${className}`}
      aria-label="Go back"
    >
      <ChevronLeft className="w-8 h-8" />
    </button>
  );
};

export default BackButton;
