import React from 'react';
import './Booking.css';

const BookingSection = () => {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/your-username/consultation'
      });
    } else {
      // Fallback to direct link
      window.open('https://calendly.com/your-username/consultation', '_blank');
    }
  };

  return (
    <section className="booking-section">
      <div className="booking-container">
        
        <div className="booking-content">
          <h2>Ready to Transform Your Brand?</h2>
          <p>Book a free 30-minute consultation with our design experts</p>
          
          <button className="schedule-btn" onClick={openCalendly}>
            Schedule Now
          </button>
        </div>

      </div>
      
      {/* Calendly script for popup */}
      <script 
        type="text/javascript" 
        src="https://assets.calendly.com/assets/external/widget.js" 
        async
      ></script>
    </section>
  );
};

export default BookingSection;
