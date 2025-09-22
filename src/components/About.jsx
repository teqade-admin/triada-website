import React from 'react'
import './About.css'
import AnimatedTriada from './AnimatedTriada'

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Title - Centered */}
        <h1 className="about-title brand-heading">
          About Triada
        </h1>
        
        {/* Content + Image - Centered with 2:1 ratio */}
        <div className="about-main">
          {/* Content - Left (2 parts) */}
          <div className="about-content">
            <p className="about-description brand-body">
              We are a strategic design agency that empowers brands to grow with clarity, 
              consistency, and purpose. Through innovative design solutions and deep market 
              understanding, we transform businesses into memorable brand experiences that 
              resonate with audiences and drive meaningful connections in today's competitive landscape.
            </p>
          </div>
          
          {/* Picture - Right (1 part) - No Border, No Shadow */}
          {/* <div className="about-image">
            <img 
              src="/pen.png" 
              alt="About Triada Design Agency" 
              className="about-img"
            />
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default About
