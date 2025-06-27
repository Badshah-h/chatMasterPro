import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import {
  Users, LayoutDashboard, Rocket, Zap, Clock, TrendingUp, DollarSign, BugPlay,
  Home, Settings, LogOut, Package, Palette, Sun, Moon, Briefcase, Mail, MessageSquare, Megaphone, Lightbulb, TrendingDown,
  User, Lock, MailCheck, UserPlus, Eye, EyeOff, CheckCircle, XCircle, ChevronDown, Sparkles, Facebook, Twitter, Linkedin, Instagram, ChevronRight, Menu, Plus, Edit, Trash2, Link, Unlink, Bell, Key, Save
} from 'lucide-react';

// --- Theme Context ---
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- Toast Notification Component ---
const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 4000); // Auto-hide after 4 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  let bgColor, textColor, borderColor;
  switch (type) {
    case 'success':
      bgColor = 'bg-green-600';
      textColor = 'text-white';
      borderColor = 'border-green-700';
      break;
    case 'error':
      bgColor = 'bg-red-600';
      textColor = 'text-white';
      borderColor = 'border-red-700';
      break;
    case 'info':
      bgColor = 'bg-blue-600';
      textColor = 'text-white';
      borderColor = 'border-blue-700';
      break;
    default:
      bgColor = 'bg-gray-800';
      textColor = 'text-white';
      borderColor = 'border-gray-700';
  }

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-xl flex items-center space-x-3 border ${borderColor} ${bgColor} ${textColor} animate-fade-in-down`}>
      <span>{message}</span>
      <button onClick={() => { setIsVisible(false); onClose(); }} className="ml-2 text-white opacity-75 hover:opacity-100 focus:outline-none">
        &times;
      </button>
    </div>
  );
};

// --- Theme Toggle Button Component (Plain-inspired) ---
const ThemeToggleButton = ({ position = 'default' }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const Icon = isDarkMode ? Sun : Moon;
  const tooltipText = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';

  let buttonClasses = "flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400";
  if (position === 'auth') {
    buttonClasses += " absolute top-4 right-4 z-50";
  }

  return (
    <button
      onClick={toggleTheme}
      className={buttonClasses}
      aria-label={tooltipText}
    >
      <Icon className="h-5 w-5" />
      <span className="absolute left-1/2 -translate-x-1/2 mt-10 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {tooltipText}
      </span>
    </button>
  );
};

// --- Plain-inspired Button Component ---
const Button = ({ variant = 'default', size = 'default', className = '', children, as = 'button', ...props }) => {
  let baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  let variantClasses = {
    default: "bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200",
    outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300",
    link: "text-gray-600 dark:text-gray-400 underline-offset-4 hover:underline",
  };
  let sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8 text-base",
    xl: "h-12 rounded-lg px-10 text-lg", // Added for larger hero buttons
    icon: "h-10 w-10",
  };

  const Component = as;

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
      {...(as === 'button' && { type: props.type || 'button' })}
    >
      {children}
    </Component>
  );
};

// --- Plain-inspired Input Component ---
const Input = ({ className = '', type = 'text', ...props }) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 disabled:cursor-not-allowed disabled:opacity-50
        dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus-visible:ring-gray-500 transition-all duration-200 ${className}`}
      {...props}
    />
  );
};

// --- Plain-inspired Accordion Components ---
const Accordion = ({ type = "single", collapsible = true, className = '', children, ...props }) => (
  <div className={`w-full ${className}`} {...props}>{children}</div>
);

const AccordionItem = ({ value, className = '', children }) => (
  <div className={`border-b border-gray-200 last:border-b-0 dark:border-gray-700 ${className}`}>{children}</div>
);

const AccordionTrigger = ({ className = '', children, onClick, isOpen }) => (
  <button
    className={`flex flex-1 items-center justify-between py-4 font-medium transition-all duration-300 group
      text-lg text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 w-full text-left
      ${className}`}
    onClick={onClick}
    aria-expanded={isOpen}
  >
    {children}
    <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300`} />
  </button>
);

const AccordionContent = ({ className = '', children, isOpen }) => (
  <div
    className={`overflow-hidden text-sm transition-all duration-300 ease-in-out
      ${isOpen ? 'max-h-screen opacity-100 pb-4' : 'max-h-0 opacity-0'}
      text-gray-600 dark:text-gray-400 leading-relaxed ${className}`}
  >
    {children}
  </div>
);

// --- Modal Component ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 py-6 overflow-y-auto">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 animate-scale-in">
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="p-1">
            {/* Replaced <X /> with inline SVG to resolve ReferenceError */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"><path d="M18 6L6 18M6 6L18 18"/></svg>
          </Button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};


// --- Mock Data Generation Functions ---
const generateDailyActiveUsers = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      name: `Day ${i + 1}`,
      Users: Math.floor(Math.random() * (500 - 100 + 1)) + 100,
    });
  }
  return data;
};

const generateCampaignCreationRate = () => {
  const data = [];
  for (let i = 0; i < 7; i++) {
    data.push({
      name: `Week ${i + 1}`,
      'Campaigns Created': Math.floor(Math.random() * (50 - 10 + 1)) + 10,
    });
  }
  return data;
};

const generateApiResponseTime = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      name: `${i}:00`,
      'Response Time (ms)': parseFloat((Math.random() * (150 - 50) + 50).toFixed(2)),
    });
  }
  return data;
};

const generateCampaignSuccessRate = () => {
  const data = [
    { name: 'Jan', Success: 75, Failure: 25 },
    { name: 'Feb', Success: 80, Failure: 20 },
    { name: 'Mar', Success: 70, Failure: 30 },
    { name: 'Apr', Success: 85, Failure: 15 },
    { name: 'May', Success: 90, Failure: 10 },
    { name: 'Jun', Success: 82, Failure: 18 },
  ];
  return data;
};

const generateTotalCampaigns = () => {
  const data = [
    { name: 'Email', count: Math.floor(Math.random() * (300 - 100 + 1)) + 100 },
    { name: 'Social Media', count: Math.floor(Math.random() * (250 - 80 + 1)) + 80 },
    { name: 'PPC', count: Math.floor(Math.random() * (150 - 50 + 1)) + 50 },
    { name: 'Landing Page', count: Math.floor(Math.random() * (100 - 30 + 1)) + 30 },
  ];
  return data;
};

const generateChannelPerformance = () => {
  return [
    { name: 'Email', value: 400, color: '#4CAF50' }, // More muted green
    { name: 'Social Media', value: 300, color: '#2196F3' }, // More muted blue
    { name: 'PPC', value: 300, color: '#FFC107' }, // More muted yellow
    { name: 'Landing Pages', value: 200, color: '#9C27B0' }, // More muted purple
  ];
};


// --- Components for Dashboard Metrics ---
const Card = ({ title, value, icon: Icon, description, colorClass = 'text-blue-500' }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col items-start space-y-3 transition-all duration-300 hover:shadow-md hover:scale-[1.01] cursor-pointer border border-gray-100 dark:border-gray-700">
    <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 mb-4`}> {/* Neutral background for icon */}
      {Icon && <Icon className={`h-7 w-7 ${colorClass}`} />}
    </div>
    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
    <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
  </div>
);

// --- Landing Page Specific Components ---

// Landing Page Header
const LandingPageHeader = ({ setPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo/Brand */}
        <Button as="a" href="#" variant="ghost" onClick={() => setPage('landing')} className="flex items-center space-x-2 text-xl font-bold p-0 hover:bg-transparent dark:hover:bg-transparent">
          <Sparkles className="h-7 w-7 text-gray-900 dark:text-gray-100" />
          <span className="text-gray-900 dark:text-gray-100">AI Marketer</span>
        </Button>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggleButton position="header" />
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)} className="p-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button as="a" href="#features" variant="link" className="text-gray-700 dark:text-gray-300">Features</Button>
          <Button as="a" href="#pricing" variant="link" className="text-gray-700 dark:text-gray-300">Pricing</Button>
          <Button as="a" href="#testimonials" variant="link" className="text-gray-700 dark:text-gray-300">Testimonials</Button>
          <Button as="a" href="#faq" variant="link" className="text-gray-700 dark:text-gray-300">FAQ</Button>
          <ThemeToggleButton position="header" />
          <Button variant="outline" onClick={() => setPage('login')}>Log In</Button>
          <Button onClick={() => setPage('register')}>Sign Up</Button>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800 pb-4 animate-fade-in-down">
          <nav className="flex flex-col items-center space-y-3 px-4 py-4">
            <Button as="a" href="#features" variant="ghost" onClick={() => setMenuOpen(false)} className="w-full text-center text-gray-700 dark:text-gray-300">Features</Button>
            <Button as="a" href="#pricing" variant="ghost" onClick={() => setMenuOpen(false)} className="w-full text-center text-gray-700 dark:text-gray-300">Pricing</Button>
            <Button as="a" href="#testimonials" variant="ghost" onClick={() => setMenuOpen(false)} className="w-full text-center text-gray-700 dark:text-gray-300">Testimonials</Button>
            <Button as="a" href="#faq" variant="ghost" onClick={() => setMenuOpen(false)} className="w-full text-center text-gray-700 dark:text-gray-300">FAQ</Button>
            <Button variant="outline" onClick={() => { setPage('login'); setMenuOpen(false); }} className="w-full">Log In</Button>
            <Button onClick={() => { setPage('register'); setMenuOpen(false); }} className="w-full">Sign Up</Button>
          </nav>
        </div>
      )}
    </header>
  );
};


// Landing Page
const LandingPage = ({ setPage }) => {
  const features = [
    {
      icon: Palette,
      title: "AI Content Generation",
      description: "Craft engaging copy, stunning visuals, and full campaigns with intelligent AI assistance.",
      animation: "fade-in-up"
    },
    {
      icon: Briefcase,
      title: "Multi-Channel Management",
      description: "Manage and launch campaigns across email, social media, PPC, and landing pages seamlessly.",
      animation: "fade-in-up-delay-1"
    },
    {
      icon: TrendingUp,
      title: "Real-time AI Optimization",
      description: "Our AI continuously monitors and optimizes campaigns for maximum performance and ROI.",
      animation: "fade-in-up-delay-2"
    },
    {
      icon: Users,
      title: "Advanced Audience Targeting",
      description: "Pinpoint your ideal customers with AI-powered audience segmentation and analysis.",
      animation: "fade-in-up-delay-3"
    },
    {
      icon: MessageSquare,
      title: "Integrated Analytics & Reporting",
      description: "Gain deep insights with comprehensive dashboards and customizable performance reports.",
      animation: "fade-in-up-delay-4"
    },
    {
      icon: Settings,
      title: "Customizable Workflows",
      description: "Tailor the platform to your unique marketing processes and team structures.",
      animation: "fade-in-up-delay-5"
    }
  ];

  const testimonials = [
    {
      quote: "This AI Marketing Campaign Manager has transformed our digital strategy. The AI-generated content is top-notch, and the optimization features are simply revolutionary!",
      name: "Jane Doe",
      title: "Marketing Director, InnovateCo",
      avatar: "https://placehold.co/100x100/A78BFA/FFFFFF?text=JD"
    },
    {
      quote: "We've seen a 30% increase in lead generation since using this platform. The ease of campaign creation and real-time insights are unmatched.",
      name: "John Smith",
      title: "CEO, GrowthTech Solutions",
      avatar: "https://placehold.co/100x100/6366F1/FFFFFF?text=JS"
    },
    {
      quote: "The dark mode is a lifesaver for late-night campaign adjustments! Beyond aesthetics, the functionality and efficiency are outstanding.",
      name: "Emily White",
      title: "Content Strategist, Creative Hub",
      avatar: "https://placehold.co/100x100/8B5CF6/FFFFFF?text=EW"
    }
  ];

  const faqs = [
    {
      question: "What kind of AI content can I generate?",
      answer: "Our AI can generate a wide range of content including email copy, social media posts, ad creatives, landing page content, blog outlines, and more, tailored to your brand voice and campaign goals."
    },
    {
      question: "How does AI optimization work?",
      answer: "The AI continuously monitors your campaign performance across various channels, identifies patterns, and automatically suggests or applies adjustments to targeting, bidding, content, and scheduling to improve ROI."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, data security is our top priority. We use industry-standard encryption, secure servers, and strict access controls to protect your information. We are also compliant with major data privacy regulations."
    },
    {
      question: "Can I integrate with my existing marketing tools?",
      answer: "Absolutely! Our platform offers robust integrations with popular email platforms (e.g., Mailchimp, SendGrid), social media APIs (e.g., Facebook, Instagram), PPC platforms (e.g., Google Ads), and analytics tools (e.g., Google Analytics)."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer 24/7 customer support via chat, email, and phone for all our paid plans. Enterprise clients receive dedicated account management and priority support."
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <LandingPageHeader setPage={setPage} />

      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 text-center flex flex-col items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight animate-fade-in-up">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text dark:from-gray-100 dark:to-gray-300">
              Unleash the Power of AI
            </span> <br /> for Your Marketing Campaigns
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 animate-fade-in-up-delay-1">
            Generate, Optimize, and Scale your campaigns with our intelligent AI-driven platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up-delay-2">
            <Button size="xl" onClick={() => setPage('register')} className="shadow-md">
              Get Started Free
            </Button>
            <Button size="xl" variant="outline" onClick={() => setPage('login')} className="shadow-md">
              Log In
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section id="features" className="w-full max-w-7xl mx-auto py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-gray-100 mb-16 animate-fade-in-up">
          Key Features That Drive Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm flex flex-col items-start text-left transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 border border-gray-100 dark:border-gray-800 animate-${feature.animation}`}
            >
              <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 mb-6 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors duration-200">
                <feature.icon className="h-8 w-8 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-200" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Table */}
      <section id="pricing" className="w-full max-w-7xl mx-auto py-20 px-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-inner my-12 border border-gray-100 dark:border-gray-800">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-gray-100 mb-16 animate-fade-in-up">
          Choose Your Perfect Plan
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white dark:bg-gray-950 p-8 rounded-xl shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-800 transform animate-fade-in-up-delay-1">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Basic</h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">$49<span className="text-lg text-gray-500 dark:text-gray-400">/month</span></p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Ideal for small businesses and startups.</p>
            <ul className="text-left text-gray-700 dark:text-gray-300 space-y-3 mb-8 w-full">
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" /> 5 AI Campaigns/month</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" /> Basic Content Generation</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" /> Email & Social Media Channels</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" /> Standard Analytics</li>
              <li className="flex items-center"><XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0" /> No AI Optimization</li>
            </ul>
            <Button size="lg" onClick={() => setPage('register')} className="w-full">
              Start Basic
            </Button>
          </div>

          {/* Pro Plan - Highlighted */}
          <div className="bg-white dark:bg-gray-950 p-8 rounded-xl shadow-lg flex flex-col items-center text-center border-2 border-gray-900 dark:border-gray-100 transform scale-105 animate-fade-in-up-delay-2">
            <div className="bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 px-4 py-1 rounded-full text-xs font-semibold mb-3">Most Popular</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Pro</h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">$99<span className="text-lg text-gray-500 dark:text-gray-400">/month</span></p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Perfect for growing businesses.</p>
            <ul className="text-left text-gray-700 dark:text-gray-300 space-y-3 mb-8 w-full">
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" /> Unlimited AI Campaigns</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" /> Advanced Content Generation</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" /> All Marketing Channels</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" /> Advanced Analytics</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" /> Real-time AI Optimization</li>
            </ul>
            <Button size="lg" onClick={() => setPage('register')} className="w-full">
              Go Pro
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white dark:bg-gray-950 p-8 rounded-xl shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-800 transform animate-fade-in-up-delay-3">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Enterprise</h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">Custom</p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Tailored for large organizations.</p>
            <ul className="text-left text-gray-700 dark:text-gray-300 space-y-3 mb-8 w-full">
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" /> All Pro Features</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" /> Dedicated Account Manager</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" /> Custom Integrations</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" /> White-Labeling Options</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" /> Priority Support</li>
            </ul>
            <Button size="lg" onClick={() => setPage('register')} className="w-full">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section id="testimonials" className="w-full max-w-7xl mx-auto py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-gray-100 mb-16 animate-fade-in-up">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-800 animate-fade-in-up">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="h-16 w-16 rounded-full mb-6 border-2 border-gray-200 dark:border-gray-700"
              />
              <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-6">"{testimonial.quote}"</p>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
              <p className="text-md text-gray-600 dark:text-gray-400">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full max-w-5xl mx-auto py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-gray-100 mb-16 animate-fade-in-up">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger onClick={() => toggleFaq(index)} isOpen={openFaq === index}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent isOpen={openFaq === index}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Final Call to Action */}
      <section className="w-full max-w-4xl mx-auto py-20 px-4 text-center bg-gray-50 dark:bg-gray-900 rounded-xl shadow-inner my-12 border border-gray-100 dark:border-gray-800">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8 animate-fade-in-up">
          Ready to Elevate Your Marketing?
        </h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 animate-fade-in-up-delay-1">
          Join thousands of businesses already transforming their campaigns with AI.
        </p>
        <Button size="xl" onClick={() => setPage('register')} className="shadow-md">
          Get Started Today!
        </Button>
      </section>


      {/* Main Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12 px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-100">AI Marketer</h3>
            <p className="text-gray-400 text-sm">Revolutionizing marketing with intelligence.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors duration-200" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors duration-200" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors duration-200" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors duration-200" aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-100 mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-gray-100 transition-colors duration-200">Features</a></li>
              <li><a href="#pricing" className="hover:text-gray-100 transition-colors duration-200">Pricing</a></li>
              <li><a href="#" className="hover:text-gray-100 transition-colors duration-200">Integrations</a></li>
              <li><a href="#" className="hover:text-gray-100 transition-colors duration-200">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-100 mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-gray-100 transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-gray-100 transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="hover:text-gray-100 transition-colors duration-200">Blog</a></li>
              <li><a href="#testimonials" className="hover:text-gray-100 transition-colors duration-200">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-100 mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#faq" className="hover:text-gray-100 transition-colors duration-200">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-100 transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-100 transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-100 transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} AI Marketing Campaign Manager. All rights reserved.
        </div>
      </footer>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInScaleUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .animate-fade-in-up {
          animation: fadeInScaleUp 0.6s ease-out forwards;
          opacity: 0; /* Hidden by default */
        }
        .animate-fade-in-up-delay-1 { animation-delay: 0.1s; }
        .animate-fade-in-up-delay-2 { animation-delay: 0.2s; }
        .animate-fade-in-up-delay-3 { animation-delay: 0.3s; }
        .animate-fade-in-up-delay-4 { animation-delay: 0.4s; }
        .animate-fade-in-up-delay-5 { animation-delay: 0.5s; }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out forwards;
        }

        @keyframes gradient-animate {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animated-gradient-bg {
            background-size: 400% 400%;
            animation: gradient-animate 15s ease infinite;
        }
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
            animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// Auth Pages (Login/Register)
const AuthPage = ({ type, setPage, onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // States for individual input errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { showToast } = useContext(AppToastContext); // Using context for toast

  const isLogin = type === 'login';

  // Validation functions
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    // Simplified: Only check for minimum length
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default HTML form submission
    // Clear all previous errors
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    let formIsValid = true;

    // Email validation
    if (!email.trim()) {
      setEmailError('Email is required.');
      formIsValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      formIsValid = false;
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError('Password is required.');
      formIsValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long.');
      formIsValid = false;
    }

    // Confirm Password validation (for registration)
    if (!isLogin) {
      if (!confirmPassword.trim()) {
        setConfirmPasswordError('Confirm password is required.');
        formIsValid = false;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match.');
        formIsValid = false;
      }
    }

    if (!formIsValid) {
      showToast({ message: 'Please correct the errors in the form.', type: 'error' });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password123') {
        showToast({ message: 'Login successful!', type: 'success' });
        onAuthSuccess();
      } else if (!isLogin && email === 'new@example.com' && password === 'newpassword') {
        showToast({ message: 'Registration successful!', type: 'success' });
        onAuthSuccess();
      } else {
        const msg = isLogin ? 'Invalid email or password.' : 'Registration failed. Try different credentials.';
        showToast({ message: msg, type: 'error' });
        // Set individual errors again if needed for persistent highlighting
        if (isLogin) {
            setEmailError('Invalid credentials');
            setPasswordError('Invalid credentials');
        } else {
            setEmailError('Registration failed');
            setPasswordError('Registration failed');
            setConfirmPasswordError('Registration failed');
        }
      }
    }, 1000);
  };

  const pageTitle = isLogin ? 'Sign In to Your Account' : 'Create Your Account';
  const submitButtonText = isLogin ? 'Sign In' : 'Register';
  const toggleText = isLogin ? "Don't have an account?" : "Already have an account?";
  const toggleLinkText = isLogin ? "Sign Up" : "Sign In";
  const togglePage = isLogin ? 'register' : 'login';

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 font-inter bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <ThemeToggleButton position="auth" />
      <Button
        as="a"
        href="#"
        variant="outline" // Changed to outline for more prominence but still minimal
        size="lg" // Increased size
        onClick={() => setPage('landing')}
        className="absolute top-4 left-4 z-50 group shadow-sm hover:shadow-md transition-shadow" // Added shadow
        aria-label="Back to Home"
      >
        <Home className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2" />
        <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">Back to Home</span>
      </Button>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl border border-gray-100 dark:border-gray-800 animate-fade-in-up">
        {/* Left Column - Visual (Animated Gradient Background) */}
        <div className="relative md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center text-white bg-gray-900 dark:bg-gray-800 animated-gradient-bg">
          <div className="relative z-10 text-center animate-fade-in-up-delay-1">
            {isLogin ? (
              <>
                <h2 className="text-3xl font-extrabold mb-4 text-gray-50">Welcome Back!</h2>
                <p className="text-base opacity-90 text-gray-300">
                  Log in to continue managing your powerful AI-driven marketing campaigns.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-extrabold mb-4 text-gray-50">Join Our Community</h2>
                <p className="text-base opacity-90 text-gray-300">
                  Create your account to unlock advanced AI tools and supercharge your marketing efforts.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center animate-fade-in-up-delay-2">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">{pageTitle}</h2>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate> {/* Added noValidate here */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} // Clear error on change
                  placeholder="you@example.com"
                  className={`pl-10 ${emailError ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}`}
                  required
                />
                <MailCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
              </div>
              {emailError && <p className="text-red-500 dark:text-red-300 text-xs italic mt-1">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} // Clear error on change
                  placeholder="Min. 6 characters"
                  className={`pl-10 pr-10 ${passwordError ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}`}
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:bg-transparent dark:hover:bg-transparent"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              {passwordError && <p className="text-red-500 dark:text-red-300 text-xs italic mt-1">{passwordError}</p>}
            </div>
            {!isLogin && (
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(''); }} // Clear error on change
                    placeholder="Confirm your password"
                    className={`pl-10 pr-10 ${confirmPasswordError ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}`}
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:bg-transparent dark:hover:bg-transparent"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
                {confirmPasswordError && <p className="text-red-500 dark:text-red-300 text-xs italic mt-1">{confirmPasswordError}</p>}
              </div>
            )}
            <Button type="submit" className="w-full py-3 px-4 font-semibold shadow-sm" size="lg">
              {submitButtonText}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            {toggleText}{' '}
            <Button as="a" variant="link" onClick={() => setPage(togglePage)} className="font-medium p-0 h-auto">
              {toggleLinkText}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Page
const AdminDashboard = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [dailyActiveUsers, setDailyActiveUsers] = useState([]);
  const [campaignCreationRate, setCampaignCreationRate] = useState([]);
  const [apiResponseTime, setApiResponseTime] = useState([]);
  const [campaignSuccessRate, setCampaignSuccessRate] = useState([]);
  const [totalCampaigns, setTotalCampaigns] = useState([]);
  const [errorRates, setErrorRates] = useState([]);
  const [channelPerformance, setChannelPerformance] = useState([]);


  useEffect(() => {
    setDailyActiveUsers(generateDailyActiveUsers());
    setCampaignCreationRate(generateCampaignCreationRate());
    setApiResponseTime(generateApiResponseTime());
    setCampaignSuccessRate(generateCampaignSuccessRate());
    setTotalCampaigns(generateTotalCampaigns());
    setChannelPerformance(generateChannelPerformance());
    // Mock error rates - simple values for demonstration
    setErrorRates([
      { name: 'API Errors', value: 0.5 },
      { name: 'Validation Errors', value: 0.1 },
      { name: 'Integration Failures', value: 0.2 },
    ]);
  }, []);

  const chartStrokeColor = isDarkMode ? '#6b7280' : '#4b5563'; // Darker for light, lighter for dark
  const chartTextColor = isDarkMode ? '#e2e8f0' : '#1f2937'; // Lighter for dark, darker for light
  const gridStroke = isDarkMode ? '#374151' : '#e5e7eb'; // Darker grid for dark mode

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-64px)] transition-colors duration-300">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">Dashboard Overview</h1>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Monitor your AI Marketing Campaigns in real-time.
        </p>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        <Card
          title="Daily Active Users"
          value={dailyActiveUsers.length > 0 ? dailyActiveUsers[dailyActiveUsers.length - 1].Users : 'N/A'}
          icon={Users}
          colorClass="text-blue-600"
          description="Users active in the last 24 hours."
        />
        <Card
          title="Campaigns Launched (Last 7 Days)"
          value={campaignCreationRate.length > 0 ? campaignCreationRate.reduce((sum, item) => sum + item['Campaigns Created'], 0) : 'N/A'}
          icon={Rocket}
          colorClass="text-green-600"
          description="Total campaigns created this week."
        />
        <Card
          title="Avg. API Response Time"
          value={apiResponseTime.length > 0 ? `${(apiResponseTime.reduce((sum, item) => sum + item['Response Time (ms)'], 0) / apiResponseTime.length).toFixed(0)} ms` : 'N/A'}
          icon={Zap}
          colorClass="text-yellow-600"
          description="Average backend response latency."
        />
        <Card
          title="Total Campaigns"
          value={totalCampaigns.length > 0 ? totalCampaigns.reduce((sum, item) => sum + item.count, 0) : 'N/A'}
          icon={LayoutDashboard}
          colorClass="text-purple-600"
          description="Overall campaigns managed by the platform."
        />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Daily Active Users */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" /> Daily Active Users
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyActiveUsers} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="name" stroke={chartStrokeColor} tick={{ fill: chartTextColor }} />
              <YAxis stroke={chartStrokeColor} tick={{ fill: chartTextColor }} />
              <Tooltip
                contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', border: `1px solid ${isDarkMode ? '#4b5563' : '#e2e8f0'}`, borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}
                labelStyle={{ color: isDarkMode ? '#e2e8f0' : '#4a5568' }}
                itemStyle={{ color: isDarkMode ? '#e2e8f0' : '#2d3748' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Line type="monotone" dataKey="Users" stroke="#2196F3" activeDot={{ r: 8 }} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Creation Rate */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
            <Rocket className="h-5 w-5 mr-2 text-green-600" /> Weekly Campaign Creation
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={campaignCreationRate} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="name" stroke={chartStrokeColor} tick={{ fill: chartTextColor }} />
              <YAxis stroke={chartStrokeColor} tick={{ fill: chartTextColor }} />
              <Tooltip
                contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', border: `1px solid ${isDarkMode ? '#4b5563' : '#e2e8f0'}`, borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}
                labelStyle={{ color: isDarkMode ? '#e2e8f0' : '#4a5568' }}
                itemStyle={{ color: isDarkMode ? '#e2e8f0' : '#2d3748' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="Campaigns Created" fill="#4CAF50" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* API Response Time */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-yellow-600" /> API Response Time (24h)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={apiResponseTime} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="name" stroke={chartStrokeColor} tick={{ fill: chartTextColor }} />
              <YAxis domain={[40, 160]} stroke={chartStrokeColor} tick={{ fill: chartTextColor }} />
              <Tooltip
                contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', border: `1px solid ${isDarkMode ? '#4b5563' : '#e2e8f0'}`, borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}
                labelStyle={{ color: isDarkMode ? '#e2e8f0' : '#4a5568' }}
                itemStyle={{ color: isDarkMode ? '#e2e8f0' : '#2d3748' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Line type="monotone" dataKey="Response Time (ms)" stroke="#FFC107" activeDot={{ r: 8 }} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Success Rate */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-rose-600" /> Monthly Campaign Success Rate
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={campaignSuccessRate} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="name" stroke={chartStrokeColor} tick={{ fill: chartTextColor }} />
              <YAxis stroke={chartStrokeColor} tick={{ fill: chartTextColor }} />
              <Tooltip
                contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', border: `1px solid ${isDarkMode ? '#4b5563' : '#e2e8f0'}`, borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}
                labelStyle={{ color: isDarkMode ? '#e2e8f0' : '#4a5568' }}
                itemStyle={{ color: isDarkMode ? '#e2e8f0' : '#2d3748' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="Success" fill="#8BC34A" stackId="a" radius={[10, 10, 0, 0]} /> {/* Lighter Green */}
              <Bar dataKey="Failure" fill="#F44336" stackId="a" radius={[0, 0, 10, 10]} /> {/* Red */}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Total Campaigns by Type */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
            <LayoutDashboard className="h-5 w-5 mr-2 text-teal-600" /> Total Campaigns by Type
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout="vertical" data={totalCampaigns} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis type="number" stroke={chartStrokeColor} tick={{ fill: chartTextColor }} />
              <YAxis type="category" dataKey="name" stroke={chartStrokeColor} tick={{ fill: chartTextColor }} />
              <Tooltip
                contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', border: `1px solid ${isDarkMode ? '#4b5563' : '#e2e8f0'}`, borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}
                labelStyle={{ color: isDarkMode ? '#e2e8f0' : '#4a5568' }}
                itemStyle={{ color: isDarkMode ? '#e2e8f0' : '#2d3748' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="count" fill="#009688" radius={[0, 10, 10, 0]} /> {/* Teal */}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Channel Performance (Pie Chart) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
            <Megaphone className="h-5 w-5 mr-2 text-blue-600" /> Channel Performance
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={generateChannelPerformance()}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {generateChannelPerformance().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', border: `1px solid ${isDarkMode ? '#4b5563' : '#e2e8f0'}`, borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}
                labelStyle={{ color: isDarkMode ? '#e2e8f0' : '#4a5568' }}
                itemStyle={{ color: isDarkMode ? '#e2e8f0' : '#2d3748' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* System Error Rates */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
            <BugPlay className="h-5 w-5 mr-2 text-orange-600" /> System Error Rates
          </h2>
          <div className="space-y-3">
            {errorRates.map((error, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900 rounded-lg">
                <span className="text-gray-700 dark:text-red-100 font-medium">{error.name}</span>
                <span className="text-red-600 dark:text-red-300 font-bold">{`${error.value}%`}</span>
              </div>
            ))}
            <div className="text-sm text-gray-500 dark:text-gray-400 pt-2">
              <p>Monitors critical system errors across the platform.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ContentStudio Page (New Component)
const ContentStudio = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { showToast } = useContext(AppToastContext); // Using context for toast

  const handleGenerateContent = async () => {
    setIsLoading(true);
    setError('');
    setGeneratedText('');

    if (!prompt.trim()) {
      setError('Please enter a prompt to generate content.');
      showToast({ message: 'Please enter a prompt to generate content.', type: 'error' });
      setIsLoading(false);
      return;
    }

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will provide this at runtime

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        setGeneratedText(result.candidates[0].content.parts[0].text);
        showToast({ message: 'Content generated successfully!', type: 'success' });
      } else {
        setError('Failed to generate content. Please try again.');
        showToast({ message: 'Failed to generate content. Please try again.', type: 'error' });
        console.error('Gemini API response format unexpected:', result);
      }
    } catch (err) {
      console.error('Error calling Gemini API:', err);
      setError('An error occurred while connecting to the AI service. Please try again later.');
      showToast({ message: 'An error occurred while connecting to the AI service. Please try again later.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      showToast({ message: 'Content copied to clipboard!', type: 'success' });
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showToast({ message: 'Failed to copy text to clipboard.', type: 'error' });
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-64px)] transition-colors duration-300">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1 flex items-center">
          <Palette className="h-8 w-8 text-gray-900 dark:text-gray-100 mr-2" /> AI Content Studio
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Generate compelling marketing content using our AI assistant.
        </p>
      </header>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-5 md:p-6 border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Content Generator</h2>

        <div className="mb-5">
          <label htmlFor="content-prompt" className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter your content prompt:
          </label>
          <textarea
            id="content-prompt"
            rows="5"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 transition-all duration-200"
            placeholder="E.g., Write an engaging social media post for a new mobile app that helps track daily water intake."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
        </div>

        <Button
          onClick={handleGenerateContent}
          className="w-full md:w-auto px-5 py-2.5 font-semibold shadow-sm transform hover:scale-[1.01] flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              Generate Content <Sparkles className="h-5 w-5 ml-2" />
            </>
          )}
        </Button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative mt-6 dark:bg-red-950 dark:border-red-900 dark:text-red-300" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {generatedText && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Generated Content:</h3>
            <textarea
              readOnly
              rows="10"
              className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-y"
              value={generatedText}
            ></textarea>
            <Button
              onClick={handleCopy}
              className="mt-4 px-4 py-2"
            >
              Copy to Clipboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};


// Component: CampaignIdeas
const CampaignIdeas = () => {
  const [brief, setBrief] = useState('');
  const [campaignIdeas, setCampaignIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { showToast } = useContext(AppToastContext);

  const handleGenerateIdeas = async () => {
    setIsLoading(true);
    setError('');
    setCampaignIdeas([]);

    if (!brief.trim()) {
      setError('Please provide a brief for campaign ideas.');
      showToast({ message: 'Please provide a brief for campaign ideas.', type: 'error' });
      setIsLoading(false);
      return;
    }

    try {
      const prompt = `Generate 3 marketing campaign ideas based on the following brief: "${brief}". For each idea, provide a "Campaign Name", "Target Audience", "Key Message", "Suggested Channels" (e.g., Email, Social Media, PPC), and a "Call to Action". Ensure the output is a JSON array of objects.`;

      let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = {
        contents: chatHistory,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                "Campaign Name": { "type": "STRING" },
                "Target Audience": { "type": "STRING" },
                "Key Message": { "type": "STRING" },
                "Suggested Channels": {
                  "type": "ARRAY",
                  "items": { "type": "STRING" }
                },
                "Call to Action": { "type": "STRING" }
              },
              "propertyOrdering": ["Campaign Name", "Target Audience", "Key Message", "Suggested Channels", "Call to Action"]
            }
          }
        }
      };
      const apiKey = ""; // Canvas will provide this at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const jsonResponse = JSON.parse(result.candidates[0].content.parts[0].text);
        setCampaignIdeas(jsonResponse);
        showToast({ message: 'Campaign ideas generated successfully!', type: 'success' });
      } else {
        setError('Failed to generate campaign ideas. Please try again.');
        showToast({ message: 'Failed to generate campaign ideas. Please try again.', type: 'error' });
        console.error('Gemini API response format unexpected:', result);
      }
    } catch (err) {
      console.error('Error calling Gemini API:', err);
      setError('An error occurred while connecting to the AI service. Please try again later.');
      showToast({ message: 'An error occurred while connecting to the AI service. Please try again later.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-64px)] transition-colors duration-300">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1 flex items-center">
          <Lightbulb className="h-8 w-8 text-gray-900 dark:text-gray-100 mr-2" /> AI Campaign Idea Generator
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Brainstorm new marketing campaign ideas with AI assistance.
        </p>
      </header>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-5 md:p-6 border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Generate Campaign Ideas</h2>

        <div className="mb-5">
          <label htmlFor="campaign-brief" className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
            Brief for campaign ideas:
          </label>
          <textarea
            id="campaign-brief"
            rows="4"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 transition-all duration-200"
            placeholder="E.g., A new eco-friendly smart home device for busy professionals, aiming to reduce energy consumption."
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
          ></textarea>
        </div>

        <Button
          onClick={handleGenerateIdeas}
          className="w-full md:w-auto px-5 py-2.5 font-semibold shadow-sm transform hover:scale-[1.01] flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Ideas...
            </>
          ) : (
            <>
              Generate Ideas <Sparkles className="h-5 w-5 ml-2" />
            </>
          )}
        </Button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative mt-6 dark:bg-red-950 dark:border-red-900 dark:text-red-300" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {campaignIdeas.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Suggested Campaign Ideas:</h3>
            <div className="space-y-4">
              {campaignIdeas.map((idea, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{idea['Campaign Name']}</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    <span className="font-semibold">Target Audience:</span> {idea['Target Audience']}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    <span className="font-semibold">Key Message:</span> {idea['Key Message']}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    <span className="font-semibold">Suggested Channels:</span> {idea['Suggested Channels'].join(', ')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Call to Action:</span> {idea['Call to Action']}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// New Component: CampaignPerformance
const CampaignPerformance = () => {
  const [campaignData, setCampaignData] = useState('');
  const [performanceInsights, setPerformanceInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { showToast } = useContext(AppToastContext);

  const handleAnalyzePerformance = async () => {
    setIsLoading(true);
    setError('');
    setPerformanceInsights(null);

    if (!campaignData.trim()) {
      setError('Please provide campaign data to analyze performance.');
      showToast({ message: 'Please provide campaign data to analyze performance.', type: 'error' });
      setIsLoading(false);
      return;
    }

    try {
      const prompt = `Analyze the following marketing campaign performance data and provide insights. The output should be a JSON object with 'summary' (string), 'strengths' (array of strings), 'weaknesses' (array of strings), and 'recommendations' (array of strings). Data: "${campaignData}"`;

      let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = {
        contents: chatHistory,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              "summary": { "type": "STRING" },
              "strengths": {
                "type": "ARRAY",
                "items": { "type": "STRING" }
              },
              "weaknesses": {
                "type": "ARRAY",
                "items": { "type": "STRING" }
              },
              "recommendations": {
                "type": "ARRAY",
                "items": { "type": "STRING" }
              }
            },
            "propertyOrdering": ["summary", "strengths", "weaknesses", "recommendations"]
          }
        }
      };
      const apiKey = ""; // Canvas will provide this at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const jsonResponse = JSON.parse(result.candidates[0].content.parts[0].text);
        setPerformanceInsights(jsonResponse);
        showToast({ message: 'Campaign performance analyzed successfully!', type: 'success' });
      } else {
        setError('Failed to analyze campaign performance. Please try again.');
        showToast({ message: 'Failed to analyze campaign performance. Please try again.', type: 'error' });
        console.error('Gemini API response format unexpected:', result);
      }
    } catch (err) {
      console.error('Error calling Gemini API:', err);
      setError('An error occurred while connecting to the AI service. Please try again later.');
      showToast({ message: 'An error occurred while connecting to the AI service. Please try again later.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-64px)] transition-colors duration-300">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1 flex items-center">
          <TrendingDown className="h-8 w-8 text-gray-900 dark:text-gray-100 mr-2" /> AI Campaign Performance Insights
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Get AI-driven analysis and recommendations for your campaigns.
        </p>
      </header>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-5 md:p-6 border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Analyze Campaign Performance</h2>

        <div className="mb-5">
          <label htmlFor="campaign-data" className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter campaign details and performance data:
          </label>
          <textarea
            id="campaign-data"
            rows="6"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 transition-all duration-200"
            placeholder="E.g., Our recent email campaign for 'Eco-Friendly Water Bottles' had an open rate of 25% and a click-through rate of 3%, but conversions were only 0.5%. The target audience was young professionals interested in sustainability. Goal was 2% conversion."
            value={campaignData}
            onChange={(e) => setCampaignData(e.target.value)}
          ></textarea>
        </div>

        <Button
          onClick={handleAnalyzePerformance}
          className="w-full md:w-auto px-5 py-2.5 font-semibold shadow-sm transform hover:scale-[1.01] flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Performance...
            </>
          ) : (
            <>
              Analyze Performance <TrendingUp className="h-5 w-5 ml-2" />
            </>
          )}
        </Button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative mt-6 dark:bg-red-950 dark:border-red-900 dark:text-red-300" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {performanceInsights && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Performance Insights:</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Summary</h4>
                <p className="text-gray-700 dark:text-gray-300">{performanceInsights.summary}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Strengths</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {performanceInsights.strengths.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Weaknesses / Areas for Improvement</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {performanceInsights.weaknesses.map((weakness, idx) => (
                    <li key={idx}>{weakness}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Recommendations</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {performanceInsights.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Breadcrumbs Component
const Breadcrumbs = ({ currentPage, setPage }) => {
  const pathMap = {
    'dashboard': 'Dashboard',
    'campaigns': 'Campaigns',
    'campaign-performance': 'Campaign Insights',
    'content-studio': 'Content Studio',
    'campaign-ideas': 'Campaign Ideas',
    'integrations': 'Integrations',
    'settings': 'Settings',
  };

  const currentPath = pathMap[currentPage] || currentPage.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const breadcrumbItems = [
    { label: 'Home', page: 'dashboard' }, // Always start with Dashboard as 'Home' for admin
    { label: currentPath, page: currentPage },
  ];

  if (currentPage === 'dashboard') {
    breadcrumbItems.pop(); // Remove "Dashboard > Dashboard" redundancy
  }

  return (
    <nav className="flex items-center text-sm" aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.page}>
          <Button
            as="a"
            variant="link"
            size="sm"
            onClick={() => setPage(item.page)}
            className={`text-gray-600 dark:text-gray-400 p-0 h-auto ${index === breadcrumbItems.length - 1 ? 'font-semibold text-gray-900 dark:text-gray-100' : ''}`}
          >
            {item.label}
          </Button>
          {index < breadcrumbItems.length - 1 && (
            <ChevronRight className="h-4 w-4 text-gray-400 mx-1.5" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// --- Campaigns Page ---
const CampaignsPage = ({ showToast }) => {
  const [campaigns, setCampaigns] = useState([
    { id: 'c001', name: 'Summer Sales Blast', status: 'Active', startDate: '2024-06-01', endDate: '2024-06-30', channels: ['Email', 'Social Media'], budget: 1500 },
    { id: 'c002', name: 'New Product Launch', status: 'Pending', startDate: '2024-07-10', endDate: '2024-07-25', channels: ['PPC', 'Landing Page'], budget: 2500 },
    { id: 'c003', name: 'Holiday Special', status: 'Completed', startDate: '2023-12-01', endDate: '2023-12-31', channels: ['Email', 'Social Media', 'PPC'], budget: 3000 },
    { id: 'c004', name: 'Spring Collection', status: 'Archived', startDate: '2024-03-01', endDate: '2024-03-31', channels: ['Social Media'], budget: 800 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState(null); // For editing
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('startDate');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.channels.some(channel => channel.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleCreateNew = () => {
    setCurrentCampaign(null); // Clear for new creation
    setIsModalOpen(true);
  };

  const handleEditCampaign = (campaign) => {
    setCurrentCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleDeleteCampaign = (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
      showToast({ message: 'Campaign deleted successfully!', type: 'success' });
    }
  };

  const handleSaveCampaign = (campaignData) => {
    if (currentCampaign) {
      // Edit existing
      setCampaigns(prev => prev.map(c => c.id === campaignData.id ? campaignData : c));
      showToast({ message: 'Campaign updated successfully!', type: 'success' });
    } else {
      // Add new
      const newId = `c${String(campaigns.length + 1).padStart(3, '0')}`;
      setCampaigns(prev => [...prev, { ...campaignData, id: newId }]);
      showToast({ message: 'Campaign created successfully!', type: 'success' });
    }
    setIsModalOpen(false);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-64px)] transition-colors duration-300">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1 flex items-center">
          <Rocket className="h-8 w-8 text-gray-900 dark:text-gray-100 mr-2" /> Campaign Management
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Oversee all your marketing campaigns.
        </p>
      </header>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-5 md:p-6 border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <Input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3"
          />
          <Button onClick={handleCreateNew} className="w-full md:w-auto">
            <Plus className="h-5 w-5 mr-2" /> Create New Campaign
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer dark:text-gray-400"
                  onClick={() => handleSort('name')}
                >
                  Campaign Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer dark:text-gray-400"
                  onClick={() => handleSort('status')}
                >
                  Status {sortBy === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer dark:text-gray-400"
                  onClick={() => handleSort('startDate')}
                >
                  Start Date {sortBy === 'startDate' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer dark:text-gray-400"
                  onClick={() => handleSort('endDate')}
                >
                  End Date {sortBy === 'endDate' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Channels
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer dark:text-gray-400"
                  onClick={() => handleSort('budget')}
                >
                  Budget {sortBy === 'budget' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
              {filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-4 whitespace-nowrap text-center text-gray-500 dark:text-gray-400">
                    No campaigns found.
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{campaign.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${campaign.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                           campaign.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                           campaign.status === 'Completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                           'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{campaign.startDate}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{campaign.endDate}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{campaign.channels.join(', ')}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">${campaign.budget.toLocaleString()}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditCampaign(campaign)} aria-label="Edit campaign">
                          <Edit className="h-4 w-4 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteCampaign(campaign.id)} aria-label="Delete campaign">
                          <Trash2 className="h-4 w-4 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CampaignForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCampaign}
        initialData={currentCampaign}
      />
    </div>
  );
};

// --- Campaign Form Modal ---
const CampaignForm = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Pending');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [channels, setChannels] = useState([]);
  const [budget, setBudget] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setStatus(initialData.status);
      setStartDate(initialData.startDate);
      setEndDate(initialData.endDate);
      setChannels(initialData.channels);
      setBudget(initialData.budget);
    } else {
      setName('');
      setStatus('Pending');
      setStartDate('');
      setEndDate('');
      setChannels([]);
      setBudget('');
    }
  }, [initialData, isOpen]); // Reset form when modal opens or initialData changes

  const handleChannelChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setChannels(prev => [...prev, value]);
    } else {
      setChannels(prev => prev.filter(channel => channel !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !startDate || !endDate || channels.length === 0 || budget === '') {
      alert('Please fill all required fields.'); // Using alert for simplicity, replace with toast if needed
      return;
    }
    const campaignData = {
      id: initialData ? initialData.id : null, // Preserve ID for edits
      name,
      status,
      startDate,
      endDate,
      channels,
      budget: parseFloat(budget),
    };
    onSave(campaignData);
  };

  const channelOptions = ['Email', 'Social Media', 'PPC', 'Landing Page', 'SMS'];
  const statusOptions = ['Active', 'Pending', 'Completed', 'Archived'];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Campaign' : 'Create New Campaign'}>
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-900 dark:text-gray-100">
        <div>
          <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Campaign Name</label>
          <Input id="campaignName" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            required
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
            <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
            <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </div>
        </div>
        <div>
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Channels</span>
          <div className="flex flex-wrap gap-3">
            {channelOptions.map(channel => (
              <label key={channel} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={channel}
                  checked={channels.includes(channel)}
                  onChange={handleChannelChange}
                  className="form-checkbox h-5 w-5 text-gray-900 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
                <span className="ml-2 text-gray-800 dark:text-gray-200">{channel}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Budget ($)</label>
          <Input id="budget" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} required min="0" step="any" />
        </div>
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
          <Button type="submit">Save Campaign</Button>
        </div>
      </form>
    </Modal>
  );
};

// --- Integrations Page ---
const IntegrationsPage = ({ showToast }) => {
  const [integrations, setIntegrations] = useState([
    { id: 'int001', name: 'Mailchimp', icon: Mail, status: true, description: 'Email marketing platform.' },
    { id: 'int002', name: 'Google Ads', icon: DollarSign, status: true, description: 'Paid search advertising.' },
    { id: 'int003', name: 'Facebook Ads', icon: Facebook, status: false, description: 'Social media advertising.' },
    { id: 'int004', name: 'Salesforce', icon: Briefcase, status: false, description: 'Customer relationship management.' },
    { id: 'int005', name: 'Slack', icon: MessageSquare, status: true, description: 'Team communication.' },
  ]);

  const handleToggleConnection = (id) => {
    setIntegrations(prev =>
      prev.map(integration => {
        if (integration.id === id) {
          const newStatus = !integration.status;
          showToast({
            message: `${integration.name} ${newStatus ? 'connected' : 'disconnected'}!`,
            type: newStatus ? 'success' : 'info'
          });
          return { ...integration, status: newStatus };
        }
        return integration;
      })
    );
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-64px)] transition-colors duration-300">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1 flex items-center">
          <Package className="h-8 w-8 text-gray-900 dark:text-gray-100 mr-2" /> Integrations
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Connect your favorite marketing tools and platforms.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map(integration => (
          <div key={integration.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-4 space-x-4">
              <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700">
                <integration.icon className="h-7 w-7 text-gray-600 dark:text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{integration.name}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">{integration.description}</p>
            <div className="flex justify-between items-center mt-auto">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                integration.status
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {integration.status ? 'Connected' : 'Disconnected'}
              </span>
              <Button
                variant={integration.status ? 'outline' : 'default'}
                size="sm"
                onClick={() => handleToggleConnection(integration.id)}
              >
                {integration.status ? <Unlink className="h-4 w-4 mr-2" /> : <Link className="h-4 w-4 mr-2" />}
                {integration.status ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Settings Page ---
const SettingsPage = ({ showToast }) => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [apiKey, setApiKey] = useState('sk-mock-apikey-12345'); // Mock API Key

  const handleProfileSave = (e) => {
    e.preventDefault();
    // Simulate save
    showToast({ message: 'Profile updated successfully!', type: 'success' });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      showToast({ message: 'New passwords do not match.', type: 'error' });
      return;
    }
    if (newPassword.length < 6) {
      showToast({ message: 'New password must be at least 6 characters.', type: 'error' });
      return;
    }
    // Simulate password change
    showToast({ message: 'Password changed successfully!', type: 'success' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleGenerateApiKey = () => {
    const newKey = `sk-new-apikey-${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    showToast({ message: 'New API Key generated!', type: 'success' });
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-64px)] transition-colors duration-300">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1 flex items-center">
          <Settings className="h-8 w-8 text-gray-900 dark:text-gray-100 mr-2" /> Settings
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Manage your account preferences and settings.
        </p>
      </header>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-5 md:p-6 border border-gray-100 dark:border-gray-800 space-y-8">
        {/* Profile Settings */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" /> Profile Settings
          </h2>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <Input id="userName" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <Input id="userEmail" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <Button type="submit"><Save className="h-4 w-4 mr-2" /> Save Profile</Button>
          </form>
        </div>

        {/* Security Settings */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Lock className="h-5 w-5 mr-2" /> Security
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
              <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
              <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
              <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
            </div>
            <Button type="submit"><Save className="h-4 w-4 mr-2" /> Change Password</Button>
          </form>
        </div>

        {/* Notifications */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2" /> Notifications
          </h2>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => {
                setNotificationsEnabled(e.target.checked);
                showToast({ message: `Notifications ${e.target.checked ? 'enabled' : 'disabled'}.`, type: 'info' });
              }}
              className="form-checkbox h-5 w-5 text-gray-900 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
            <span className="text-gray-800 dark:text-gray-200">Enable email notifications for campaign updates.</span>
          </label>
        </div>

        {/* API Keys */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Key className="h-5 w-5 mr-2" /> API Keys
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your API Key</label>
              <Input id="apiKey" type="text" value={apiKey} readOnly className="font-mono bg-gray-100 dark:bg-gray-700 cursor-not-allowed" />
            </div>
            <Button onClick={handleGenerateApiKey} type="button">
              Generate New API Key
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Note: Generating a new API key will invalidate the old one.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


// Admin Layout
const AdminLayout = ({ children, setPage, currentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile sidebar
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // For desktop collapse
  const { isDarkMode } = useContext(ThemeContext);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
    { name: 'Campaigns', icon: Rocket, page: 'campaigns' },
    { name: 'Campaign Insights', icon: TrendingDown, page: 'campaign-performance' },
    { name: 'Content Studio', icon: Palette, page: 'content-studio' },
    { name: 'Campaign Ideas', icon: Lightbulb, page: 'campaign-ideas' },
    { name: 'Integrations', icon: Package, page: 'integrations' },
  ];

  const sidebarWidthClass = isSidebarCollapsed ? 'w-20' : 'w-64';
  const sidebarPaddingClass = isSidebarCollapsed ? 'px-2' : 'px-3'; // Adjusted from px-4 to px-3
  const contentMlClass = isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'; // Adjusted for desktop

  // Effect to handle initial mobile sidebar state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setSidebarOpen(false); // Close mobile sidebar on desktop view
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 font-inter transition-colors duration-300">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-900 shadow-xl border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarWidthClass} md:translate-x-0 md:relative group`}>
        {/* Logo/Header */}
        <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center py-4' : 'justify-start px-5 py-4'} h-16 bg-gray-900 dark:bg-gray-950 text-white font-bold text-2xl transition-all duration-300 ease-in-out`}> {/* Reduced px-6 to px-5 */}
          <Sparkles className={`h-8 w-8 text-white ${isSidebarCollapsed ? '' : 'mr-3'}`} />
          {!isSidebarCollapsed && <span className="whitespace-nowrap overflow-hidden">AI Marketer</span>}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto pt-4 pb-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              onClick={() => { setPage(item.page); setSidebarOpen(false); }}
              className={`flex items-center w-full justify-start py-2.5 rounded-lg text-base font-medium whitespace-nowrap overflow-hidden relative group
                ${sidebarPaddingClass}
                ${currentPage === item.page
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className={`ml-3 ${isSidebarCollapsed ? 'md:hidden' : 'md:block'}`}>
                {item.name}
              </span>
              {isSidebarCollapsed && (
                <span className="absolute left-full ml-3 px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {item.name}
                </span>
              )}
            </Button>
          ))}
        </nav>

        {/* User and Logout Section */}
        <div className={`p-4 border-t border-gray-200 dark:border-gray-800 ${sidebarPaddingClass} flex flex-col transition-all duration-300 ease-in-out`}>
          <Button
            variant="ghost"
            onClick={() => { setPage('settings'); setSidebarOpen(false); }}
            className={`flex items-center w-full justify-start py-2.5 rounded-lg text-base font-medium whitespace-nowrap overflow-hidden relative group mb-2
              ${isSidebarCollapsed ? 'px-2' : 'px-3'}`}
          >
            <Settings className="h-5 w-5 shrink-0" />
            <span className={`ml-3 ${isSidebarCollapsed ? 'md:hidden' : 'md:block'}`}>
              Settings
            </span>
            {isSidebarCollapsed && (
                <span className="absolute left-full ml-3 px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  Settings
                </span>
              )}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setPage('landing')}
            className={`flex items-center w-full justify-start py-2.5 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950 whitespace-nowrap overflow-hidden relative group
              ${isSidebarCollapsed ? 'px-2' : 'px-3'}`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className={`ml-3 ${isSidebarCollapsed ? 'md:hidden' : 'md:block'}`}>
              Logout
            </span>
            {isSidebarCollapsed && (
                <span className="absolute left-full ml-3 px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  Logout
                </span>
              )}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col ${contentMlClass} transition-all duration-300 ease-in-out`}>
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-900 shadow-sm flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
          {/* Mobile Menu Toggle & Desktop Collapse Toggle */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2"
              aria-label="Toggle mobile sidebar"
            >
              {sidebarOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M18 6L6 18M6 6L18 18"/></svg> : <Menu className="h-6 w-6" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden md:flex p-2"
              aria-label="Toggle sidebar collapse"
            >
              {isSidebarCollapsed ? <ChevronRight className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <Breadcrumbs currentPage={currentPage} setPage={setPage} />
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggleButton />
            <div className="relative group">
              <img
                className="h-9 w-9 rounded-full cursor-pointer border-2 border-gray-300 dark:border-gray-700"
                src="https://placehold.co/100x100/A78BFA/FFFFFF?text=JD"
                alt="User Avatar"
              />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 mt-10 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                John Doe
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const AppToastContext = createContext();

// --- Main App Component ---
const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toast, setToast] = useState(null); // { message: '', type: '' }

  const showToast = (toastConfig) => {
    setToast(toastConfig);
  };

  const clearToast = () => {
    setToast(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('auth_token', 'mock_token_123');
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage setPage={setCurrentPage} />;
      case 'login':
        return <AuthPage type="login" setPage={setCurrentPage} onAuthSuccess={handleAuthSuccess} />;
      case 'register':
        return <AuthPage type="register" setPage={setCurrentPage} onAuthSuccess={handleAuthSuccess} />;
      case 'dashboard':
        return (
          <AdminLayout setPage={setCurrentPage} currentPage={currentPage}>
            <AdminDashboard />
          </AdminLayout>
        );
      case 'content-studio':
        return (
          <AdminLayout setPage={setCurrentPage} currentPage={currentPage}>
            <ContentStudio />
          </AdminLayout>
        );
      case 'campaign-ideas':
        return (
          <AdminLayout setPage={setCurrentPage} currentPage={currentPage}>
            <CampaignIdeas />
          </AdminLayout>
        );
      case 'campaign-performance': // New case for Campaign Performance
        return (
          <AdminLayout setPage={setCurrentPage} currentPage={currentPage}>
            <CampaignPerformance />
          </AdminLayout>
        );
      case 'campaigns':
        return (
          <AdminLayout setPage={setCurrentPage} currentPage={currentPage}>
            <CampaignsPage showToast={showToast} />
          </AdminLayout>
        );
      case 'integrations':
        return (
          <AdminLayout setPage={setCurrentPage} currentPage={currentPage}>
            <IntegrationsPage showToast={showToast} />
          </AdminLayout>
        );
      case 'settings':
        return (
          <AdminLayout setPage={setCurrentPage} currentPage={currentPage}>
            <SettingsPage showToast={showToast} />
          </AdminLayout>
        );
      default:
        return <LandingPage setPage={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <AppToastContext.Provider value={{ showToast }}>
        {renderPage()}
        {toast && <Toast message={toast.message} type={toast.type} onClose={clearToast} />}
      </AppToastContext.Provider>
    </ThemeProvider>
  );
};

export default App;
