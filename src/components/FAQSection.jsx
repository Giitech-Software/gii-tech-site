import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import ReactMarkdown from 'react-markdown';

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchFaqs = async () => {
      const q = query(collection(db, 'faqs'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFaqs(data);
    };
    fetchFaqs();
  }, []);

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 3);

  return (
    <section className="py-16 px-4 md:px-12 bg-white text-text">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-4">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6 max-w-4xl mx-auto">
        {displayedFaqs.map((faq) => (
          <div
            key={faq.id}
            className="border-l-4 border-primary bg-gray-50 p-4 rounded shadow"
          >
            <h3 className="text-xl font-semibold mb-2">
              <span className="mr-2">{faq.icon || '❓'}</span>
              {faq.question}
            </h3>
            <div className="prose prose-sm prose-slate max-w-none">
              <ReactMarkdown>{faq.answer}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      {faqs.length > 3 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-cta font-semibold hover:underline transition duration-300"
          >
            {showAll ? 'Show Less ▲' : 'Show More ▼'}
          </button>
        </div>
      )}
    </section>
  );
};

export default FAQSection;
