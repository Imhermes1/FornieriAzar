'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FloatingContactButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ submitting: false, submitted: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: 'Quick enquiry',
          message: formData.message
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send enquiry');
      }

      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Close modal after 2 seconds
      setTimeout(() => {
        setShowModal(false);
        setStatus({ submitting: false, submitted: false, error: null });
      }, 2000);

    } catch (error) {
      setStatus({
        submitting: false,
        submitted: false,
        error: error.message || 'Failed to send enquiry'
      });
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div
        className="floating-contact-btn"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={() => setShowModal(true)}
        role="button"
        tabIndex={0}
        aria-label="Get in touch"
      >
        <div className="floating-contact-btn__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className={`floating-contact-btn__text ${isExpanded ? 'visible' : ''}`}>
          Get in touch
        </span>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="contact-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="contact-modal__close"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="contact-modal__content">
              {status.submitted ? (
                <div className="contact-modal__success">
                  <div className="success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Thank you</h3>
                  <p>Your enquiry has been received. We'll be in touch shortly.</p>
                </div>
              ) : (
                <>
                  <h2>Get in touch</h2>
                  <p className="contact-modal__subtitle">We'll usually get back to you within 24 hours</p>

                  {status.error && (
                    <div className="contact-modal__error">
                      {status.error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="modal-form-row">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={status.submitting}
                      />
                    </div>

                    <div className="modal-form-row">
                      <input
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={status.submitting}
                      />
                    </div>

                    <div className="modal-form-row">
                      <input
                        type="tel"
                        placeholder="Phone (optional)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={status.submitting}
                      />
                    </div>

                    <div className="modal-form-row">
                      <textarea
                        placeholder="How can we help?"
                        rows="4"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        disabled={status.submitting}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="modal-submit-btn"
                      disabled={status.submitting}
                    >
                      {status.submitting ? 'Sending...' : 'Send message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .floating-contact-btn {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--off-black);
          color: var(--white);
          padding: 16px;
          border-radius: 50px;
          box-shadow: 0 12px 32px rgba(15, 15, 15, 0.3);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .floating-contact-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(15, 15, 15, 0.4);
          background: var(--charcoal);
        }

        .floating-contact-btn__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .floating-contact-btn__text {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.05em;
          white-space: nowrap;
          opacity: 0;
          max-width: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .floating-contact-btn__text.visible {
          opacity: 1;
          max-width: 200px;
          padding-right: 8px;
        }

        .contact-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 15, 15, 0.8);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }

        .contact-modal {
          background: var(--white);
          border-radius: 20px;
          max-width: 500px;
          width: 100%;
          position: relative;
          animation: fadeIn 0.3s ease;
          box-shadow: 0 24px 60px rgba(15, 15, 15, 0.3);
        }

        .contact-modal__close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          color: var(--gunmetal);
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all var(--transition);
        }

        .contact-modal__close:hover {
          background: var(--pearl);
          color: var(--off-black);
        }

        .contact-modal__content {
          padding: 48px 40px;
        }

        .contact-modal__content h2 {
          font-size: 28px;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
          color: var(--off-black);
        }

        .contact-modal__subtitle {
          font-size: 14px;
          color: var(--gunmetal);
          margin-bottom: 32px;
        }

        .contact-modal__success {
          text-align: center;
          padding: 24px 0;
        }

        .success-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 24px;
          color: #10B981;
        }

        .contact-modal__success h3 {
          font-size: 24px;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
          color: var(--off-black);
        }

        .contact-modal__success p {
          color: var(--gunmetal);
          font-size: 14px;
        }

        .contact-modal__error {
          padding: 16px;
          background: rgba(220, 38, 38, 0.08);
          border: 1px solid rgba(220, 38, 38, 0.2);
          border-radius: 10px;
          color: #DC2626;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .modal-form-row {
          margin-bottom: 20px;
        }

        .modal-form-row input,
        .modal-form-row textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid var(--cloud);
          border-radius: 10px;
          font-size: 15px;
          font-family: var(--font-body);
          color: var(--off-black);
          background: var(--white);
          transition: all var(--transition);
        }

        .modal-form-row input:focus,
        .modal-form-row textarea:focus {
          outline: none;
          border-color: var(--gunmetal);
          box-shadow: 0 0 0 3px rgba(147, 151, 160, 0.1);
        }

        .modal-form-row input::placeholder,
        .modal-form-row textarea::placeholder {
          color: var(--gunmetal);
        }

        .modal-form-row textarea {
          resize: vertical;
          min-height: 100px;
        }

        .modal-submit-btn {
          width: 100%;
          padding: 16px 32px;
          background: var(--off-black);
          color: var(--white);
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: var(--font-body);
          transition: all var(--transition);
          margin-top: 8px;
        }

        .modal-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(15, 15, 15, 0.2);
        }

        .modal-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 640px) {
          .floating-contact-btn {
            bottom: 20px;
            right: 20px;
          }

          .contact-modal__content {
            padding: 40px 24px;
          }

          .contact-modal__content h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
}
