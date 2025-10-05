import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScheduleCall = () => {
    // Replace with your actual scheduling link (e.g., Calendly)
    window.open('YOUR_SCHEDULING_LINK_HERE', '_blank');
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Header moved here for better structure */}
        <div className="contact-header">
          <h1 className="contact-title title-slide-in">
            Let's Build Together
          </h1>
          <p className="contact-subtitle fade-in-up">
            Ready to transform your brand? Get in touch and let's create something amazing together.
          </p>
        </div>

        {/* Main Content - Two Columns */}
        <div className="contact-content">
          
          {/* Left Side - Image */}
          <div className="contact-image-section fade-in-up">
            <div className="contact-image-container">
              <img 
                src="tea.jpg" // Replace with your image
                alt="Team collaboration over tea" 
                className="contact-image"
              />
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form-section fade-in-up">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your Email"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="form-textarea"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? (
                  <span className="button-content">
                    <div className="spinner" />
                    Sending...
                  </span>
                ) : (
                  <span className="button-content">
                    Send Message
                  </span>
                )}
              </button>

              {submitStatus && (
                <div className={`status-message ${submitStatus}`}>
                  {submitStatus === 'success' 
                    ? 'Thank you! Your message has been sent successfully.' 
                    : 'Sorry, there was an error. Please try again.'
                  }
                </div>
              )}

              <div className="schedule-call-section">
                <p className="schedule-call-text">
                  Want to schedule a call instead?{' '}
                  <button 
                    type="button"
                    className="schedule-call-btn"
                    onClick={handleScheduleCall}
                  >
                    Click here
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
