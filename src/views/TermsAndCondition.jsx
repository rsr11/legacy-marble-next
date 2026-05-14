'use client';

import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-text mb-3">{title}</h2>
    <div className="text-gray-300 leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

const TermsAndConditions = () => {
  return (
    <>
     <Navbar />
    <div className="min-h-screen bg-third text-white px-6 md:px-16 py-10">
      
      {/* Header */}
      <div className="mb-10 border-b border-gray-700 pb-5">
        <h1 className="text-4xl md:text-5xl font-bold text-text">
          Terms & Conditions
        </h1>
        <p className="text-gray-400 mt-2">
          Last Updated: April 28, 2026
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl">

        <p className="text-gray-300 mb-8 leading-relaxed">
          Welcome to <span className="text-text font-medium">Legacy Marble</span>. 
          These Terms and Conditions outline the rules and regulations for the use of our website and services.
        </p>

        <Section title="1. Definitions">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Company:</strong> Legacy Marble</li>
            <li><strong>User:</strong> Anyone accessing this website</li>
            <li><strong>Products:</strong> Marble, stone materials, and related services</li>
          </ul>
        </Section>

        <Section title="2. Use of Website">
          <ul className="list-disc pl-5 space-y-1">
            <li>You must be at least 18 years old</li>
            <li>No illegal or unauthorized use</li>
            <li>Do not copy or distribute content without permission</li>
          </ul>
        </Section>

        <Section title="3. Product Information">
          <ul className="list-disc pl-5 space-y-1">
            <li>Natural variations in marble are expected</li>
            <li>Images are for reference only</li>
            <li>Stock availability may change</li>
          </ul>
        </Section>

        <Section title="4. Pricing and Payments">
          <ul className="list-disc pl-5 space-y-1">
            <li>Prices may change without notice</li>
            <li>Products can be modified or discontinued</li>
            <li>Full payment required before delivery</li>
          </ul>
        </Section>

        <Section title="5. Orders and Cancellation">
          <ul className="list-disc pl-5 space-y-1">
            <li>Orders cannot be canceled once confirmed</li>
            <li>Custom orders are non-refundable</li>
            <li>We may cancel orders if needed</li>
          </ul>
        </Section>

        <Section title="6. Shipping and Delivery">
          <ul className="list-disc pl-5 space-y-1">
            <li>Delivery timelines are estimates</li>
            <li>Risk transfers upon delivery</li>
            <li>Inspect products at delivery time</li>
          </ul>
        </Section>

        <Section title="7. Returns and Refunds">
          <ul className="list-disc pl-5 space-y-1">
            <li>Only damaged/incorrect items eligible</li>
            <li>Report within 24–48 hours</li>
            <li>Refund after verification</li>
          </ul>
        </Section>

        <Section title="8. Limitation of Liability">
          <ul className="list-disc pl-5 space-y-1">
            <li>No liability for indirect damages</li>
            <li>No responsibility for external delays</li>
            <li>No liability for improper usage</li>
          </ul>
        </Section>

        <Section title="9. Intellectual Property">
          <p>
            All content including text, images, and branding belongs to Legacy Marble 
            and is protected by law.
          </p>
        </Section>

        <Section title="10. Changes to Terms">
          <p>
            We may update these terms at any time. Please review periodically.
          </p>
        </Section>

        <Section title="11. Contact Information">
          <p>Email: support@legacymarble.com</p>
          <p>Phone: +91-8949241616</p>
        </Section>

      </div>
    </div>
    <Footer/>
    </>
  );
};

export default TermsAndConditions;