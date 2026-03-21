// src/pages/public/Blog.jsx
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'posts'));
      setPosts(snapshot.docs.map(doc => doc.data()));
    };
    fetchData();
  }, []);

  const toggleExpand = (index) => {
    setExpandedPost(expandedPost === index ? null : index);
  };

  return (
    <>
      <Seo {...SeoConfig.blog} />
      <div className="min-h-screen bg-white text-gray-900 p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Blog</h1>

        {posts.map((post, idx) => (
          <div
            key={idx}
            className="bg-white rounded p-6 shadow border border-gray-200 mb-6"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}

            <h2
              className="text-2xl font-semibold text-primary mb-3 cursor-pointer"
              onClick={() => toggleExpand(idx)}
            >
              {post.title}
            </h2>

            <AnimatePresence>
              {expandedPost === idx ? (
                <motion.div
                  key="expanded"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden prose prose-sm text-gray-800 max-w-none"
                >
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="mt-4 text-cta hover:text-primary transition"
                  >
                    ▲ Show Less
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden prose prose-sm text-gray-800 max-w-none"
                >
                  <ReactMarkdown>{post.content?.slice(0, 200) + '...'}</ReactMarkdown>
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="mt-4 text-cta hover:text-primary transition"
                  >
                    ▼ Read More
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blog;
