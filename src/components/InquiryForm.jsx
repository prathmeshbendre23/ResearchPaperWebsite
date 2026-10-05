import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import { submitInquiry, validateInquiry } from '../services/inquiryService';
import SectionContainer from './SectionContainer';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  MessageCircle,
  FileText,
  Mail,
  Phone,
  User,
  Building,
  Target,
  ShieldCheck,
  Clock,
  Sparkles,
  MapPin
} from 'lucide-react';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+91',
    phoneNumber: '',
    institution: '',
    enquiryType: '',
    researchArea: '',
    targetRequirement: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // { success: boolean, message: string, referenceId?: string }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmissionStatus(null);

    // Assemble combined phone for submission if provided
    const combinedPhone = formData.phoneNumber?.trim()
      ? `${formData.countryCode} ${formData.phoneNumber.trim()}`
      : '';

    // Backend mapped payload
    const submissionPayload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: combinedPhone,
      institution: formData.institution,
      serviceNeeded: formData.enquiryType,
      researchArea: formData.researchArea,
      paperTitle: formData.targetRequirement,
      message: formData.message,
    };

    // Client-side validation
    const validation = validateInquiry(submissionPayload);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitInquiry(submissionPayload);
      if (response.success) {
        setSubmissionStatus({
          success: true,
          message: response.message,
          referenceId: response.referenceId,
        });
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          countryCode: '+91',
          phoneNumber: '',
          institution: '',
          enquiryType: '',
          researchArea: '',
          targetRequirement: '',
          message: '',
        });
        setErrors({});
      } else {
        setSubmissionStatus({
          success: false,
          message: response.message || 'We could not submit your inquiry right now. Please try again.',
        });
        if (response.errors) {
          setErrors(response.errors);
        }
      }
    } catch {
      setSubmissionStatus({
        success: false,
        message: 'We could not submit your inquiry right now. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="inquiry"
      className="py-24 relative w-full overflow-hidden"
      aria-label="Discuss Your Research"
      style={{ background: 'rgba(248, 249, 255, 0.85)' }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-10 pointer-events-none"
        style={{
          width: '700px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(41,72,216,0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute bottom-10 right-10 pointer-events-none"
        style={{
          width: '600px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(139,109,255,0.07) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
      <div className="absolute inset-0 scientific-grid-light-bg opacity-50 pointer-events-none" />

      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* Left Column: Consultation Context & Trust Assurances */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royalBlue-500/8 border border-royalBlue-500/20 text-royalBlue-500 text-xs font-mono tracking-wider uppercase mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Confidential Research Consultation</span>
              </div>

              {/* Title */}
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[40px] text-navy-900 tracking-tight leading-tight mb-5">
                Discuss Your{' '}
                <span className="bg-gradient-to-r from-royalBlue-500 to-violet-500 bg-clip-text text-transparent">
                  Research
                </span>
              </h2>

              {/* Supporting Text */}
              <p className="text-navy-600 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                Tell us about your research requirement, academic project, publication goal or institutional requirement. Share the details below so we can understand your needs before the first discussion.
              </p>

              {/* Key Contact & Advisory Details */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/85 border border-navy-200/70 shadow-card-light backdrop-blur-sm">
                  <ShieldCheck className="w-5 h-5 text-royalBlue-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-navy-800">Academic Integrity &amp; NDA</h4>
                    <p className="text-xs text-navy-500 mt-1">
                      Your research drafts, datasets, patent concepts and intellectual property remain strictly confidential under standard academic confidentiality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/85 border border-navy-200/70 shadow-card-light backdrop-blur-sm">
                  <Clock className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-navy-800">Prompt Response &amp; Assessment</h4>
                    <p className="text-xs text-navy-500 mt-1">
                      Receive structured feedback on your topic, recommended journal/conference venues, and next steps for publication or project support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/85 border border-navy-200/70 shadow-card-light backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-navy-800">Location</h4>
                    <p className="text-xs text-navy-600 font-medium mt-1">
                      {siteConfig.contact.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout Card */}
            <div className="p-5 rounded-xl bg-emerald-500/8 border border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <div className="text-xs font-semibold text-emerald-800">Direct WhatsApp / Phone Support</div>
                <div className="text-xs text-navy-600 font-mono mt-0.5">{siteConfig.contact.phone}</div>
              </div>
              <a
                href={getWhatsAppUrl("Hello Brain & Pen, I would like to consult directly regarding my research requirement.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form Card */}
          <div className="lg:col-span-7 xl:col-span-7 w-full">
            <div className="rounded-2xl bg-white/95 border border-navy-200/80 p-6 sm:p-8 xl:p-10 shadow-card-light backdrop-blur-md">
          
              {/* Success State Banner */}
              {submissionStatus?.success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 mb-8"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-lg text-emerald-900 mb-1">
                        Enquiry Submitted Successfully
                      </h3>
                      <p className="text-sm text-emerald-700 leading-relaxed mb-3">
                        {submissionStatus.message}
                      </p>
                      {submissionStatus.referenceId && (
                        <div className="inline-block px-3 py-1 rounded bg-emerald-100 border border-emerald-300 text-xs font-mono text-emerald-800">
                          Reference ID: <strong>{submissionStatus.referenceId}</strong>
                        </div>
                      )}
                      <div className="mt-4 pt-4 border-t border-emerald-200 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs text-emerald-700">Need instant confirmation?</span>
                        <a
                          href={getWhatsAppUrl(`Hello Brain & Pen, I have submitted an inquiry with Reference ID ${submissionStatus.referenceId || ''}. I would like to discuss my research details.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Notify via WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error Banner */}
              {submissionStatus && !submissionStatus.success && (
                <div
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-6 flex items-start gap-3"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">{submissionStatus.message}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                {/* Field 1 & 2: Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-navy-700 mb-2">
                      Full Name <span className="text-royalBlue-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        aria-invalid={!!errors.fullName}
                        disabled={isSubmitting}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-pearl-100/90 border text-sm text-navy-900 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-royalBlue-500/30 transition-all ${
                          errors.fullName ? 'border-red-500/60 bg-red-50/50' : 'border-navy-200 focus:border-royalBlue-500/50'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1.5">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-navy-700 mb-2">
                      Email Address <span className="text-royalBlue-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@institution.edu or personal email"
                        aria-invalid={!!errors.email}
                        disabled={isSubmitting}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-pearl-100/90 border text-sm text-navy-900 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-royalBlue-500/30 transition-all ${
                          errors.email ? 'border-red-500/60 bg-red-50/50' : 'border-navy-200 focus:border-royalBlue-500/50'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Field 3 & 4: Phone / WhatsApp (Country Code + Number) & Institution / Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phoneNumber" className="block text-xs font-semibold text-navy-700 mb-2">
                      Phone / WhatsApp <span className="text-navy-400 font-normal">(Optional)</span>
                    </label>
                    <div className="flex gap-2">
                      {/* Country Code Selector */}
                      <select
                        id="countryCode"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        aria-label="Country Code"
                        className="w-[110px] sm:w-[118px] shrink-0 px-2.5 py-3 rounded-xl bg-pearl-100/90 border border-navy-200 text-xs font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-royalBlue-500/30 focus:border-royalBlue-500/50 transition-all cursor-pointer"
                      >
                        {siteConfig.countryCodes.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.label}
                          </option>
                        ))}
                      </select>

                      {/* Phone Input */}
                      <div className="relative flex-1 min-w-0">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-navy-400">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="Phone number"
                          aria-invalid={!!errors.phone}
                          disabled={isSubmitting}
                          className={`w-full pl-9 pr-3 py-3 rounded-xl bg-pearl-100/90 border text-sm text-navy-900 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-royalBlue-500/30 transition-all ${
                            errors.phone ? 'border-red-500/60 bg-red-50/50' : 'border-navy-200 focus:border-royalBlue-500/50'
                          }`}
                        />
                      </div>
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="institution" className="block text-xs font-semibold text-navy-700 mb-2">
                      Institution / Organization <span className="text-navy-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy-400">
                        <Building className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        placeholder="College, university or company"
                        disabled={isSubmitting}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-pearl-100/90 border border-navy-200 text-sm text-navy-900 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-royalBlue-500/30 focus:border-royalBlue-500/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Field 5 & 6: Type of Enquiry * & Research Area * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="enquiryType" className="block text-xs font-semibold text-navy-700 mb-2">
                      Type of Enquiry <span className="text-royalBlue-500">*</span>
                    </label>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      aria-invalid={!!errors.serviceNeeded}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl bg-pearl-100/90 border text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-royalBlue-500/30 transition-all ${
                        errors.serviceNeeded ? 'border-red-500/60 bg-red-50/50' : 'border-navy-200 focus:border-royalBlue-500/50'
                      }`}
                    >
                      <option value="">Select enquiry type</option>
                      {siteConfig.enquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.serviceNeeded && (
                      <p className="text-xs text-red-500 mt-1.5">{errors.serviceNeeded}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="researchArea" className="block text-xs font-semibold text-navy-700 mb-2">
                      Research Area <span className="text-royalBlue-500">*</span>
                    </label>
                    <select
                      id="researchArea"
                      name="researchArea"
                      value={formData.researchArea}
                      onChange={handleChange}
                      aria-invalid={!!errors.researchArea}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl bg-pearl-100/90 border text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-royalBlue-500/30 transition-all ${
                        errors.researchArea ? 'border-red-500/60 bg-red-50/50' : 'border-navy-200 focus:border-royalBlue-500/50'
                      }`}
                    >
                      <option value="">Select research area</option>
                      {siteConfig.researchAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                    {errors.researchArea && (
                      <p className="text-xs text-red-500 mt-1.5">{errors.researchArea}</p>
                    )}
                  </div>
                </div>

                {/* Field 7: Target Journal / Conference / Requirement (Optional) */}
                <div>
                  <label htmlFor="targetRequirement" className="block text-xs font-semibold text-navy-700 mb-2">
                    Target Journal / Conference / Requirement <span className="text-navy-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy-400">
                      <Target className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="targetRequirement"
                      name="targetRequirement"
                      value={formData.targetRequirement}
                      onChange={handleChange}
                      placeholder="e.g. Scopus Q2 journal, IEEE conference, PhD synopsis, patent filing..."
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-pearl-100/90 border border-navy-200 text-sm text-navy-900 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-royalBlue-500/30 focus:border-royalBlue-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Field 8: Describe Your Requirement * */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-navy-700 mb-2">
                    Describe Your Requirement <span className="text-royalBlue-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly explain: current research stage, paper/project/thesis requirement, target journal/conference, required support, and relevant deadlines if applicable..."
                    aria-invalid={!!errors.message}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl bg-pearl-100/90 border text-sm text-navy-900 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-royalBlue-500/30 transition-all resize-y ${
                      errors.message ? 'border-red-500/60 bg-red-50/50' : 'border-navy-200 focus:border-royalBlue-500/50'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>
                  )}
                </div>

                {/* Actions: Send Enquiry Button + Alternate Contact */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-royalBlue-500 to-violet-500 hover:from-royalBlue-400 hover:to-violet-400 shadow-glow-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Enquiry</span>
                      </>
                    )}
                  </button>

                  {/* WhatsApp Direct Option */}
                  <a
                    href={getWhatsAppUrl("Hello Brain & Pen, I would like to discuss my research requirement directly.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 px-4 py-2.5 rounded-lg border border-emerald-500/25 hover:border-emerald-500/40 bg-emerald-500/8 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Prefer instant discussion? Connect on WhatsApp</span>
                  </a>
                </div>

              </form>

            </div>
          </div>

        </div>
      </SectionContainer>
    </section>
  );
}
