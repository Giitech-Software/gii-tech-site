import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-gray-800">
    <h1 className="text-3xl font-extrabold text-primary mb-6">Privacy Policy</h1>
    <div className="space-y-6 text-base leading-7">
      <p>
        Your privacy is important to us. At <strong>ASTEM Software Labs</strong>, we are committed
        to protecting your personal information and ensuring transparency in how we handle your data.
        We only collect data that is necessary to deliver, improve, and personalize your experience
        with our products and services.
      </p>
      <p>
        This may include your name, email, device information, or location—only when it is essential
        for features like support, account management, or analytics. We do not sell or rent your data
        to third parties. Your information is used strictly for internal operations, communication,
        product enhancement, and security.
      </p>
      <p>
        We implement industry-standard security measures to safeguard your data and give you control
        over your personal information. You may request, modify, or delete your data at any time by
        contacting us through our official channels.
      </p>
      <p>
        By using our website or services, you consent to the collection and use of information in
        accordance with this privacy policy. We may update this policy periodically, and any
        significant changes will be communicated accordingly.
      </p>
      <p>
        Your trust is important to us. At ASTEM Software Labs, we uphold privacy as a core principle of ethical
        software development and digital engagement.
      </p>
    </div>

    <div className="mt-10">
      <Link
        to="/"
        className="inline-block bg-primary text-white px-5 py-2 rounded hover:bg-cta transition"
      >
        ← Back to Homepage
      </Link>
    </div>
  </div>
);

export default Privacy;
