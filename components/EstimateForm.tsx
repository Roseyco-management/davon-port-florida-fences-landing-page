'use client';

import { useState } from 'react';
import { Home, UserPlus, ArrowRight, ArrowLeft, CheckCircle, Loader2, Check } from 'lucide-react';

type FormData = {
  propertyRole: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
};

const initialFormData: FormData = {
  propertyRole: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: 'Davenport',
  state: 'Florida',
  zip: '',
  preferredDate: '',
  preferredTime: '',
  notes: '',
};

export default function EstimateForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length >= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length >= 3) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    return digits;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'phone') {
      formattedValue = formatPhone(value);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRoleSelect = (role: string) => {
    setFormData(prev => ({ ...prev, propertyRole: role }));
    if (errors.propertyRole) {
      setErrors(prev => ({ ...prev, propertyRole: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    switch (step) {
      case 1:
        if (!formData.propertyRole) {
          newErrors.propertyRole = 'Please select an option';
        }
        break;
      case 2:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone is required';
        } else if (formData.phone.replace(/\D/g, '').length < 10) {
          newErrors.phone = 'Please enter a valid phone number';
        }
        break;
      case 3:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
        break;
      case 4:
        if (!formData.preferredDate) newErrors.preferredDate = 'Please select a date';
        if (!formData.preferredTime) newErrors.preferredTime = 'Please select a time';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <section id="estimate-form" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-10 text-center">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">You&apos;re All Set!</h2>
              <p className="text-emerald-100">
                Your quote is being prepared. Expect a call within 24 hours (usually faster).
              </p>
            </div>
            <div className="p-10">
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="font-semibold text-gray-900 mb-4">Here&apos;s What Happens Next:</p>
                <ul className="space-y-3">
                  {[
                    'We\'ll call to confirm your appointment time',
                    'Our expert visits your property (15-20 min)',
                    'You\'ll get an exact price on the spot — no surprises',
                    'If you love it, we can often start within the week',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData(initialFormData);
                }}
                className="mt-6 w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="estimate-form" className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Claim Your Free Quote</h2>
            <p className="text-emerald-100 mb-8">Takes 60 seconds. No credit card. No commitment. Just honest pricing.</p>

            {/* Progress Bar */}
            <div className="h-1 bg-white/20 rounded-full overflow-hidden mb-5">
              <div
                className="h-full bg-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4].map(step => (
                <div
                  key={step}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    step === currentStep
                      ? 'bg-white text-emerald-600'
                      : step < currentStep
                      ? 'bg-emerald-400 text-white'
                      : 'bg-white/20 text-white/70'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-10">
            {/* Step 1: Property Role */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Question First</h3>
                <p className="text-gray-600 mb-8">This helps us give you the most accurate quote</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('homeowner')}
                    className={`p-6 border-2 rounded-xl text-center transition-all duration-300 ${
                      formData.propertyRole === 'homeowner'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all ${
                      formData.propertyRole === 'homeowner' ? 'bg-emerald-500' : 'bg-gray-100'
                    }`}>
                      <Home className={`w-7 h-7 ${formData.propertyRole === 'homeowner' ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <span className="block font-semibold text-gray-900">Homeowner</span>
                    <span className="block text-sm text-gray-500 mt-1">I own this property</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect('authorized')}
                    className={`p-6 border-2 rounded-xl text-center transition-all duration-300 ${
                      formData.propertyRole === 'authorized'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all ${
                      formData.propertyRole === 'authorized' ? 'bg-emerald-500' : 'bg-gray-100'
                    }`}>
                      <UserPlus className={`w-7 h-7 ${formData.propertyRole === 'authorized' ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <span className="block font-semibold text-gray-900">Authorized Decision Maker</span>
                    <span className="block text-sm text-gray-500 mt-1">I can make decisions for this property</span>
                  </button>
                </div>
                {errors.propertyRole && (
                  <p className="text-red-500 text-sm mt-4 text-center">{errors.propertyRole}</p>
                )}
              </div>
            )}

            {/* Step 2: Contact Info */}
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Where Should We Send Your Quote?</h3>
                <p className="text-gray-600 mb-8">We&apos;ll never spam you or share your info. Ever.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors ${
                        errors.firstName ? 'border-red-500' : 'border-gray-200 focus:border-emerald-500'
                      }`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Smith"
                      className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors ${
                        errors.lastName ? 'border-red-500' : 'border-gray-200 focus:border-emerald-500'
                      }`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-200 focus:border-emerald-500'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-emerald-500'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Address */}
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Almost There!</h3>
                <p className="text-gray-600 mb-8">Tell us where we&apos;ll be building your new fence</p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors ${
                        errors.address ? 'border-red-500' : 'border-gray-200 focus:border-emerald-500'
                      }`}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 focus:outline-none focus:ring-0 transition-colors ${
                          errors.city ? 'border-red-500' : 'border-gray-200 focus:border-emerald-500'
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 focus:outline-none focus:ring-0 transition-colors ${
                          errors.state ? 'border-red-500' : 'border-gray-200 focus:border-emerald-500'
                        }`}
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        placeholder="33837"
                        className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors ${
                          errors.zip ? 'border-red-500' : 'border-gray-200 focus:border-emerald-500'
                        }`}
                      />
                      {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Appointment */}
            {currentStep === 4 && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pick Your Perfect Time</h3>
                <p className="text-gray-600 mb-8">We&apos;ll come to you — free consultation, zero pressure</p>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={today}
                        max={maxDateStr}
                        className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 focus:outline-none focus:ring-0 transition-colors ${
                          errors.preferredDate ? 'border-red-500' : 'border-gray-200 focus:border-emerald-500'
                        }`}
                      />
                      {errors.preferredDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 focus:outline-none focus:ring-0 transition-colors appearance-none bg-white ${
                          errors.preferredTime ? 'border-red-500' : 'border-gray-200 focus:border-emerald-500'
                        }`}
                      >
                        <option value="">Select a time</option>
                        <option value="morning">Morning (8AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 4PM)</option>
                        <option value="evening">Evening (4PM - 7PM)</option>
                      </select>
                      {errors.preferredTime && <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Tell us about your project, fence type preferences, or any questions you have..."
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4 mt-10 pt-6 border-t border-gray-200">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors ml-auto"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Get My Free Estimate
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
