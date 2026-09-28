import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { researchAreasData, servicesData } from '../data/siteData';
import { getWhatsAppUrl, siteConfig } from '../config/siteConfig';
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
  BookOpen,
  ShieldCheck,
  Clock,
  Check,
  Sparkles
} from 'lucide-react';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    researchArea: '',
    serviceNeeded: 'Research Paper Publication',
    paperTitle: '',
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

    // Validate
    const validation = validateInquiry(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitInquiry(formData);
      if (response.success) {
        setSubmissionStatus({
          success: true,
          message: response.message,
          referenceId: response.referenceId
        });
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          researchArea: '',
          serviceNeeded: 'Research Paper Publication',
          paperTitle: '',
          message: '',
        });
        setErrors({});
      } else {
        setSubmissionStatus({
          success: false,
          message: response.message || 'We could not submit your inquiry right now. Please try again.'
        });
        if (response.errors) {
          setErrors(response.errors);
        }
      }
    } catch (err) {
      setSubmissionStatus({
        success: false,
        message: 'We could not submit your inquiry right now. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="inquiry"
      className="py-24 relative w-full overflow-hidden"
      aria-label="Inquiry Form"
      style={{ background: 'rgba(248, 249, 255, 0.75)' }}
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
          
          {/* Left Column: Consultation Context & Trust Assurances (40-42% on desktop) */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royalBlue-500/8 border border-royalBlue-500/20 text-royalBlue-500 text-xs font-mono tracking-wider uppercase mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Confidential Consultation</span>
              </div>

              {/* Title */}
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[40px] text-navy-900 tracking-tight leading-tight mb-5">
                Start Your <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-royalBlue-500 to-violet-500 bg-clip-text text-transparent">
                  Publication Journey
                </span>
              </h2>

              {/* Description */}
              <p className="text-navy-600 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                Submit your manuscript details for an appraisal. Our academic advisory evaluates your research for structural clarity, methodological rigor, and target journal scope alignment.
              </p>

              {/* Key Assurances */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/80 border border-navy-200/70 shadow-card-light backdrop-blur-sm">
                  <ShieldCheck className="w-5 h-5 text-royalBlue-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-navy-800">Strict Non-Disclosure &amp; Ethics</h4>
                    <p className="text-xs text-navy-500 mt-1">
                      Your original manuscripts, ideas, and data remain strictly confidential under rigorous academic NDA standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/80 border border-navy-200/70 shadow-card-light backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-navy-800">Independent Expert Review</h4>
                    <p className="text-xs text-navy-500 mt-1">
                      Constructive evaluation by {siteConfig.consultant.name} ({siteConfig.consultant.qualification}) to enhance peer-review acceptance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/80 border border-navy-200/70 shadow-card-light backdrop-blur-sm">
                  <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-navy-800">Response within 24–48 Hours</h4>
                    <p className="text-xs text-navy-500 mt-1">
                      You will receive a structured response with recommended next steps and journal recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout Card */}
            <div className="p-5 rounded-xl bg-emerald-500/8 border border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <div className="text-xs font-semibold text-emerald-800">Need Immediate Advice?</div>
                <div className="text-[11px] text-navy-500 mt-0.5">Chat directly with the academic consultant</div>
              </div>
              <a
                href={getWhatsAppUrl("Hello, I would like to consult directly regarding my research paper.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form Card (58-60% on desktop) */}
          <div className="lg:col-span-7 xl:col-span-7 w-full">
            <div className="rounded-2xl bg-white/90 border border-navy-200/80 p-6 sm:p-8 xl:p-10 shadow-card-light backdrop-blur-md">
          
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
                    Inquiry Submitted Successfully
                  </h3>
                  <p className="text-sm text-emerald-700 leading-relaxed mb-3">
                    {submissionStatus.message}
                  </p>
                  {submissionStatus.referenceId && (
                    <div className="inline-block px-3 py-1 rounded bg-emerald-100 border border-emerald-300 text-xs font-mono text-emerald-800">
                      Tracking Reference: <strong>{submissionStatus.referenceId}</strong>
                    </div>
                  )}
                  <div className="mt-4 pt-4 border-t border-emerald-200 flex items-center justify-between">
                    <span className="text-xs text-emerald-700">Need faster response?</span>
                    <a
                      href={getWhatsAppUrl(`Hello, I have submitted inquiry ${submissionStatus.referenceId || ''}. I would like to discuss it.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Notify on WhatsApp
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
            
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-xs font-medium text-navy-700 mb-2">
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
                    placeholder="e.g. Dr. Jane Smith"
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
                <label htmlFor="email" className="block text-xs font-medium text-navy-700 mb-2">
                  Academic / Professional Email <span className="text-royalBlue-500">*</span>
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
                    placeholder="e.g. scholar@university.edu"
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

            {/* Row 2: Phone Number & Research Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-navy-700 mb-2">
                  Contact Number (WhatsApp enabled) <span className="text-royalBlue-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    aria-invalid={!!errors.phone}
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-pearl-100/90 border text-sm text-navy-900 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-royalBlue-500/30 transition-all ${
                      errors.phone ? 'border-red-500/60 bg-red-50/50' : 'border-navy-200 focus:border-royalBlue-500/50'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="researchArea" className="block text-xs font-medium text-navy-700 mb-2">
                  Primary Research Area <span className="text-royalBlue-500">*</span>
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
                  <option value="">Select your discipline...</option>
                  {researchAreasData.map((area) => (
                    <option key={area.id} value={area.name}>
                      {area.name}
                    </option>
                  ))}
                  <option value="Other">Other / Interdisciplinary Discipline</option>
                </select>
                {errors.researchArea && (
                  <p className="text-xs text-red-500 mt-1.5">{errors.researchArea}</p>
                )}
              </div>
            </div>

            {/* Row 3: Service Selection */}
            <div>
              <label htmlFor="serviceNeeded" className="block text-xs font-medium text-navy-700 mb-2">
                Service Required
              </label>
              <select
                id="serviceNeeded"
                name="serviceNeeded"
                value={formData.serviceNeeded}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-pearl-100/90 border border-navy-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-royalBlue-500/30 focus:border-royalBlue-500/50 transition-all"
              >
                {servicesData.map((svc) => (
                  <option key={svc.id} value={svc.title}>
                    {svc.title}
                  </option>
                ))}
                <option value="Complete Advisory">Comprehensive End-to-End Publication Guidance</option>
              </select>
            </div>

            {/* Row 4: Paper Title */}
            <div>
              <label htmlFor="paperTitle" className="block text-xs font-medium text-navy-700 mb-2">
                Tentative Paper Title or Topic <span className="text-royalBlue-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy-400">
                  <FileText className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="paperTitle"
                  name="paperTitle"
                  value={formData.paperTitle}
                  onChange={handleChange}
                  placeholder="e.g. Deep Reinforcement Learning for Wireless Sensor Optimizations"
                  aria-invalid={!!errors.paperTitle}
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-pearl-100/90 border text-sm text-navy-900 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-royalBlue-500/30 transition-all ${
                    errors.paperTitle ? 'border-red-500/60 bg-red-50/50' : 'border-navy-200 focus:border-royalBlue-500/50'
                  }`}
                />
              </div>
              {errors.paperTitle && (
                <p className="text-xs text-red-500 mt-1.5">{errors.paperTitle}</p>
              )}
            </div>

            {/* Row 5: Message / Requirements */}
            <div>
              <label htmlFor="message" className="block text-xs font-medium text-navy-700 mb-2">
                Requirements, Target Journal, or Abstract Details <span className="text-royalBlue-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Briefly describe your current manuscript status, target submission deadline, indexing goals (Scopus, SCI, etc.), or specific support needed..."
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

            {/* Actions: Submit + WhatsApp Direct Option */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-royalBlue-500 to-violet-500 hover:from-royalBlue-400 hover:to-violet-400 shadow-glow-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Submission...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>

              {/* Instant WhatsApp Alternate */}
              <a
                href={getWhatsAppUrl("Hello, I would like to quickly discuss my research paper inquiry directly.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 px-4 py-2 rounded-lg border border-emerald-500/25 hover:border-emerald-500/40 bg-emerald-500/8 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Prefer instant chat? Connect on WhatsApp</span>
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
