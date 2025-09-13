import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - MegaVault',
  description: 'Terms of Service and legal information for MegaVault cloud storage service',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="mb-4">
              These Terms of Service ("Terms") govern your access to and use of MegaVault's services, including our website, cloud storage, and any other software or services offered by MegaVault ("Services"). 
              By using our Services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Account Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be 18 years or older to use this Service.</li>
              <li>You must provide accurate, complete, and current information for your account.</li>
              <li>You are responsible for maintaining the security of your account and password.</li>
              <li>You are responsible for all activities that occur under your account.</li>
              <li>You must notify us immediately of any unauthorized use of your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Service Rules and Limitations</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your use of the Service must comply with all applicable laws and regulations.</li>
              <li>You may not use the Service for any illegal or unauthorized purpose.</li>
              <li>You may not upload malicious code or files that could damage the Service.</li>
              <li>Storage limits are based on your selected plan and must be adhered to.</li>
              <li>We reserve the right to terminate accounts that violate these terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service fees are billed in advance on a monthly or annual basis.</li>
              <li>Refunds are handled according to our refund policy.</li>
              <li>Failure to pay may result in service suspension or termination.</li>
              <li>Price changes will be notified at least 30 days in advance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security and Privacy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We implement industry-standard security measures to protect your data.</li>
              <li>We do not access your stored files without permission.</li>
              <li>Data handling practices are detailed in our Privacy Policy.</li>
              <li>You retain all rights to your data stored on our servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Service Availability and Support</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We strive for 99.9% service uptime but do not guarantee it.</li>
              <li>Scheduled maintenance will be announced in advance.</li>
              <li>Technical support is provided according to your service plan.</li>
              <li>We are not liable for any damages due to service interruptions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Termination</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You may terminate your account at any time.</li>
              <li>We may terminate or suspend access immediately without notice for conduct violations.</li>
              <li>Upon termination, you have 30 days to export your data.</li>
              <li>After 30 days, we may delete all your data permanently.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">
              MegaVault shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities. Our liability is limited to the amount paid by you in the past 12 months.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service. Continued use of the Service after changes constitutes acceptance of new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Information</h2>
            <p className="mb-4">
              For any questions about these Terms, please contact us at legal@megavault.com
            </p>
          </section>

          <section className="pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 