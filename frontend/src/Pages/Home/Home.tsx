import { Link } from 'react-router-dom';
import Hero from '../../Components/Home/Hero';
import Features from '../../Components/Home/Features';
import UserFlow from '../../Components/Home/UserFlow';
import FAQ from '../../Components/Home/FAQ';
import './Home.css';
import { useEffect } from 'react';

const Home = () => {
  const heroData = {
    title: "Plan. Track. Celebrate.",
    subtitle: "Your all-in-one platform for seamless event planning and management",
    features: ["✨ Smart Planning", "🎯 Event Tracking", "🔔 Instant Updates"],
    stats: [
      { number: "10K+", label: "Events Created" },
      { number: "50K+", label: "Active Users" }
    ]
  };

  const featuresData = [
    {
      icon: '⏳',
      title: 'Countdown Timer',
      description: 'Watch the excitement build as time ticks down to your event.'
    },
    {
      icon: '🗂️',
      title: 'Track Events',
      description: 'Manage all your active and upcoming events in one place.'
    },
    {
      icon: '🕰️',
      title: 'History Archive',
      description: 'Keep a beautiful record of all your past events and memories.'
    },
    {
      icon: '🔔',
      title: 'Smart Reminders',
      description: 'Never miss an important moment with customized notifications.'
    }
  ];

  const userFlowData = [
    {
      number: '01',
      title: 'Create an event',
      description: 'Set up your event details and customize settings'
    },
    {
      number: '02',
      title: 'Track progress',
      description: 'Monitor RSVPs and manage event timeline'
    },
    {
      number: '03',
      title: 'Celebrate',
      description: 'Host successful events and create memories'
    }
  ];

  const faqData = [
    {
      title: "Getting Started",
      questions: [
        {
          question: "How do I create my first event?",
          answer: "Simply click the 'Create Event' button, fill in your event details like date, time, location, and description, then click save. Your event will be created instantly!"
        },
        {
          question: "Is Evenza free to use?",
          answer: "Yes! Evenza offers a free basic plan that includes essential features. Premium features are available in our paid plans starting at $9.99/month."
        },
        {
          question: "What types of events can I create?",
          answer: "You can create any type of event including conferences, workshops, parties, weddings, meetups, webinars, and more."
        },
        {
          question: "How many events can I create?",
          answer: "On the free plan, you can create up to 5 active events. Premium plans allow unlimited event creation."
        },
        {
          question: "Can I customize event pages?",
          answer: "Yes! You can customize colors, add your logo, upload banner images, and choose from various templates."
        },
        {
          question: "Do I need to create an account?",
          answer: "Yes, a free account is required to create and manage events. Sign up takes less than a minute!"
        },
        {
          question: "Can I use Evenza on my phone?",
          answer: "Yes, Evenza is fully responsive and works great on mobile devices. We also have mobile apps for iOS and Android."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and bank transfers for premium plans."
        },
        {
          question: "Is there a limit on event attendees?",
          answer: "Free plans support up to 100 attendees per event. Premium plans offer higher or unlimited attendee caps."
        },
        {
          question: "Can I try premium features first?",
          answer: "Yes! We offer a 14-day free trial of all premium features with no credit card required."
        }
      ]
    },
    {
      title: "Features & Tools",
      questions: [
        {
          question: "What features are included in the free plan?",
          answer: "Free plans include basic event creation, attendee management, email notifications, and simple analytics."
        },
        {
          question: "Can I send reminders to attendees?",
          answer: "Yes! You can set up automated email and SMS reminders for your events."
        },
        {
          question: "Is there a mobile check-in feature?",
          answer: "Yes, premium plans include a mobile check-in system with QR code scanning."
        },
        {
          question: "Can I collect payments for paid events?",
          answer: "Yes, you can collect payments through integrated payment processing (premium feature)."
        },
        {
          question: "Do you offer analytics?",
          answer: "Yes, we provide detailed analytics including attendance rates, engagement metrics, and more."
        },
        {
          question: "Can I export attendee data?",
          answer: "Yes, you can export attendee lists and event data in CSV or Excel format."
        },
        {
          question: "Is there a calendar integration?",
          answer: "Yes, Evenza integrates with Google Calendar, iCal, and Outlook."
        },
        {
          question: "Can I create recurring events?",
          answer: "Yes, you can set up daily, weekly, monthly, or custom recurring events."
        },
        {
          question: "Are there event templates?",
          answer: "Yes, we offer various templates for different event types to help you get started quickly."
        },
        {
          question: "Can I customize email notifications?",
          answer: "Yes, all email templates are fully customizable with your branding."
        }
      ]
    },
    {
      title: "Account Management",
      questions: [
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page and follow the instructions sent to your email."
        },
        {
          question: "Can I change my email address?",
          answer: "Yes, you can update your email address in your account settings."
        },
        {
          question: "How do I upgrade my plan?",
          answer: "Go to Settings > Billing to view and upgrade your plan."
        },
        {
          question: "Can I cancel my subscription?",
          answer: "Yes, you can cancel anytime from your account settings with no cancellation fees."
        },
        {
          question: "Is my data secure?",
          answer: "Yes, we use bank-level encryption and follow strict security protocols to protect your data."
        },
        {
          question: "Can I have multiple organizers?",
          answer: "Yes, premium plans allow you to add team members with different access levels."
        },
        {
          question: "How do I delete my account?",
          answer: "You can delete your account from settings, but this action is irreversible."
        },
        {
          question: "What happens to my events if I cancel?",
          answer: "Your events will remain accessible until your current billing period ends."
        },
        {
          question: "Can I transfer event ownership?",
          answer: "Yes, you can transfer events to other Evenza users (premium feature)."
        },
        {
          question: "How long is data retained?",
          answer: "We retain your data for as long as you have an active account, plus 30 days after deletion."
        }
      ]
    },
    {
      title: "Support & Troubleshooting",
      questions: [
        {
          question: "How do I contact support?",
          answer: "You can reach our support team via email, live chat, or submit a ticket through your dashboard."
        },
        {
          question: "What are your support hours?",
          answer: "Our support team is available 24/7 for premium users, and 9AM-5PM EST for free users."
        },
        {
          question: "Is there a user guide?",
          answer: "Yes, we have a comprehensive knowledge base with tutorials and guides."
        },
        {
          question: "What if my event is cancelled?",
          answer: "You can easily cancel events and automatically notify all attendees."
        },
        {
          question: "Can I get a refund?",
          answer: "We offer refunds within 30 days of purchase for annual premium plans."
        },
        {
          question: "What if I need urgent help?",
          answer: "Premium users have access to priority support with 1-hour response times."
        },
        {
          question: "Do you offer training?",
          answer: "Yes, we offer free webinars and personalized training for premium users."
        },
        {
          question: "How do I report issues?",
          answer: "Use the 'Report Issue' button in your dashboard or contact support directly."
        },
        {
          question: "Is there a community forum?",
          answer: "Yes, we have an active community forum where users can share tips and ask questions."
        },
        {
          question: "Do you have API documentation?",
          answer: "Yes, comprehensive API documentation is available for developers (premium feature)."
        }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    // Observe all animated elements
    document.querySelectorAll('.feature-card, .step-card, .faq-item').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">
      <Hero data={heroData} />
      <Features data={featuresData} />
      <UserFlow data={userFlowData} />
      <FAQ data={faqData} />
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Start Planning?</h2>
          <p>Join thousands of event planners who trust Evenza</p>
          <Link to="/signup" className="btn btn-primary">Get Started Free</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;