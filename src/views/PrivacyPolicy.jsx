
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-text mb-3">{title}</h2>
    <div className="text-gray-300 leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

const PrivacyPolicy = () => {
  return (
    <>
  

<Navbar/>

    <div className="min-h-screen bg-third text-white px-6 md:px-16 py-10">
      
      {/* Header */}
      <div className="mb-10 border-b border-gray-700 pb-5">
        <h1 className="text-4xl md:text-5xl font-bold text-text">
          Privacy Policy
        </h1>
        <p className="text-gray-400 mt-2">
          Last Updated: April 28, 2026
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl">

        <p className="text-gray-300 mb-8 leading-relaxed">
          At <span className="text-text font-medium">Legacy Marble</span>, 
          we value your privacy and are committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, and safeguard your data.
        </p>

        <Section title="1. Information We Collect">
          <ul className="list-disc pl-5 space-y-1">
            <li>Name, phone number, and email address</li>
            <li>Inquiry or contact details submitted by you</li>
            <li>Basic usage data (like pages visited)</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc pl-5 space-y-1">
            <li>To respond to your inquiries</li>
            <li>To provide product and service information</li>
            <li>To improve our website experience</li>
          </ul>
        </Section>

        <Section title="3. Data Sharing">
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not sell or rent your personal data</li>
            <li>Information may be shared with trusted service providers if necessary</li>
          </ul>
        </Section>

        <Section title="4. Cookies">
          <p>
            Our website may use cookies to enhance user experience and analyze traffic.
          </p>
        </Section>

        <Section title="5. Data Security">
          <p>
            We implement appropriate security measures to protect your data from unauthorized access.
          </p>
        </Section>

        <Section title="6. Your Rights">
          <ul className="list-disc pl-5 space-y-1">
            <li>You can request access to your data</li>
            <li>You can request correction or deletion</li>
          </ul>
        </Section>

        <Section title="7. Third-Party Links">
          <p>
            Our website may contain links to external sites. We are not responsible for their privacy practices.
          </p>
        </Section>

        <Section title="8. Updates to Policy">
          <p>
            We may update this Privacy Policy from time to time. Please review it periodically.
          </p>
        </Section>

        <Section title="9. Contact Us">
          <p>Email: support@legacymarble.com</p>
          <p>Phone: +91-8949241616</p>
        </Section>

      </div>
    </div>

    <Footer/>

    </>
  );
};

export default PrivacyPolicy;