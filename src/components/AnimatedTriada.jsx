import { useState, useEffect } from 'react';

const AnimatedTriada = ({ className = "", size = "normal" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Define colors directly in JSX
  const words = [
    { prefix: "Tri", language: "English", color: "inherit" }, // Same as "ada"
    { prefix: "திரி", language: "Tamil", color: "inherit" }, // --brand-sage
    { prefix: "त्रि", language: "Hindi", color: "inherit" }, // --brand-olive
    { prefix: "ത്രി", language: "Malayalam", color: "inherit" }, // --brand-beige
    { prefix: "త్రి", language: "Telugu", color: "inherit" }, // --brand-gray
    { prefix: "ತ್ರಿ", language: "Kannada", color: "inherit" }, // --brand-sage
    { prefix: "ত্রি", language: "Bengali", color: "inherit" }, // --brand-olive
    { prefix: "त्रि", language: "Marathi", color: "inherit" }, // --brand-beige
    { prefix: "त्रि", language: "Sanskrit", color: "inherit" } // --brand-gray
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  // Define sizes based on the size prop
  const fontSize = size === "large" ? "18rem" : "1.5rem";
  const minWidth = size === "large" ? "300px" : "100px";

  return (
    <span 
      className={className} 
      style={{ 
        display: 'inline-block',
        fontFamily: "'The Seasons', serif",
        fontSize: fontSize,
        fontWeight: 'bold',
        lineHeight: '1.1'
      }}
    >
      <span 
        style={{ 
          display: 'inline-block',
          minWidth: minWidth,
          textAlign: 'right',
          transition: 'all 0.4s ease-in-out',
          verticalAlign: 'baseline',
          marginRight: '0',
          paddingRight: '0',
          color: words[currentIndex].color,
          fontWeight: 'bold'
        }}
      >
        {words[currentIndex].prefix}
      </span>
      <span 
        style={{ 
          marginLeft: '0', 
          paddingLeft: '0',
          fontWeight: 'bold'
        }}
      >ada
      </span>
    </span>
  );
};

export default AnimatedTriada;
