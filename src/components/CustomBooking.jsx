
// Your Calendly API configuration
const CALENDLY_ACCESS_TOKEN = "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzU4NjQ0MzA1LCJqdGkiOiI3NjRmNWZkMi05MTdjLTQ5NDQtYjEwZi02YjI0NDgyY2NmYWEiLCJ1c2VyX3V1aWQiOiI3NjhmZmI5ZC1hMWQzLTQ1NzgtYmIxMC1iMDBhM2FlMjJmNDkifQ.LyCZaU8S-0seVdCaNIqr_pWWWTzatgYNGezoMa_2OGLJ5wRI9WdDtEGoEoVPE79TR6IH_NgwB4lyAx5-MRzXUQ";
const CALENDLY_EVENT_TYPE_UUID = "185289069"; 


import React, { useState, useEffect } from 'react';
import './CustomBooking.css';

const CustomBookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [step, setStep] = useState(1); // 1: Calendar, 2: Time Slots, 3: Booking Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Calendly API configuration
  const OAUTH_TOKEN = CALENDLY_ACCESS_TOKEN;
  const EVENT_TYPE_URI = CALENDLY_EVENT_TYPE_UUID;
  const LOW_AVAILABILITY_THRESHOLD = 3;

  // Generate calendar dates
  const generateCalendarDates = (month) => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startOfMonth.getDay());
    
    const dates = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  // Fetch available times using the Ruby/Faraday pattern
  const fetchAvailableSlots = async (date) => {
    setLoading(true);
    try {
      // Format dates like the Ruby example
      const startTime = new Date(date);
      startTime.setHours(0, 0, 0, 0);
      const endTime = new Date(date);
      endTime.setHours(23, 59, 59, 999);

      // Build query parameters like Ruby example
      const params = new URLSearchParams({
        event_type: 'https://api.calendly.com/event_types/4e9e3fa7-2df1-4621-a5e9-cac470f1c6fc',
        start_time: '2025-09-25T12:00:00.000000z',
        end_time: '2025-09-25T23:59:00.000000z'
      });

      console.log('Fetching availability for:', date.toDateString());
      console.log('API URL:', `https://api.calendly.com/event_type_available_times?${params}`);

      const response = await fetch(
        `https://api.calendly.com/event_type_available_times?${params}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OAUTH_TOKEN}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Available times response:', data);
        
        const slots = data.collection || [];
        setAvailableSlots(slots);
        
        // Check availability threshold like Ruby example
        if (slots.length < LOW_AVAILABILITY_THRESHOLD) {
          console.warn(`Low availability: ${slots.length} slots (threshold: ${LOW_AVAILABILITY_THRESHOLD})`);
        }
        
        setStep(2); // Move to time selection
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        alert(`Error: ${errorData.message || 'Failed to fetch available times'}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      if (error.message.includes('CORS')) {
        alert('CORS Error: Please enable CORS extension or use a proxy server.');
      } else {
        alert('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date >= today && date.getMonth() === currentMonth.getMonth()) {
      setSelectedDate(date);
      setSelectedTime(null);
      fetchAvailableSlots(date);
    }
  };

  // Handle time selection
  const handleTimeSelect = (slot) => {
    setSelectedTime(slot);
    setStep(3); // Move to booking form
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      // Simulate booking submission (replace with actual Calendly booking API)
      const bookingData = {
        event_type: EVENT_TYPE_URI,
        start_time: selectedTime.start_time,
        invitee: {
          name: formData.name,
          email: formData.email,
          custom_questions_responses: [
            {
              question: "What would you like to discuss?",
              answer: formData.message || "No specific message provided"
            }
          ]
        }
      };

      console.log('Submitting booking:', bookingData);

      // Replace with actual booking API calll
      const response = await fetch('https://api.calendly.com/schedued_events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OAUTH_TOKEN}`
        },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        setSuccess(true);
        console.log('Booking submitted successfully!');
      } else {
        const errorData = await response.json();
        console.error('Booking Error:', errorData);
        alert(`Booking failed: ${errorData.message || 'Please try again'}`);
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Navigate months
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    
    const today = new Date();
    if (newMonth < today) return;
    
    setCurrentMonth(newMonth);
  };

  // Reset to calendar
  const resetToCalendar = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setAvailableSlots([]);
    setFormData({ name: '', email: '', message: '' });
  };

  // Go back one step
  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedTime(null);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const calendarDates = generateCalendarDates(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Show success message
  if (success) {
    return (
      <section className="booking-section">
        <div className="booking-container">
          <div className="success-content">
            <div className="success-icon">🎉</div>
            <h2>Booking Confirmed!</h2>
            <p>Thank you! Your consultation has been scheduled.</p>
            <div className="booking-details">
              <p><strong>Date:</strong> {selectedDate?.toDateString()}</p>
              <p><strong>Time:</strong> {new Date(selectedTime.start_time).toLocaleTimeString()}</p>
              <p><strong>Duration:</strong> 30 minutes</p>
            </div>
            <p className="success-note">
              You'll receive a confirmation email with Google Meet details shortly.
            </p>
            <button className="reset-btn" onClick={resetToCalendar}>
              Book Another Session
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="booking-section">
      <div className="booking-container">
        
        {/* Header */}
        <div className="booking-header">
          <h1>Schedule Your Consultation</h1>
          <p>Book a free 30-minute strategy session with our team</p>
          
          {/* Step indicator */}
          <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <span>1</span> Choose Date
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <span>2</span> Select Time
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <span>3</span> Book Session
            </div>
          </div>
        </div>

        {/* Step 1: Calendar */}
        {step === 1 && (
          <div className="calendar-step">
            <div className="calendar-header">
              <button 
                className="nav-btn"
                onClick={() => navigateMonth(-1)}
                disabled={currentMonth <= today}
              >
                ←
              </button>
              <h3>
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <button 
                className="nav-btn"
                onClick={() => navigateMonth(1)}
              >
                →
              </button>
            </div>

            <div className="calendar">
              <div className="weekdays">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>
              <div className="dates">
                {calendarDates.map((date, index) => {
                  const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                  const isPast = date < today;
                  const isToday = date.toDateString() === today.toDateString();
                  const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                  
                  return (
                    <button
                      key={index}
                      className={`date ${!isCurrentMonth ? 'other-month' : ''} 
                                 ${isPast ? 'disabled' : ''} 
                                 ${isToday ? 'today' : ''} 
                                 ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleDateSelect(date)}
                      disabled={isPast || !isCurrentMonth || loading}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            {loading && (
              <div className="loading-overlay">
                <div className="spinner"></div>
                <p>Loading available times...</p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Time Slots */}
        {step === 2 && (
          <div className="timeslots-step">
            <div className="step-header">
              <button className="back-btn" onClick={goBack}>← Back to Calendar</button>
              <h3>Available times for {selectedDate?.toDateString()}</h3>
            </div>

            {availableSlots.length > 0 ? (
              <>
                {availableSlots.length < LOW_AVAILABILITY_THRESHOLD && (
                  <div className="low-availability-warning">
                    ⚠️ Limited availability - only {availableSlots.length} slots remaining!
                  </div>
                )}
                
                <div className="time-slots">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`time-slot ${selectedTime === slot ? 'selected' : ''}`}
                      onClick={() => handleTimeSelect(slot)}
                    >
                      {new Date(slot.start_time).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-slots">
                <p>No available times for this date.</p>
                <button className="back-btn" onClick={goBack}>Choose Another Date</button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Booking Form */}
        {step === 3 && (
          <div className="booking-step">
            <div className="step-header">
              <button className="back-btn" onClick={goBack}>← Change Time</button>
              <h3>Complete Your Booking</h3>
            </div>

            <div className="booking-summary">
              <div className="summary-card">
                <h4>Session Details</h4>
                <div className="detail-row">
                  <span className="label">📅 Date:</span>
                  <span className="value">{selectedDate?.toDateString()}</span>
                </div>
                <div className="detail-row">
                  <span className="label">🕒 Time:</span>
                  <span className="value">
                    {new Date(selectedTime.start_time).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">⏱️ Duration:</span>
                  <span className="value">30 minutes</span>
                </div>
                <div className="detail-row">
                  <span className="label">📹 Meeting:</span>
                  <span className="value">Google Meet</span>
                </div>
              </div>
            </div>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">What would you like to discuss? (Optional)</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your project or questions..."
                  rows={4}
                />
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={submitLoading || !formData.name || !formData.email}
                >
                  {submitLoading ? (
                    <>
                      <div className="btn-spinner"></div>
                      Booking...
                    </>
                  ) : (
                    '✅ Confirm Booking'
                  )}
                </button>
              </div>

              <div className="booking-note">
                <p>📧 You'll receive a confirmation email with Google Meet details</p>
                <p>📅 A calendar invite will be sent to your email</p>
              </div>
            </form>
          </div>
        )}

      </div>
    </section>
  );
};

export default CustomBookingCalendar;
