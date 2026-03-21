import React from 'react';
import {
  FaCogs, FaShieldAlt, FaUserFriends,
  FaLaptopCode, FaMobileAlt, FaCloud,
} from 'react-icons/fa';

const features = [
  {
    icon: <FaCogs className="text-4xl text-accent mb-3 mx-auto" />,
    title: 'Tailored Software Solutions',
    text: 'We craft custom-built systems that align perfectly with your workflows — no compromises, no generic tools.',
  },
  {
    icon: <FaShieldAlt className="text-4xl text-accent mb-3 mx-auto" />,
    title: 'Security & Performance First',
    text: 'Every line of code is written with protection and speed in mind, ensuring your app stays fast and secure.',
  },
  {
    icon: <FaUserFriends className="text-4xl text-accent mb-3 mx-auto" />,
    title: 'Client-Centered Collaboration',
    text: 'We work side by side with you to understand your goals and translate them into real, working systems.',
  },
  {
    icon: <FaLaptopCode className="text-4xl text-accent mb-3 mx-auto" />,
    title: 'Modern, Maintainable Code',
    text: 'We use clean, scalable code practices that your dev team — or ours — can easily build on later.',
  },
  {
    icon: <FaMobileAlt className="text-4xl text-accent mb-3 mx-auto" />,
    title: 'Optimized for Every Device',
    text: 'From smartphones to desktops, our solutions are responsive, intuitive, and designed for all screen sizes.',
  },
  {
    icon: <FaCloud className="text-4xl text-accent mb-3 mx-auto" />,
    title: 'Cloud-Powered Infrastructure',
    text: 'Leverage the cloud for speed, scalability, and global access — without managing servers yourself.',
  },
];

export default function FeatureGrid() {
  return (
    <section className="bg-gray-100 pt-10 pb-16 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-4">
          Why Choose GiiTech?
        </h3>
        <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto">
          Our technology blends smart engineering with real-world experience to help your organization grow efficiently.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {features.map(({ icon, title, text }, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              {icon}
              <h4 className="text-lg font-semibold text-primary mb-2">{title}</h4>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
