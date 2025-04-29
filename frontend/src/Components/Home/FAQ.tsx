import { useState, useEffect, useRef } from 'react';
import './FAQ.css';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  questions: FAQItem[];
}

interface FAQProps {
  data: FAQCategory[];
}

const FAQ = ({ data }: FAQProps) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const faqRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => {
      if (faqRef.current) {
        observer.unobserve(faqRef.current);
      }
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleCategoryChange = (idx: number) => {
    setActiveIndex(null);
    setActiveCategory(idx);
  };

  return (
    <section ref={faqRef} className={`faq ${isVisible ? 'visible' : ''}`}>
      <div className="faq-header">
        <h2>Frequently Asked Questions</h2>
        <p>Everything you need to know about Evenza</p>
      </div>
      
      <div className="faq-categories">
        {data.map((category, idx) => (
          <button
            key={idx}
            className={`category-btn ${activeCategory === idx ? 'active' : ''}`}
            onClick={() => handleCategoryChange(idx)}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="faq-list">
        {data[activeCategory].questions.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
            style={{
              transitionDelay: `${index * 0.1}s`
            }}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;