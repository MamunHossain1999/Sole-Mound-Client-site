// ContactUs.jsx
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Fetch FAQs
const fetchFaqs = async () => {
  const response = await axios('/faq.json'); // Update endpoint accordingly
  return response.data;
};

const FaqPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' });

  const { data: faqs=[], isLoading, isError } = useQuery({
    queryKey: ['faq'],
    queryFn: fetchFaqs,
  });
console.log(faqs)
  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/contact', formData); // Update endpoint accordingly
      toast.success('Message sent successfully!');
      setFormData({ email: '', subject: '', message: '' }); // Reset form
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <div className="bg-[#FDF1F7] py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#101750]">FAQ</h1>
          <div className="flex items-center text-sm mt-1">
            <a href="/" className="text-[#000000] text-base font-semibold">Home</a>
            <span className="mx-2 text-gray-400">{'>'}</span>
            <a href="#" className="text-[#000000] text-base font-semibold">Pages</a>
            <span className="mx-2 text-gray-400">{'>'}</span>
            <span className="text-[#FB2E86] text-base font-semibold">FAQ</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* FAQ Section */}
          <div className="w-full md:w-3/5">
            <h2 className="text-2xl font-bold text-[#1F1F1F] mb-6">Frequently Asked Questions</h2>

            {isLoading ? (
              <p>Loading FAQs...</p>
            ) : isError ? (
              <p>Failed to load FAQs.</p>
            ) : (
              <div className="space-y-3">
                {faqs?.map((faq) => (
                  <div key={faq.id} className="border border-[#919191] rounded overflow-hidden">
                    <button
                      className={`w-full px-4 py-4 flex justify-between items-center ${
                        expandedFaq === faq.id ? 'bg-[#C8A8E9]' : 'bg-white text-[#1F1F1F]'
                      }`}
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <span className="font-medium text-left">{faq.question}</span>
                      <span className="text-[#919191] font-normal text-4xl">
                        {expandedFaq === faq.id ? '-' : '+'}
                      </span>
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-4 py-3 bg-purple-50 border-t border-gray-200">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-2/5 bg-[#FDF1F7] p-6 rounded-lg mt-12">
            <h3 className="font-semibold text-base text-[#191C1F] mb-2">Don't find your answer. Ask for support.</h3>
            <p className="text-[#475156] font-normal text-sm mb-6">
              If you couldn't find the information you're looking for, our support team is here to help! You can reach us via:
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-[#F1DAFC] rounded-lg text-base text-[#77878F] focus:outline-none focus:border-[#BA24D5] bg-white autofill:bg-white"            
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-3 border border-[#F1DAFC] rounded-lg text-base text-[#77878F] focus:outline-none focus:border-[#BA24D5] bg-white autofill:bg-white"
              />

              <textarea
                name="message"
                placeholder="Message (Optional)"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 pb-5 border border-[#F1DAFC] rounded-lg text-base bg-white text-[#77878F] focus:outline-none focus:border-[#BA24D5]"
              />

              <button
                type="submit"
                className="bg-[#C8A8E9] hover:bg-purple-300 text-[#FFFFFF] font-bold text-sm py-3 px-4 rounded flex items-center justify-center"
              >
                SEND MESSAGE
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FaqPage;