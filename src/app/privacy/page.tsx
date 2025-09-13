import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - MegaVault',
  description: 'Privacy Policy and data handling information for MegaVault cloud storage service',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="mb-4">
              This Privacy Policy explains how MegaVault ("we", "us", "our") collects, uses, and protects your personal information. 
              We are committed to ensuring your privacy and protecting any personal information you share with us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-white/90 mb-2">2.1 Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Name and email address</li>
              <li>Billing information and payment details</li>
              <li>Account credentials</li>
              <li>Usage data and storage metrics</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-white/90 mb-2">2.2 Technical Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP addresses and device information</li>
              <li>Browser type and version</li>
              <li>Operating system information</li>
              <li>Access times and dates</li>
              <li>File metadata (not file contents)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To process your payments and transactions</li>
              <li>To send service updates and notifications</li>
              <li>To improve our service and user experience</li>
              <li>To respond to your requests and support needs</li>
              <li>To detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Storage and Security</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All data is encrypted at rest and in transit</li>
              <li>We use industry-standard security protocols</li>
              <li>Regular security audits and updates</li>
              <li>Limited employee access to user data</li>
              <li>Automated backup systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Sharing and Third Parties</h2>
            <p className="mb-4">We do not sell or rent your personal information to third parties. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment processors for billing purposes</li>
              <li>Cloud infrastructure providers</li>
              <li>Analytics services (anonymized data only)</li>
              <li>Law enforcement when legally required</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights and Choices</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Cookie Policy</h2>
            <p className="mb-4">
              We use cookies and similar technologies to improve user experience and analyze service usage. 
              You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Children's Privacy</h2>
            <p className="mb-4">
              Our service is not intended for users under 18 years of age. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. International Data Transfers</h2>
            <p className="mb-4">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place for such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to Privacy Policy</h2>
            <p className="mb-4">
              We may update this policy periodically. We will notify you of any material changes via email or through our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Us</h2>
            <p className="mb-4">
              For privacy-related questions or concerns, please contact our Data Protection Officer at privacy@megavault.com
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