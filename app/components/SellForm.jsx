'use client';

import { useState, useEffect } from 'react';

export default function SellForm() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        propertyAddress: '',
        lastSold: '',
        neverSold: false,
        saleMethod: '',
        timeline: '',
        estimatedValue: '',
        improvements: '',
        selectedAgent: '',
        email: '',
        phone: '',
        contactPreference: '',
        preferredDate: '',
        preferredTime: '',
        heardAbout: []
    });

    // Fetch agents on mount
    useEffect(() => {
        fetch('/api/agents')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setAgents(data.agents);
                }
            })
            .catch(err => console.error('Failed to fetch agents:', err));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' && name === 'heardAbout') {
            setFormData(prev => ({
                ...prev,
                heardAbout: checked
                    ? [...prev.heardAbout, value]
                    : prev.heardAbout.filter(item => item !== value)
            }));
        } else if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Get selected agent details
        const selectedAgentData = agents.find(a => a.id === formData.selectedAgent);

        try {
            const response = await fetch('/api/sell', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    agentName: selectedAgentData?.name || null,
                    agentEmail: selectedAgentData?.email || null
                })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setFormData({
                    firstName: '',
                    lastName: '',
                    propertyAddress: '',
                    lastSold: '',
                    neverSold: false,
                    saleMethod: '',
                    timeline: '',
                    estimatedValue: '',
                    improvements: '',
                    selectedAgent: '',
                    email: '',
                    phone: '',
                    contactPreference: '',
                    preferredDate: '',
                    preferredTime: '',
                    heardAbout: []
                });
            } else {
                setError(data.error || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setError('Failed to submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="sell-form__success">
                <div className="sell-form__success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>We've received your appraisal request and one of our team members will be in touch shortly.</p>
                <button
                    onClick={() => setSuccess(false)}
                    className="btn btn--primary"
                >
                    Submit Another Request
                </button>
            </div>
        );
    }

    return (
        <form className="sell-form" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="sell-form__row">
                <div className="sell-form__field">
                    <label>First Name *</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                    />
                </div>
                <div className="sell-form__field">
                    <label>Last Name *</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                    />
                </div>
            </div>

            {/* Property Address */}
            <div className="sell-form__field">
                <label>What is the address of the property you wish to sell? *</label>
                <input
                    type="text"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleChange}
                    placeholder="Please enter an address"
                    required
                />
            </div>

            {/* Last Sold */}
            <div className="sell-form__row sell-form__row--align">
                <div className="sell-form__field sell-form__field--grow">
                    <label>When was the last time you sold?</label>
                    <input
                        type="text"
                        name="lastSold"
                        value={formData.lastSold}
                        onChange={handleChange}
                        placeholder="Enter a year, eg. '2019'"
                        disabled={formData.neverSold}
                    />
                </div>
                <label className="sell-form__checkbox-inline">
                    <input
                        type="checkbox"
                        name="neverSold"
                        checked={formData.neverSold}
                        onChange={handleChange}
                    />
                    <span>I've never sold</span>
                </label>
            </div>

            {/* Sale Method */}
            <div className="sell-form__field">
                <label>What's your preferred method of sale?</label>
                <div className="sell-form__radio-group">
                    {['Auction', 'Off Market', 'Private Sale', 'Expression of Interest', 'Need advice on this'].map(method => (
                        <label key={method} className="sell-form__radio">
                            <input
                                type="radio"
                                name="saleMethod"
                                value={method}
                                checked={formData.saleMethod === method}
                                onChange={handleChange}
                            />
                            <span>{method}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Timeline */}
            <div className="sell-form__field">
                <label>When are you hoping to come onto the market?</label>
                <div className="sell-form__radio-group">
                    {['0-3 Months', '3-6 Months', '6 Months plus'].map(time => (
                        <label key={time} className="sell-form__radio">
                            <input
                                type="radio"
                                name="timeline"
                                value={time}
                                checked={formData.timeline === time}
                                onChange={handleChange}
                            />
                            <span>{time}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Estimated Value */}
            <div className="sell-form__field">
                <label>What do you think your home is worth?</label>
                <input
                    type="text"
                    name="estimatedValue"
                    value={formData.estimatedValue}
                    onChange={handleChange}
                    placeholder="Please enter a ballpark figure"
                />
            </div>

            {/* Improvements */}
            <div className="sell-form__field">
                <label>Have you made any improvements to the property?</label>
                <div className="sell-form__radio-group sell-form__radio-group--inline">
                    <label className="sell-form__radio">
                        <input
                            type="radio"
                            name="improvements"
                            value="Yes"
                            checked={formData.improvements === 'Yes'}
                            onChange={handleChange}
                        />
                        <span>Yes</span>
                    </label>
                    <label className="sell-form__radio">
                        <input
                            type="radio"
                            name="improvements"
                            value="No"
                            checked={formData.improvements === 'No'}
                            onChange={handleChange}
                        />
                        <span>No</span>
                    </label>
                </div>
            </div>

            {/* Select Agent */}
            <div className="sell-form__field">
                <label>Please select your agent</label>
                <select
                    name="selectedAgent"
                    value={formData.selectedAgent}
                    onChange={handleChange}
                >
                    <option value="">Please select your agent</option>
                    {agents.map(agent => (
                        <option key={agent.id} value={agent.id}>
                            {agent.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Email */}
            <div className="sell-form__field">
                <label>What's your email address? *</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Please enter a contact email"
                    required
                />
            </div>

            {/* Phone */}
            <div className="sell-form__field">
                <label>What's your contact number?</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Please enter a contact number"
                />
            </div>

            {/* Contact Preference */}
            <div className="sell-form__field">
                <label>When would you like to be contacted?</label>
                <div className="sell-form__radio-group">
                    {['Today', 'Tomorrow', 'This Week', 'Other (Specify Date)'].map(pref => (
                        <label key={pref} className="sell-form__radio">
                            <input
                                type="radio"
                                name="contactPreference"
                                value={pref}
                                checked={formData.contactPreference === pref}
                                onChange={handleChange}
                            />
                            <span>{pref}</span>
                        </label>
                    ))}
                </div>

                {/* Date and Time picker when "Other" is selected */}
                {formData.contactPreference === 'Other (Specify Date)' && (
                    <div className="sell-form__row" style={{ marginTop: '16px' }}>
                        <div className="sell-form__field">
                            <label>Preferred Date</label>
                            <input
                                type="date"
                                name="preferredDate"
                                value={formData.preferredDate}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <div className="sell-form__field">
                            <label>Preferred Time</label>
                            <input
                                type="time"
                                name="preferredTime"
                                value={formData.preferredTime}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* How did you hear about us */}
            <div className="sell-form__field">
                <label>Where did you hear about Fornieri & Azar? Select all that apply.</label>
                <div className="sell-form__checkbox-grid">
                    {[
                        'Social Media',
                        'Website',
                        'Past Client',
                        'Other',
                        'Letterbox Drop',
                        'Neighbour of recent result',
                        'Friends/Family'
                    ].map(source => (
                        <label key={source} className="sell-form__checkbox">
                            <input
                                type="checkbox"
                                name="heardAbout"
                                value={source}
                                checked={formData.heardAbout.includes(source)}
                                onChange={handleChange}
                            />
                            <span>{source}</span>
                        </label>
                    ))}
                </div>
            </div>

            {error && <p className="sell-form__error">{error}</p>}

            <button
                type="submit"
                className="btn btn--primary sell-form__submit"
                disabled={loading}
            >
                {loading ? 'Submitting...' : 'SUBMIT'}
            </button>
        </form>
    );
}
