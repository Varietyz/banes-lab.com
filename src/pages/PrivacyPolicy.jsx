import React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';

const fadeInVariant = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 }
};

/**
 *
 */
export default function PrivacyPolicy() {
  return (
    <div className="h-screen overflow-y-auto no-scrollbar px-4 py-20 md:py-32 scroll-smooth">
      <LazyMotion features={domAnimation}>
        <m.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariant}
          className="max-w-4xl xl:max-w-6xl mx-auto border border-gold rounded-xl shadow-2xl p-8 sm:p-12 md:p-16 bg-dark/90 backdrop-blur-sm text-white">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="mb-4">
            <strong>Effective Date:</strong> 05 April 2025
          </p>
          <p className="mb-4">
            Welcome to Bane’s Lab (the “Site”). We are committed to protecting your personal
            information and your right to privacy. This Privacy Policy describes how we collect,
            use, disclose, and safeguard your information when you visit{' '}
            <a href="https://banes-lab.com/" className="text-blue-500 underline">
              https://banes-lab.com/
            </a>{' '}
            and use our services.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">1. Information We Collect</h2>
          <ul className="list-disc ml-8 mb-4">
            <li>
              <strong>Personal Data via OAuth:</strong> When you log in using Discord, Google, or
              GitHub, we receive your email address, username, a unique user ID, and a hashed
              version of your IP address. This information is used solely for account
              identification, authentication, and to provision your associated chat/Discord channel.
            </li>
            <li>
              <strong>Usage Data:</strong> We automatically collect data such as your IP address,
              browser type, operating system, pages viewed, and the dates/times of your visits. This
              data is used to analyze trends, administer the site, and improve our services.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar
              technologies for session management, to enhance your experience, and to gather usage
              statistics. You can control cookie preferences through your browser settings.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc ml-8 mb-4">
            <li>To authenticate and manage your account via OAuth.</li>
            <li>
              To provision and maintain features such as our interactive chat and associated Discord
              channels.
            </li>
            <li>To analyze usage trends and improve the overall user experience on the Site.</li>
            <li>To comply with legal obligations and enforce our Terms of Service.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-2">3. How We Protect Your Information</h2>
          <p className="mb-4">
            We implement industry-standard security measures—including HTTPS, secure JWT tokens
            stored as httpOnly cookies, and data encryption—to protect your information from
            unauthorized access, alteration, or disclosure.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">4. Sharing Your Information</h2>
          <p className="mb-4">
            We do not sell or trade your personal information. Your data may be shared only as
            necessary to provide our services, comply with legal obligations, or protect our rights.
            Any third-party service providers we use are bound by confidentiality agreements.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">5. Your Rights</h2>
          <p className="mb-4">
            You have the right to access, correct, or delete your personal data. If you have
            questions or concerns about your privacy, please contact us at{' '}
            <a href="mailto:jay@banes-lab.com" className="text-blue-500 underline">
              jay@banes-lab.com
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">6. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. Any changes will be posted on this
            page, and the updated policy will be effective immediately upon posting. We encourage
            you to review this page periodically for the latest information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy or our data practices,
            please contact us at:{' '}
            <a href="mailto:jay@banes-lab.com" className="text-blue-500 underline">
              jay@banes-lab.com
            </a>
          </p>
        </m.div>
      </LazyMotion>
    </div>
  );
}
