import React, { useState } from 'react'
import './ContactUs.css'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title brand-heading title-slide-in">
            Let's Build Together
          </h1>
          <p className="contact-subtitle brand-body fade-in-up">
            Ready to transform your brand? Get in touch and let's create something amazing together.
          </p>
        </div>

        {/* Centered Contact Form */}
        <div className="contact-form-section fade-in-up">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input brand-body"
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
                className="form-input brand-body"
                placeholder="Your Email"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input brand-body"
                placeholder="Subject"
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="form-textarea brand-body"
                placeholder="Your Message"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button brand-body"
            >
              {isSubmitting ? (
                <span className="button-content">
                  <div className="spinner" />
                  Sending Message...
                </span>
              ) : (
                <span className="button-content">
                  Send Message
                </span>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="status-message success brand-body">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="status-message error brand-body">
                Sorry, there was an error sending your message. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
