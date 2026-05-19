'use client';

import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', product: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Replace with your actual API call / EmailJS / form service
    try {
      await new Promise(r => setTimeout(r, 1200)) // mock delay
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', product: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />

      <section className="bg-third text-text flex flex-col lg:flex-row gap-0 min-h-screen">

        {/* ── LEFT — image + contact info ───────────────────────────── */}
        <div className="flex flex-col md:flex-row lg:flex-col gap-8 md:gap-12 p-6 sm:p-10 md:p-14 lg:p-16 lg:w-[42%] lg:border-r border-fourth/10">

          {/* Image */}
          <div className="flex-shrink-0">
            <img
              src="images/team-3.jpeg"
              alt="Contact"
              className="w-full h-[430px] sm:h-[340px] md:w-[280px] md:h-[360px] lg:w-full lg:h-[600px] object-cover rounded-sm"
            />
          </div>

          {/* Info */}
          <div className="text-fourth flex flex-col justify-between flex-1 gap-8">
            <div>
              <h1 className="border-b border-fourth/20 pb-6 text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight font-bold">
                Meticulous Craft. <br />
                <span className="opacity-50">Unrivalled Quality.</span>
              </h1>

              {/* Contact links */}
              <ul className="flex flex-col gap-4 mt-8">
                <li className="flex items-center gap-3 group">
                  <span className="w-9 h-9 rounded-full border border-fourth/15 flex items-center justify-center flex-shrink-0 group-hover:border-fourth/40 transition-colors">
                    <svg className="w-4 h-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                  </span>
                  <a href="tel:+915467876543"
                    className="text-base sm:text-lg hover:opacity-70 transition-opacity">
                    +91 8949241616
                  </a>
                </li>
                <li className="flex items-center gap-3 group">
                  <span className="w-9 h-9 rounded-full border border-fourth/15 flex items-center justify-center flex-shrink-0 group-hover:border-fourth/40 transition-colors">
                    <svg className="w-4 h-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  <a href="mailto:legacy@marble.com"
                    className="text-base sm:text-lg hover:opacity-70 transition-opacity">
                    Legacymarble3@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            {/* <ul className="hidden sm:flex flex-col gap-2 text-xs sm:text-sm mt-auto">
              <li className="flex items-center gap-2 pb-2 border-b border-fourth/10">
                <Logo />
              </li>
              <li className="text-fourth/50">© 2025 Marvell Tile & Stone</li>
              <li className="flex gap-4">
                <Link href="/privacy-policy" className="underline hover:opacity-70 transition-opacity">Privacy</Link>
                <Link href="/terms-condition" className="underline hover:opacity-70 transition-opacity">Terms & Conditions</Link>
              </li>
            </ul> */}
          </div>
        </div>

        {/* ── RIGHT — enquiry form ───────────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 py-12 lg:py-0">

          {/* Form header */}
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.25em] text-fourth/35 mb-3">
              Send an enquiry
            </p>
            <h2 className="text-fourth font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight">
              Tell us what you are<br />
              <span className="opacity-40">looking for</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl">

            {/* Name + Phone row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[0.15em] text-fourth/">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="bg-transparent border-b border-fourth/20 focus:border-fourth/60 outline-no text-fourth placeholder:text-fourth/50 py-3 text-sm transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-[0.15em] text-fourth/">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="bg-transparent border-b border-fourth/20 focus:border-fourth/60 outline-none text-fourth placeholder:text-fourth/50 py-3 text-sm transition-colors duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.15em] text-fourth/">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="bg-transparent border-b border-fourth/20 focus:border-fourth/60 outline-none  text-fourth placeholder:text-fourth/50 py-3 text-sm transition-colors duration-200"
              />
            </div>

            {/* Product interest */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.15em] text-fourth/">
                Interested In
              </label>
              <select
                name="product"
                value={form.product}
                onChange={handleChange}
                className="bg-third border-b border-fourth/20 focus:border-fourth/60 outline-none text-fourth/50 py-3 text-sm  transition-colors duration-200 cursor-pointer appearance-none"
              >
                <option value="">Select a product / craft</option>
                {['Fountain','Home Temple','Flower Pot','Wash Basin','Diya',
                  'Inlay Work','Carving Work','Marble Slate','Mini Items','Custom Order']
                  .map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.15em] text-fourth/">
                Your Enquiry *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe what you need — size, quantity, customisation..."
                className="bg-transparent border-b border-fourth/20 focus:border-fourth/60 outline-none text-fourth placeholder:text-fourth/50 py-3 text-sm resize-none transition-colors duration-200"
              />
            </div>

            {/* Submit */}
            <div className="flex items-center gap-5 mt-2">
              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="group flex items-center gap-3 cursor-pointer bg-fourth text-third px-8 py-4 rounded-sm text-xs tracking-widest uppercase font-medium hover:opacity-90 disabled:opacity-50 transition-all duration-200"
              >
                {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : 'Submit Enquiry'}
                {status !== 'sending' && status !== 'sent' && (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                )}
              </button>

              {status === 'sent' && (
                <p className="text-xs text-fourth/50 tracking-wide">
                  We will get back to you within 24 hours.
                </p>
              )}
              {status === 'error' && (
                <p className="text-xs text-red-400 tracking-wide">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>

          </form>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default ContactUs