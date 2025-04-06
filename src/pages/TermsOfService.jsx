import React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';

const fadeInVariant = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 }
};

/**
 *
 */
export default function TermsOfService() {
  return (
    <div className="h-screen overflow-y-auto no-scrollbar px-4 py-20 md:py-32 scroll-smooth">
      <LazyMotion features={domAnimation}>
        <m.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariant}
          className="max-w-4xl xl:max-w-6xl mx-auto border border-gold rounded-xl shadow-2xl p-8 sm:p-12 md:p-16 bg-dark/90 backdrop-blur-sm text-white">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="mb-4">
            <strong>Effective Date:</strong> 05 April 2025
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using the Bane’s Lab website (the “Site”) at{' '}
            <a href="https://banes-lab.com/" className="text-blue-500 underline">
              https://banes-lab.com/
            </a>
            , you agree to be bound by these Terms of Service (“Terms”). If you do not agree with
            these Terms, please do not use the Site.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">2. Use of the Site</h2>
          <p className="mb-4">
            The Site is provided for informational, demonstration, and personal portfolio purposes.
            You agree to use the Site only in compliance with these Terms and all applicable laws
            and regulations.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">3. User Accounts and Authentication</h2>
          <p className="mb-4">
            All user authentication is performed via supported OAuth providers (Discord, Google, or
            GitHub). By using the Site, you acknowledge that you are responsible for safeguarding
            your authentication credentials. No passwords are stored on our servers, and your
            account is managed solely through OAuth.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">4. Prohibited Conduct</h2>
          <p className="mb-4">You agree not to engage in any conduct that:</p>
          <ul className="list-disc ml-8 mb-4">
            <li>Violates any applicable law or regulation;</li>
            <li>Is fraudulent, abusive, or harmful;</li>
            <li>Interferes with the normal operation of the Site;</li>
            <li>Harasses, defames, or threatens other users;</li>
            <li>Attempts to bypass security measures or compromise the integrity of the Site.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-2">5. Intellectual Property</h2>
          <p className="mb-4">
            All content, trademarks, logos, and other intellectual property displayed on the Site
            are owned by Bane’s Lab or its licensors. You are granted a limited, non-exclusive,
            non-transferable license to access and use the Site for personal, non-commercial
            purposes.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">6. Disclaimers</h2>
          <p className="mb-4">
            The Site is provided “as is” and “as available,” without warranties of any kind, either
            express or implied. Bane’s Lab does not warrant that the Site will be uninterrupted,
            error-free, or completely secure.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">7. Limitation of Liability</h2>
          <p className="mb-4">
            Under no circumstances shall Bane’s Lab be liable for any direct, indirect, incidental,
            consequential, or punitive damages arising out of or in connection with your use of the
            Site.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">8. Indemnification</h2>
          <p className="mb-4">
            You agree to indemnify and hold harmless Bane’s Lab, its affiliates, officers,
            directors, employees, and agents from any claims, liabilities, damages, and expenses
            (including legal fees) arising out of your use of the Site or violation of these Terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">9. Modifications to These Terms</h2>
          <p className="mb-4">
            Bane’s Lab reserves the right to change these Terms at any time. Any modifications will
            be effective immediately upon posting on the Site. Your continued use of the Site after
            any changes are posted constitutes your acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">10. Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed by and construed in accordance with the laws of Belgium.
            Any disputes arising under these Terms shall be resolved in the courts located within
            Belgium.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">11. Contact Information</h2>
          <p className="mb-4">
            If you have any questions regarding these Terms, please contact us at:{' '}
            <a href="mailto:jay@banes-lab.com" className="text-blue-500 underline">
              jay@banes-lab.com
            </a>
          </p>
        </m.div>
      </LazyMotion>
    </div>
  );
}
