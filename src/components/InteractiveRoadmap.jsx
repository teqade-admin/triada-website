import { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronLeft, ChevronRight, Target, Users, MessageSquare, Palette, BarChart3, Brain, Lightbulb, TrendingUp, Map, Zap, Rocket, Award } from 'lucide-react';
import './InteractiveRoadmap.css';

const InteractiveRoadmap = ({ onScrollLockChange, onSectionComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const containerRef = useRef(null);
  const lastScrollTime = useRef(0);
  const scrollThrottle = 1000; // 1 second throttle

  const roadmapSteps = [
    {
      title: "Brand Strategy",
      content: {
        heading: "Triada's brand strategy empowers businesses to grow with clarity, consistency, and purpose by aligning every brand element to a focused vision.",
        sections: [
          {
            title: "Brand Positioning",
            description: "We define the brand's unique purpose and value to ensure it stands out meaningfully in the market.",
            icon: Target
          },
          {
            title: "Target Audience",
            description: "We identify and understand the ideal customer to craft messaging that resonates deeply and drives connection.",
            icon: Users
          },
          {
            title: "Messaging Framework",
            description: "We build a clear, structured narrative that aligns voice, tone, and storytelling across every touchpoint.",
            icon: MessageSquare
          },
          {
            title: "Visual Identity",
            description: "We align all design elements to reflect the brand's strategy and create a consistent, recognizable presence.",
            icon: Palette
          }
        ]
      }
    },
    {
      title: "Research/Insights",
      content: {
        heading: "Deep market research and consumer insights drive our strategic decisions, ensuring every brand move is backed by data and understanding.",
        sections: [
          {
            title: "Market Analysis",
            description: "We conduct comprehensive market research to identify opportunities, threats, and competitive advantages in your industry.",
            icon: BarChart3
          },
          {
            title: "Consumer Behavior",
            description: "We analyze customer patterns, preferences, and pain points to create targeted strategies that resonate.",
            icon: Brain
          },
          {
            title: "Competitive Intelligence",
            description: "We study your competitors' strengths and weaknesses to position your brand for maximum differentiation.",
            icon: Lightbulb
          },
          {
            title: "Trend Forecasting",
            description: "We identify emerging trends and shifts in your market to keep your brand ahead of the curve.",
            icon: TrendingUp
          }
        ]
      }
    },
    {
      title: "Solution/Strategy",
      content: {
        heading: "Strategic solutions tailored to your unique challenges, combining creativity with proven methodologies to deliver measurable results.",
        sections: [
          {
            title: "Strategic Planning",
            description: "We develop comprehensive roadmaps that outline clear steps toward achieving your brand objectives and business goals.",
            icon: Map
          },
          {
            title: "Creative Direction",
            description: "We establish the visual and conceptual framework that will guide all creative executions across channels.",
            icon: Palette
          },
          {
            title: "Implementation Strategy",
            description: "We create detailed plans for rolling out brand initiatives across all touchpoints and marketing channels.",
            icon: Zap
          },
          {
            title: "Success Metrics",
            description: "We define key performance indicators and measurement frameworks to track progress and optimize performance.",
            icon: BarChart3
          }
        ]
      }
    },
    {
      title: "Market Opportunity",
      content: {
        heading: "Identifying and capitalizing on market opportunities through strategic positioning and innovative approaches to drive growth.",
        sections: [
          {
            title: "Market Gaps",
            description: "We identify underserved segments and unmet needs in your market to create new opportunities for growth.",
            icon: Target
          },
          {
            title: "Growth Channels",
            description: "We explore and develop new channels and partnerships to expand your brand's reach and influence.",
            icon: TrendingUp
          },
          {
            title: "Innovation Opportunities",
            description: "We spot emerging technologies and trends that can be leveraged to create competitive advantages.",
            icon: Lightbulb
          },
          {
            title: "Revenue Streams",
            description: "We identify new monetization opportunities and business models to diversify and strengthen revenue.",
            icon: BarChart3
          }
        ]
      }
    },
    {
      title: "Brand Strategy",
      content: {
        heading: "Final brand strategy implementation, bringing together all insights and solutions into a cohesive, executable brand framework.",
        sections: [
          {
            title: "Brand Architecture",
            description: "We create a clear hierarchy and relationship structure for all brand elements, products, and sub-brands.",
            icon: Map
          },
          {
            title: "Brand Guidelines",
            description: "We develop comprehensive brand standards that ensure consistent application across all touchpoints.",
            icon: Award
          },
          {
            title: "Launch Strategy",
            description: "We plan and execute strategic brand launches that maximize impact and market penetration.",
            icon: Rocket
          },
          {
            title: "Brand Evolution",
            description: "We establish frameworks for ongoing brand development and adaptation to changing market conditions.",
            icon: TrendingUp
          }
        ]
      }
    }
  ];

  // Reset animations when step changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [currentStep]);

  // Activate scroll lock when component mounts (when roadmap section becomes active)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScrollLocked(true);
    }, 200); // Small delay to ensure smooth transition

    return () => clearTimeout(timer);
  }, []);

  // Communicate scroll lock state to parent App component
  useEffect(() => {
    if (onScrollLockChange) {
      onScrollLockChange(isScrollLocked);
    }
  }, [isScrollLocked, onScrollLockChange]);

  // Handle GLOBAL scroll-based navigation within roadmap
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isScrollLocked) return;

      const now = Date.now();
      if (now - lastScrollTime.current < scrollThrottle) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      lastScrollTime.current = now;

      if (e.deltaY > 0) {
        // Scrolling down - go to next step
        if (currentStep < roadmapSteps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          // Completed all steps, unlock scroll and notify parent
          setIsScrollLocked(false);
          if (onSectionComplete) {
            setTimeout(() => onSectionComplete(), 800); // Allow time for final step to be appreciated
          }
        }
      } else {
        // Scrolling up - go to previous step
        if (currentStep > 0) {
          setCurrentStep(prev => prev - 1);
        }
      }
    };

    // Add event listener to WINDOW for global scroll capture
    if (isScrollLocked) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        window.removeEventListener('wheel', handleWheel);
      };
    }
  }, [currentStep, isScrollLocked, roadmapSteps.length, onSectionComplete]);

  // Reset scroll lock when manually navigating
  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex);
    setIsScrollLocked(true);
  };

  const handleArrowNavigation = (direction) => {
    if (direction === 'prev' && currentStep > 0) {
      handleStepChange(currentStep - 1);
    } else if (direction === 'next' && currentStep < roadmapSteps.length - 1) {
      handleStepChange(currentStep + 1);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen p-8 brand-body"
    >
      <div className="max-w-6xl mx-auto">
        {/* Interactive Roadmap */}
        <div className="mb-16">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-brand-brown opacity-50"></div>
            <div 
              className="absolute top-6 left-0 h-0.5 bg-brand-brown transition-all duration-500 ease-in-out"
              style={{ width: `${(currentStep / (roadmapSteps.length - 1)) * 100}%` }}
            ></div>
            
            {/* Roadmap Steps */}
            <div className="flex justify-between relative">
              {roadmapSteps.map((step, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => handleStepChange(index)}
                >
                  {/* Circle with Icon */}
                  <div className="relative mb-4">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        index === currentStep 
                          ? 'bg-brand-brown scale-110 shadow-lg' 
                          : index < currentStep 
                            ? 'bg-brand-dark-brown shadow-md' 
                            : 'bg-brand-cream border-2 border-brand-brown'
                      }`}
                    >
                      {index === currentStep && (
                        <MapPin className="w-6 h-6 text-white animate-bounce" />
                      )}
                    </div>
                  </div>
                  
                  {/* Step Title */}
                  <div 
                    className={`text-center max-w-24 transition-all duration-300 brand-body ${
                      index === currentStep ? 'font-bold text-brand-dark-brown' : 'font-medium text-brand-brown'
                    }`}
                  >
                    <span className="leading-tight text-xl">{step.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-12 shadow-xl relative border border-brand-cream">
          {/* Navigation Arrows */}
          <div className="absolute top-6 right-6 flex gap-2">
            <button
              onClick={() => handleArrowNavigation('prev')}
              disabled={currentStep === 0}
              className="w-10 h-10 rounded-full bg-brand-brown text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-dark-brown transition-colors shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </button>
            <button
              onClick={() => handleArrowNavigation('next')}
              disabled={currentStep === roadmapSteps.length - 1}
              className="w-10 h-10 rounded-full bg-brand-brown text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-dark-brown transition-colors shadow-lg"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          <div className="text-center mb-12 pr-24">
            <h1 className="text-4xl md:text-3xl font-normal text-brand-dark-brown leading-tight max-w-4xl mx-auto brand-heading">
              {roadmapSteps[currentStep].content.heading}
            </h1>
          </div>

          {/* Content Grid with Cards */}
          <div className="grid grid-cols-2 gap-6">
            {roadmapSteps[currentStep].content.sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div 
                  key={`${index}-${animationKey}`} 
                  className="bg-brand-card bg-brand-brown rounded-xl p-6 shadow-lg transform transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1 hover:bg-brand-card group cursor-pointer fade-in-up"
                  style={{ 
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-icon flex items-center justify-center group-hover:bg-brand-icon transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-brand-brown group-hover:text-brand-dark-brown transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-normal text-brand-gray mb-3 overflow-hidden brand-heading">
                        <span 
                          key={`title-${index}-${animationKey}`}
                          className="inline-block title-slide-in"
                          style={{ 
                            animationDelay: `${index * 200 + 300}ms`
                          }}
                        >
                          {section.title}
                        </span>
                      </h2>
                      <p className="text-brand-gray leading-relaxed group-hover:text-brand-white transition-colors brand-body">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveRoadmap;
