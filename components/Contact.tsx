'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { studioInfo } from '@/data/studio';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const { contact } = studioInfo;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    projectType: 'Residential Architecture',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full py-28 md:py-40 bg-[#121211] text-[#FBF9F5] border-t border-[#F4EFE6]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Details & Office Address */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold block mb-3">
                GET IN TOUCH
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-[#FBF9F5] leading-tight mb-4">
                LET&apos;S CONNECT
              </h2>
              <p className="text-xs md:text-sm font-sans tracking-[0.15em] text-[#F4EFE6]/60 uppercase font-light">
                BY CO-CREATING A BESPOKE LIFESTYLE TOGETHER
              </p>
            </div>

            <div className="pt-8 border-t border-[#F4EFE6]/10 space-y-6 text-sm font-sans text-[#F4EFE6]/80 font-light">
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-[#C49A6C] shrink-0 mt-1" />
                <div className="space-y-1">
                  <span className="font-semibold text-[#FBF9F5] block">STUDIO ADDRESS</span>
                  {contact.address.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-[#C49A6C] shrink-0" />
                <div>
                  <span className="font-semibold text-[#FBF9F5] block">DIRECT CONTACT</span>
                  <p>Mobile: {contact.mobile}</p>
                  <p>Landline: {contact.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-[#C49A6C] shrink-0" />
                <div>
                  <span className="font-semibold text-[#FBF9F5] block">EMAIL ENQUIRIES</span>
                  <p>{contact.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Lead Form */}
          <div className="lg:col-span-7 bg-[#1C1C1A]/80 p-8 md:p-12 border border-[#F4EFE6]/10 rounded-sm">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-4"
              >
                <CheckCircle2 className="w-12 h-12 text-[#C49A6C] mx-auto" />
                <h3 className="text-2xl font-serif text-[#FBF9F5]">Thank You For Reaching Out</h3>
                <p className="text-xs font-sans text-[#F4EFE6]/70 max-w-md mx-auto">
                  We have received your enquiry. A member of the Square9 Designs principal team will connect with you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-sans tracking-[0.2em] text-[#F4EFE6]/60 uppercase mb-2">
                      NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Full Name"
                      className="w-full bg-[#121211] border border-[#F4EFE6]/15 rounded-sm px-4 py-3 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#C49A6C] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans tracking-[0.2em] text-[#F4EFE6]/60 uppercase mb-2">
                      10 DIGIT MOBILE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-[#121211] border border-[#F4EFE6]/15 rounded-sm px-4 py-3 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#C49A6C] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-sans tracking-[0.2em] text-[#F4EFE6]/60 uppercase mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full bg-[#121211] border border-[#F4EFE6]/15 rounded-sm px-4 py-3 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#C49A6C] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans tracking-[0.2em] text-[#F4EFE6]/60 uppercase mb-2">
                      CITY *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Your City"
                      className="w-full bg-[#121211] border border-[#F4EFE6]/15 rounded-sm px-4 py-3 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#C49A6C] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] text-[#F4EFE6]/60 uppercase mb-2">
                    PROJECT TYPE *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#121211] border border-[#F4EFE6]/15 rounded-sm px-4 py-3 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#C49A6C] transition-colors"
                  >
                    <option value="Residential Architecture">Residential Architecture</option>
                    <option value="Interior Design">Interior Design</option>
                    <option value="Urban Design">Urban Design</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Institutional">Institutional</option>
                    <option value="Design & Build">Design & Build</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] text-[#F4EFE6]/60 uppercase mb-2">
                    PROJECT BRIEF / MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project vision, timeline, or requirements..."
                    className="w-full bg-[#121211] border border-[#F4EFE6]/15 rounded-sm px-4 py-3 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#C49A6C] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  data-cursor="explore"
                  className="w-full py-4 bg-[#C49A6C] text-[#0E0D0C] font-sans text-xs tracking-[0.25em] font-semibold hover:bg-[#FBF9F5] transition-colors rounded-sm uppercase"
                >
                  SUBMIT ENQUIRY
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
