import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import ReactMarkdown from 'react-markdown';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';
import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'posts'));
      setPosts(snapshot.docs.map(doc => doc.data()));
    };
    fetchData();
  }, []);

  const truncateText = (text, limit) => {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  return (
    <>
      <Seo {...SeoConfig.blog} />
      <div className="min-h-screen bg-white text-slate-900 px-6 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-12 text-left">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Enterprise Insights</h1>
            <div className="w-20 h-1.5 bg-warm mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 flex flex-col hover:border-warm transition-all duration-300 group cursor-pointer"
                onClick={() => setActivePost(post)}
              >
                {post.image && (
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <div className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                    <ReactMarkdown>{truncateText(post.content, 120)}</ReactMarkdown>
                  </div>
                  <button className="text-sm font-black uppercase tracking-widest text-warm flex items-center gap-2">
                    Read Article <span className="text-xs">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FULL-WIDTH BLOG MODAL OVERLAY */}
      {activePost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/90 backdrop-blur-sm">
          <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-200">
            
            {/* Close Icon */}
            <button 
              onClick={() => setActivePost(null)}
              className="absolute top-5 right-5 p-3 bg-white/10 hover:bg-warm md:bg-slate-100 md:text-slate-600 text-white rounded-full transition-all z-50 shadow-lg"
            >
              <FaTimes size={18} />
            </button>

            <div className="flex flex-col md:flex-row h-full overflow-hidden">
              
              {/* Modal Left: Matches Services width (md:w-1/3) */}
              <div className="md:w-1/3 bg-slate-900 relative shrink-0 flex flex-col justify-center">
                {activePost.image ? (
                  <>
                    <img src={activePost.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                  </>
                ) : (
                  <div className="absolute inset-0 bg-slate-800"></div>
                )}
                
                <div className="relative p-10 text-center md:text-left">
                  <div className="text-warm text-4xl mb-6 flex justify-center md:justify-start">
                    <FaCalendarAlt />
                  </div>
                  <h2 className="text-3xl font-black text-white leading-tight">
                    {activePost.title}
                  </h2>
                </div>
              </div>

              {/* Modal Right: Expanded Reading Area (md:w-2/3) */}
              <div className="md:w-2/3 p-8 md:p-16 overflow-y-auto bg-white flex flex-col">
                <span className="text-warm-terracotta font-bold uppercase tracking-[0.2em] text-xs mb-6 block">
                  Full Article
                </span>
                
                <div className="prose prose-slate max-w-none text-slate-700 text-lg leading-relaxed flex-1">
                  <ReactMarkdown>{activePost.content}</ReactMarkdown>
                </div>

                {/* Footer with Padding for the Close Button */}
                <div className="border-t border-slate-100 pt-8 pb-10 mt-10">
                  <button 
                    onClick={() => setActivePost(null)}
                    className="px-10 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-primary transition-all shadow-md"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;