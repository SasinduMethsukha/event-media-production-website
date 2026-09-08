import { companyInfo, capabilities, services, journeySteps, featuredProjects, portfolioItems, testimonials, clientLogos, whyChooseUsPillars } from './data/eventsData.js';

const { useState, useEffect, useRef } = React;

export default function App() {
  // Navigation & Scroll State
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Modals & Views
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [lightboxMedia, setLightboxMedia] = useState(null);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [quotePreselectedService, setQuotePreselectedService] = useState("");

  // Portfolio Filter State
  const [portfolioCategory, setPortfolioCategory] = useState("ALL");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    eventType: "Corporate Event",
    eventDate: "",
    location: "",
    audience: "",
    services: [],
    budget: "LKR 500,000 - 1,000,000",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Timecode Ticker State for Hero HUD
  const [timecode, setTimecode] = useState("00:14:28:19");

  // Scroll listener for sticky transparent-to-dark navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timecode generator simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const frames = String(Math.floor(Math.random() * 30)).padStart(2, '0');
      setTimecode(`${hrs}:${mins}:${secs}:${frames}`);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Icon Helper Function
  const renderIcon = (name, className = "w-5 h-5") => {
    return <i data-lucide={name.toLowerCase()} class={className}></i>;
  };

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // Filtered Portfolio Logic
  const filteredPortfolio = portfolioCategory === "ALL" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === portfolioCategory);

  // Form Checkbox Handler
  const handleServiceCheckbox = (serviceTitle) => {
    setFormData(prev => {
      const exists = prev.services.includes(serviceTitle);
      if (exists) {
        return { ...prev, services: prev.services.filter(s => s !== serviceTitle) };
      } else {
        return { ...prev, services: [...prev.services, serviceTitle] };
      }
    });
  };

  // Form Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // Clear form after 4 seconds
      setFormSubmitted(false);
      setFormData({
        name: "", company: "", phone: "", email: "", eventType: "Corporate Event",
        eventDate: "", location: "", audience: "", services: [], budget: "LKR 500,000 - 1,000,000", message: ""
      });
    }, 4000);
  };

  // Scroll to section helper
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open Quote with Preselected Service
  const triggerServiceQuote = (serviceTitle) => {
    if (!formData.services.includes(serviceTitle)) {
      setFormData(prev => ({ ...prev, services: [...prev.services, serviceTitle] }));
    }
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-brand-black text-slate-100 relative font-sans">

      {/* ------------------------------------------------------------- */}
      {/* GLOBAL NAVBAR */}
      {/* ------------------------------------------------------------- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-brand-black/90 backdrop-blur-md border-b border-brand-red/20 py-3 shadow-2xl shadow-black/80' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-red flex items-center justify-center font-syne font-bold text-white tracking-tighter text-xl rounded-sm group-hover:scale-105 transition-transform border border-red-500/40 shadow-lg shadow-brand-red/30">
              EMP
            </div>
            <div className="flex flex-col">
              <span className="font-syne font-extrabold text-sm sm:text-base tracking-wider text-white leading-tight group-hover:text-brand-red transition-colors">
                EVENT MEDIA PRODUCTION
              </span>
              <span className="text-[10px] font-tech text-brand-grey tracking-widest uppercase">
                SRI LANKA
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-7 text-xs font-tech tracking-wider uppercase">
            <button onClick={() => scrollToSection('home')} className="hover:text-brand-red transition-colors py-1 relative group">
              HOME
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-brand-red transition-colors py-1 relative group">
              ABOUT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('services')} className="hover:text-brand-red transition-colors py-1 relative group">
              SERVICES
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('journey')} className="hover:text-brand-red transition-colors py-1 relative group">
              PROCESS
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('productions')} className="hover:text-brand-red transition-colors py-1 relative group">
              PRODUCTIONS
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('live-production')} className="hover:text-brand-red transition-colors py-1 relative group text-brand-red font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-rec inline-block"></span>
              LIVE PRODUCTION
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-brand-red transition-colors py-1 relative group">
              PORTFOLIO
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-brand-red transition-colors py-1 relative group">
              CONTACT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full"></span>
            </button>
          </div>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-brand-red hover:bg-red-700 text-white font-tech text-xs tracking-wider uppercase px-5 py-2.5 rounded-sm transition-all shadow-lg shadow-brand-red/25 hover:shadow-brand-red/40 hover:-translate-y-0.5 border border-red-500/50 flex items-center gap-2"
            >
              GET A QUOTE
              <i data-lucide="arrow-right" className="w-3.5 h-3.5"></i>
            </button>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="lg:hidden flex items-center gap-3">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-brand-red text-white text-[11px] font-tech tracking-wider uppercase px-3 py-1.5 rounded-sm"
            >
              QUOTE
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation"
            >
              <i data-lucide={mobileMenuOpen ? "x" : "menu"} className="w-7 h-7 text-white"></i>
            </button>
          </div>

        </div>
      </nav>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-black/95 backdrop-blur-xl flex flex-col justify-between p-6 pt-24 lg:hidden border-b border-brand-red/30 animate-fadeIn">
          <div className="flex flex-col space-y-5 font-syne font-bold text-xl uppercase tracking-wider">
            <button onClick={() => scrollToSection('home')} className="text-left text-white hover:text-brand-red py-2 border-b border-white/10">HOME</button>
            <button onClick={() => scrollToSection('about')} className="text-left text-white hover:text-brand-red py-2 border-b border-white/10">ABOUT US</button>
            <button onClick={() => scrollToSection('services')} className="text-left text-white hover:text-brand-red py-2 border-b border-white/10">SERVICES</button>
            <button onClick={() => scrollToSection('journey')} className="text-left text-white hover:text-brand-red py-2 border-b border-white/10">THE PROCESS</button>
            <button onClick={() => scrollToSection('productions')} className="text-left text-white hover:text-brand-red py-2 border-b border-white/10">PRODUCTIONS</button>
            <button onClick={() => scrollToSection('live-production')} className="text-left text-brand-red py-2 border-b border-white/10 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-rec"></span>
              LIVE PRODUCTION
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="text-left text-white hover:text-brand-red py-2 border-b border-white/10">PORTFOLIO</button>
            <button onClick={() => scrollToSection('contact')} className="text-left text-white hover:text-brand-red py-2 border-b border-white/10">CONTACT & QUOTE</button>
          </div>

          <div className="flex flex-col space-y-4 pt-6">
            <a 
              href={`https://wa.me/${companyInfo.whatsappPhone}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-tech text-sm tracking-wider uppercase py-3 rounded text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <i data-lucide="message-square" className="w-4 h-4"></i>
              WhatsApp Instant Inquiry
            </a>
            <p className="text-xs font-tech text-brand-grey text-center">
              SRI LANKA | {companyInfo.phone}
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-brand-black scanlines">
        
        {/* Ambient Dark Background & Cinematic Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 transition-transform duration-1000" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=2000&q=80')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/75 to-brand-black/90"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-30"></div>

        {/* Dynamic Technical HUD Overlay Graphics */}
        <div className="absolute inset-0 pointer-events-none p-6 md:p-12 flex flex-col justify-between text-[11px] font-tech text-brand-grey/60">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-rec inline-block"></span>
              <span className="text-white font-bold tracking-widest">LIVE STREAM: 4K 60FPS</span>
              <span className="hidden sm:inline border-l border-white/20 pl-3">CAM 01 // MAIN STAGE</span>
            </div>
            <div className="text-right tracking-widest text-brand-red font-bold">
              TIMECODE: <span className="text-white">{timecode}</span>
            </div>
          </div>

          {/* Screen Focus Markers */}
          <div className="hidden md:flex justify-between items-center opacity-40">
            <div className="border-l-2 border-t-2 border-brand-red w-8 h-8"></div>
            <div className="border-r-2 border-t-2 border-brand-red w-8 h-8"></div>
          </div>

          <div className="flex justify-between items-end">
            <div className="hidden sm:block text-slate-400 font-tech tracking-widest">
              SYS STATUS: <span className="text-emerald-400">100% OPERATIONAL</span>
            </div>
            <div className="hidden md:flex justify-between items-center opacity-40">
              <div className="border-l-2 border-b-2 border-brand-red w-8 h-8"></div>
              <div className="border-r-2 border-b-2 border-brand-red w-8 h-8"></div>
            </div>
            <div className="tracking-widest">
              COLOMBO // SRI LANKA
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-5xl mx-auto px-4 text-center z-10 space-y-8 my-auto">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-dark/90 border border-brand-red/40 px-4 py-1.5 rounded-full shadow-lg shadow-brand-red/10">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-ping"></span>
            <span className="text-xs font-tech tracking-widest text-white uppercase font-bold">
              {companyInfo.tagline}
            </span>
          </div>

          {/* Main Objective Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-syne font-extrabold text-white tracking-tight leading-[1.05] uppercase">
            WE DON'T JUST CAPTURE EVENTS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-500 to-red-600 drop-shadow-[0_0_25px_rgba(229,9,20,0.4)]">
              WE PRODUCE THEM.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-sans font-normal leading-relaxed">
            {companyInfo.subtext}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => scrollToSection('productions')}
              className="w-full sm:w-auto bg-brand-red hover:bg-red-700 text-white font-tech font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-sm transition-all shadow-xl shadow-brand-red/30 hover:shadow-brand-red/50 hover:-translate-y-0.5 border border-red-500/50 flex items-center justify-center gap-3 group"
            >
              EXPLORE OUR WORK
              <i data-lucide="arrow-right" className="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
            </button>

            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto bg-brand-card/90 hover:bg-slate-800 text-white font-tech font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-sm transition-all border border-slate-700 hover:border-brand-red/60 flex items-center justify-center gap-3"
            >
              <i data-lucide="file-text" className="w-4 h-4 text-brand-red"></i>
              GET A QUOTE
            </button>
          </div>

        </div>

        {/* Animated Scroll Down Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => scrollToSection('capabilities')}>
          <span className="text-[10px] font-tech text-brand-grey tracking-widest uppercase">SCROLL TO DISCOVER</span>
          <div className="w-5 h-9 rounded-full border-2 border-slate-500 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-brand-red rounded-full animate-bounce"></div>
          </div>
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* QUICK CAPABILITIES STRIP */}
      {/* ------------------------------------------------------------- */}
      <section id="capabilities" className="bg-brand-red text-white py-4 overflow-hidden border-y border-red-500/40 shadow-inner">
        <div className="animate-marquee flex items-center whitespace-nowrap font-tech text-sm sm:text-base font-bold tracking-widest uppercase">
          {capabilities.concat(capabilities).map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 mx-4">
              <span>{item}</span>
              <span className="w-2 h-2 rounded-full bg-white/60"></span>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* ABOUT SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="about" className="py-24 bg-brand-black relative border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-sm overflow-hidden border border-slate-800 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80" 
                  alt="Behind the Scenes Event Production Sri Lanka" 
                  className="w-full h-[450px] object-cover filter contrast-110 grayscale-[0.2] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent"></div>

                {/* HUD Tag Overlay */}
                <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md px-3 py-1.5 border border-brand-red/30 rounded-sm text-xs font-tech tracking-wider text-white">
                  PRODUCTION CREW // ON SITE
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-brand-dark/90 backdrop-blur-md border border-white/10 rounded-sm">
                  <p className="text-xs font-tech text-brand-red font-bold uppercase tracking-wider mb-1">
                    TECHNICAL INFRASTRUCTURE & MEDIA
                  </p>
                  <p className="text-sm text-slate-200">
                    Engineered stage rigging, concert line arrays, and broadcast switching handled under one operational roof in Sri Lanka.
                  </p>
                </div>
              </div>

              {/* Accent Glowing Frame */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 h-48 border-r-2 border-b-2 border-brand-red/60 pointer-events-none"></div>
            </div>

            {/* Right Copy & Statistics Column */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 text-brand-red text-xs font-tech tracking-widest uppercase font-semibold">
                <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
                ABOUT EVENT MEDIA PRODUCTION
              </div>

              <h2 className="text-3xl sm:text-5xl font-syne font-extrabold text-white tracking-tight uppercase leading-tight">
                BEHIND EVERY GREAT EVENT IS <span className="text-brand-red">GREAT PRODUCTION.</span>
              </h2>

              <p className="text-slate-300 font-sans text-base leading-relaxed">
                <strong className="text-white">EVENT MEDIA PRODUCTION (PVT) LTD</strong> combines full-scale event production, technical audio-visual infrastructure, and cinematic media coverage under one master command.
              </p>

              <p className="text-slate-400 font-sans text-sm leading-relaxed">
                Whether executing massive stadium concerts, high-stakes international corporate summits, or live broadcast state award ceremonies across Sri Lanka, we eliminate the friction between event managers and media crews. From spatial planning and 3-phase power distribution to 4K live streaming and press photo delivery, we deliver total execution confidence.
              </p>

              {/* Animated Statistics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {companyInfo.stats.map((stat, idx) => (
                  <div key={idx} className="bg-brand-card p-4 rounded-sm border border-slate-800/80 hover:border-brand-red/40 transition-colors">
                    <div className="text-3xl sm:text-4xl font-syne font-extrabold text-white mb-1 flex items-baseline">
                      <span className="text-brand-red">{stat.prefix}</span>
                      <span>{stat.value}</span>
                      <span className="text-brand-red text-2xl">{stat.suffix}</span>
                    </div>
                    <div className="text-xs font-tech text-brand-grey tracking-wider uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SERVICES SECTION (9 SERVICES) */}
      {/* ------------------------------------------------------------- */}
      <section id="services" className="py-24 bg-brand-dark relative border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-tech tracking-widest uppercase font-semibold">
              <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
              COMPLETE TECHNICAL SOLUTIONS
              <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-syne font-extrabold text-white tracking-tight uppercase">
              EVERYTHING YOUR EVENT NEEDS.
            </h2>
            <p className="text-slate-400 font-sans text-base">
              Comprehensive event production hardware and professional media coverage under one Sri Lanka crew.
            </p>
          </div>

          {/* 9 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv) => (
              <div 
                key={srv.id}
                className="bg-brand-card border border-slate-800 rounded-sm overflow-hidden hover:border-brand-red/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-brand-red/10"
              >
                <div>
                  {/* Service Card Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={srv.image} 
                      alt={srv.title} 
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-brand-black/90 text-brand-red font-tech font-bold text-xs px-2.5 py-1 rounded-sm border border-brand-red/30">
                      SERVICE {srv.id}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-syne font-bold text-white tracking-wide group-hover:text-brand-red transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-slate-300 text-xs font-sans leading-relaxed">
                      {srv.shortDesc}
                    </p>

                    <ul className="pt-2 space-y-1.5 text-[11px] font-tech text-slate-400 border-t border-slate-800/80">
                      {srv.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-red"></span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0">
                  <button 
                    onClick={() => triggerServiceQuote(srv.title)}
                    className="w-full bg-slate-900 hover:bg-brand-red text-slate-300 hover:text-white font-tech text-xs tracking-wider uppercase py-2.5 rounded-sm border border-slate-700 hover:border-brand-red transition-colors flex items-center justify-center gap-2"
                  >
                    REQUEST SERVICE QUOTE
                    <i data-lucide="chevron-right" className="w-3.5 h-3.5"></i>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* PRODUCTION EXPERIENCE / JOURNEY ("FROM EMPTY VENUE TO LIVE EXPERIENCE") */}
      {/* ------------------------------------------------------------- */}
      <section id="journey" className="py-24 bg-brand-black relative border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-tech tracking-widest uppercase font-semibold">
              <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
              OUR STEP-BY-STEP PRODUCTION ENGINE
              <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-syne font-extrabold text-white tracking-tight uppercase">
              FROM EMPTY VENUE TO LIVE EXPERIENCE
            </h2>
            <p className="text-slate-400 font-sans text-base">
              The exact technical methodology we use to transform blank spaces into world-class event productions.
            </p>
          </div>

          {/* Vertical Timeline with Illuminated Line */}
          <div className="relative">
            
            {/* Center Vertical Red Illuminated Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-slate-800 -translate-x-1/2">
              <div className="w-full h-full bg-gradient-to-b from-brand-red via-red-600 to-brand-red shadow-[0_0_15px_rgba(229,9,20,0.8)]"></div>
            </div>

            <div className="space-y-12 lg:space-y-16">
              {journeySteps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={step.step} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
                    
                    {/* Content Box */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:text-right lg:order-1' : 'lg:order-3'}`}>
                      <div className="bg-brand-card p-6 rounded-sm border border-slate-800 hover:border-brand-red/40 transition-colors shadow-lg">
                        <span className="text-xs font-tech text-brand-red font-bold tracking-widest uppercase mb-1 block">
                          STAGE {step.step} // {step.subtitle}
                        </span>
                        <h3 className="text-2xl font-syne font-bold text-white mb-2 uppercase">
                          {step.title}
                        </h3>
                        <p className="text-slate-300 text-sm font-sans leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Center Node Badge */}
                    <div className="hidden lg:flex lg:col-span-2 justify-center items-center lg:order-2 z-10">
                      <div className="w-12 h-12 rounded-full bg-brand-black border-2 border-brand-red text-white font-syne font-bold text-sm flex items-center justify-center shadow-lg shadow-brand-red/40">
                        {step.step}
                      </div>
                    </div>

                    {/* Step Image */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-3' : 'lg:order-1'}`}>
                      <div className="relative h-56 rounded-sm overflow-hidden border border-slate-800 group">
                        <img 
                          src={step.image} 
                          alt={step.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-brand-black/30 group-hover:bg-transparent transition-colors"></div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FEATURED PRODUCTIONS SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="productions" className="py-24 bg-brand-dark relative border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-brand-red text-xs font-tech tracking-widest uppercase font-semibold">
                <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
                MAJOR EVENT CASE STUDIES
              </div>
              <h2 className="text-3xl sm:text-5xl font-syne font-extrabold text-white tracking-tight uppercase">
                SELECTED PRODUCTIONS
              </h2>
            </div>
            <p className="text-slate-400 font-sans text-sm max-w-md">
              Explore how we executed complex audio, lighting, LED visuals, and live multicam feeds for landmark events in Sri Lanka.
            </p>
          </div>

          {/* Cinematic Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((proj) => (
              <div 
                key={proj.id}
                onClick={() => setActiveCaseStudy(proj)}
                className="group cursor-pointer bg-brand-card border border-slate-800 rounded-sm overflow-hidden hover:border-brand-red/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-xl hover:shadow-brand-red/20"
              >
                <div>
                  {/* Hero Cover Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={proj.coverImage} 
                      alt={proj.title} 
                      className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-black/20 to-transparent"></div>
                    
                    {/* Category Tag */}
                    <span className="absolute top-4 left-4 bg-brand-black/90 text-white font-tech text-xs font-bold px-3 py-1 rounded-sm border border-white/20">
                      {proj.category}
                    </span>

                    {/* Location Badge */}
                    <span className="absolute bottom-4 left-4 text-xs font-tech text-slate-300 flex items-center gap-1.5">
                      <i data-lucide="map-pin" className="w-3.5 h-3.5 text-brand-red"></i>
                      {proj.location}
                    </span>
                  </div>

                  {/* Info Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-center text-xs font-tech text-brand-grey">
                      <span>{proj.client}</span>
                      <span className="text-brand-red">{proj.year}</span>
                    </div>

                    <h3 className="text-xl font-syne font-bold text-white group-hover:text-brand-red transition-colors leading-tight">
                      {proj.title}
                    </h3>

                    <p className="text-slate-300 text-xs font-sans line-clamp-2">
                      {proj.shortDesc}
                    </p>

                    {/* Services Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.servicesProvided.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="bg-slate-900 text-slate-400 text-[10px] font-tech px-2 py-0.5 rounded-sm border border-slate-800">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="p-6 pt-0">
                  <div className="w-full pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-tech text-brand-red font-bold group-hover:translate-x-1 transition-transform">
                    <span>VIEW FULL CASE STUDY</span>
                    <i data-lucide="arrow-right" className="w-4 h-4"></i>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* CASE STUDY DEDICATED VIEW / MODAL */}
      {/* ------------------------------------------------------------- */}
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-black/95 backdrop-blur-xl p-4 sm:p-8 animate-fadeIn">
          <div className="max-w-5xl mx-auto bg-brand-card border border-brand-red/40 rounded-sm overflow-hidden shadow-2xl my-8 relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveCaseStudy(null)}
              className="absolute top-6 right-6 z-20 bg-brand-black/80 text-white p-3 rounded-full border border-white/20 hover:border-brand-red hover:text-brand-red transition-colors"
            >
              <i data-lucide="x" className="w-6 h-6"></i>
            </button>

            {/* Case Study Hero */}
            <div className="relative h-80 sm:h-96">
              <img 
                src={activeCaseStudy.coverImage} 
                alt={activeCaseStudy.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/60 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="inline-block bg-brand-red text-white text-xs font-tech px-3 py-1 rounded-sm uppercase font-bold">
                  {activeCaseStudy.category} CASE STUDY
                </div>
                <h2 className="text-2xl sm:text-4xl font-syne font-extrabold text-white uppercase">
                  {activeCaseStudy.title}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm font-tech">
                  {activeCaseStudy.location} • {activeCaseStudy.year}
                </p>
              </div>
            </div>

            {/* Case Study Metrics Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-brand-black/80 border-y border-slate-800 font-tech text-xs">
              <div>
                <span className="text-brand-grey block">CLIENT</span>
                <span className="text-white font-bold">{activeCaseStudy.client}</span>
              </div>
              <div>
                <span className="text-brand-grey block">LOCATION</span>
                <span className="text-white font-bold">{activeCaseStudy.location}</span>
              </div>
              <div>
                <span className="text-brand-grey block">ATTENDANCE</span>
                <span className="text-white font-bold">{activeCaseStudy.audience}</span>
              </div>
              <div>
                <span className="text-brand-grey block">EVENT TYPE</span>
                <span className="text-brand-red font-bold">{activeCaseStudy.eventType}</span>
              </div>
            </div>

            {/* Case Study Details Body */}
            <div className="p-6 sm:p-10 space-y-8 font-sans">
              
              {/* Provided Services Badges */}
              <div>
                <h4 className="text-xs font-tech text-brand-red uppercase tracking-wider mb-3">SERVICES PROVIDED ON SITE</h4>
                <div className="flex flex-wrap gap-2">
                  {activeCaseStudy.servicesProvided.map((s, i) => (
                    <span key={i} className="bg-brand-black text-slate-200 border border-slate-700 text-xs px-3 py-1 rounded-sm font-tech">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Narrative Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div className="space-y-2">
                  <h4 className="font-syne font-bold text-white text-base text-brand-red uppercase">THE BRIEF</h4>
                  <p className="text-slate-300">{activeCaseStudy.brief}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-syne font-bold text-white text-base text-brand-red uppercase">OUR APPROACH</h4>
                  <p className="text-slate-300">{activeCaseStudy.approach}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-syne font-bold text-white text-base text-brand-red uppercase">TECHNICAL PRODUCTION</h4>
                  <p className="text-slate-300">{activeCaseStudy.production}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-syne font-bold text-white text-base text-brand-red uppercase">THE RESULT</h4>
                  <p className="text-slate-300">{activeCaseStudy.result}</p>
                </div>
              </div>

              {/* Gallery Grid */}
              {activeCaseStudy.gallery && activeCaseStudy.gallery.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-tech text-slate-400 uppercase tracking-wider">EVENT GALLERY & STAGE VISUALS</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activeCaseStudy.gallery.map((img, i) => (
                      <img 
                        key={i} 
                        src={img} 
                        alt="Project gallery photo" 
                        className="w-full h-32 object-cover rounded-sm border border-slate-800 hover:opacity-90 cursor-pointer"
                        onClick={() => setLightboxMedia({ type: 'image', src: img, title: activeCaseStudy.title })}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Action CTA */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h4 className="font-syne font-bold text-lg text-white">PLANNING A SIMILAR EVENT IN SRI LANKA?</h4>
                  <p className="text-xs font-tech text-brand-grey">Let our technical crew handle your staging, audio, lighting and live media.</p>
                </div>
                <button 
                  onClick={() => {
                    setActiveCaseStudy(null);
                    scrollToSection('contact');
                  }}
                  className="bg-brand-red hover:bg-red-700 text-white font-tech text-xs uppercase tracking-wider px-6 py-3 rounded-sm shadow-lg shadow-brand-red/30 whitespace-nowrap"
                >
                  GET A QUOTE FOR YOUR EVENT
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* HIGH-TECH LIVE PRODUCTION SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="live-production" className="py-24 bg-brand-black relative border-b border-slate-800/60 scanlines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-brand-red text-xs font-tech tracking-widest uppercase font-semibold">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-rec inline-block"></span>
                REAL-TIME BROADCAST ENGINE
              </div>

              <h2 className="text-3xl sm:text-5xl font-syne font-extrabold text-white tracking-tight uppercase leading-none">
                LIVE. MULTI-CAMERA. <br />
                <span className="text-brand-red">REAL TIME.</span>
              </h2>

              <p className="text-slate-300 font-sans text-base leading-relaxed">
                From camera to screen — live. We operate broadcast-grade Blackmagic ATEM production switchers, wired SDI camera networks, wireless tally systems, and real-time lower-third graphics.
              </p>

              <div className="space-y-3 font-tech text-xs text-slate-300">
                <div className="flex items-center gap-3 p-3 bg-brand-card border border-slate-800 rounded-sm">
                  <i data-lucide="video" className="w-4 h-4 text-brand-red"></i>
                  <span>Up to 8 Synchronized 4K Cinema Camera Feeds</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-brand-card border border-slate-800 rounded-sm">
                  <i data-lucide="wifi" className="w-4 h-4 text-brand-red"></i>
                  <span>Zero-Fail 5G Bonded Cellular Internet Stream Rig</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-brand-card border border-slate-800 rounded-sm">
                  <i data-lucide="tv" className="w-4 h-4 text-brand-red"></i>
                  <span>Simultaneous Live Broadcast to Outdoor LED Walls + Web</span>
                </div>
              </div>

              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-brand-red hover:bg-red-700 text-white font-tech font-bold text-xs tracking-wider uppercase px-7 py-3.5 rounded-sm shadow-lg shadow-brand-red/30 transition-all"
              >
                DISCUSS YOUR LIVE PRODUCTION
              </button>
            </div>

            {/* Right Multiview Switcher Console Simulation */}
            <div className="lg:col-span-7 bg-brand-card border border-brand-red/40 rounded-sm p-4 sm:p-6 shadow-2xl relative">
              
              {/* Header Ticker */}
              <div className="flex justify-between items-center text-xs font-tech pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-rec"></span>
                  <span className="text-white font-bold">MULTIVIEW SWITCHER // ACTIVE FEED</span>
                </div>
                <span className="text-brand-red font-mono-tech">PROGRAM: CAM 01 [PGM]</span>
              </div>

              {/* 4-Screen Camera Monitor Simulation */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                
                {/* CAM 1 */}
                <div className="relative h-36 sm:h-44 rounded border border-brand-red overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80" alt="Cam 1" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-brand-red text-white text-[10px] font-tech px-2 py-0.5 font-bold">CAM 1 [PGM]</span>
                  <div className="absolute bottom-2 right-2 text-[9px] font-tech text-white bg-black/70 px-1.5 py-0.5">4K 60fps</div>
                </div>

                {/* CAM 2 */}
                <div className="relative h-36 sm:h-44 rounded border border-slate-800 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80" alt="Cam 2" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-black/80 text-slate-300 text-[10px] font-tech px-2 py-0.5">CAM 2 [PVW]</span>
                </div>

                {/* CAM 3 */}
                <div className="relative h-36 sm:h-44 rounded border border-slate-800 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80" alt="Cam 3 Drone" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-black/80 text-slate-300 text-[10px] font-tech px-2 py-0.5">CAM 3 [DRONE]</span>
                </div>

                {/* CAM 4 */}
                <div className="relative h-36 sm:h-44 rounded border border-slate-800 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80" alt="Cam 4 Control" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-black/80 text-slate-300 text-[10px] font-tech px-2 py-0.5">CAM 4 [CROWD]</span>
                </div>

              </div>

              {/* Audio VU Meters & Switcher Buttons */}
              <div className="flex justify-between items-center text-[10px] font-tech bg-brand-black p-3 rounded border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">AUDIO BUS L/R:</span>
                  <div className="w-24 sm:w-36 h-2 bg-slate-800 rounded overflow-hidden flex">
                    <div className="w-3/4 h-full bg-emerald-500"></div>
                    <div className="w-1/6 h-full bg-amber-500"></div>
                    <div className="w-1/12 h-full bg-brand-red animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-1 bg-brand-red text-white font-bold rounded">CUT</span>
                  <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded">AUTO</span>
                  <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded">FTB</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FILTERABLE PORTFOLIO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="portfolio" className="py-24 bg-brand-dark relative border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-tech tracking-widest uppercase font-semibold">
              <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
              VISUAL REPOSITORY
              <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-syne font-extrabold text-white tracking-tight uppercase">
              PRODUCTION PORTFOLIO
            </h2>
            <p className="text-slate-400 font-sans text-base">
              Explore snapshot captures of our stage builds, line array rigs, and live event moments.
            </p>
          </div>

          {/* Filter Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 font-tech text-xs tracking-wider uppercase">
            {["ALL", "EVENTS", "PRODUCTION", "PHOTOGRAPHY", "VIDEO", "LIVE", "BTS"].map((cat) => (
              <button 
                key={cat}
                onClick={() => setPortfolioCategory(cat)}
                className={`px-4 py-2 rounded-sm border transition-all ${
                  portfolioCategory === cat
                    ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/30'
                    : 'bg-brand-card border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item) => (
              <div 
                key={item.id}
                onClick={() => setLightboxMedia({ type: item.type, src: item.image, title: item.title, location: item.location })}
                className="group relative h-72 rounded-sm overflow-hidden bg-brand-card border border-slate-800 hover:border-brand-red/60 transition-all duration-300 cursor-pointer shadow-lg"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                {/* Badge Category */}
                <span className="absolute top-3 left-3 bg-brand-black/90 text-brand-red text-[10px] font-tech font-bold px-2.5 py-1 rounded-sm border border-brand-red/30">
                  {item.category}
                </span>

                {/* Video Play Indicator if Video */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-brand-red/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <i data-lucide="play" className="w-6 h-6 ml-0.5"></i>
                    </div>
                  </div>
                )}

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-brand-card/95 backdrop-blur-md rounded-sm border border-white/10 group-hover:border-brand-red/40 transition-colors">
                  <h4 className="text-sm font-syne font-bold text-white group-hover:text-brand-red transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] font-tech text-brand-grey flex items-center gap-1 mt-0.5">
                    <i data-lucide="map-pin" className="w-3 h-3 text-brand-red"></i>
                    {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* LIGHTBOX MODAL */}
      {/* ------------------------------------------------------------- */}
      {lightboxMedia && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
          <button 
            onClick={() => setLightboxMedia(null)}
            className="absolute top-6 right-6 text-white p-3 rounded-full border border-white/20 hover:border-brand-red hover:text-brand-red transition-colors"
          >
            <i data-lucide="x" className="w-6 h-6"></i>
          </button>
          
          <div className="max-w-4xl w-full space-y-4">
            <img src={lightboxMedia.src} alt={lightboxMedia.title} className="w-full max-h-[80vh] object-contain rounded border border-slate-800" />
            <div className="text-center font-tech">
              <h3 className="text-xl text-white font-syne font-bold">{lightboxMedia.title}</h3>
              <p className="text-xs text-brand-grey">{lightboxMedia.location}</p>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* BEHIND THE SCENES SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-brand-black relative border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-tech tracking-widest uppercase font-semibold">
              <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
              REAL FIELD WORK
              <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-syne font-extrabold text-white tracking-tight uppercase">
              THE WORK YOU DON'T SEE.
            </h2>
            <p className="text-slate-400 font-sans text-base">
              LED installation, trussing, cable routing, audio sound checks, and live switching crew at work.
            </p>
          </div>

          {/* Horizontal BTS Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-brand-card p-4 rounded border border-slate-800 space-y-3">
              <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80" alt="Cable Management" className="w-full h-48 object-cover rounded" />
              <h4 className="font-syne font-bold text-white text-base uppercase">Precision Cabling & Power</h4>
              <p className="text-xs text-slate-400 font-sans">Organized 3-phase power distribution and clean optical fiber routing for safety.</p>
            </div>

            <div className="bg-brand-card p-4 rounded border border-slate-800 space-y-3">
              <img src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80" alt="LED Rigging" className="w-full h-48 object-cover rounded" />
              <h4 className="font-syne font-bold text-white text-base uppercase">LED Screen Rigging</h4>
              <p className="text-xs text-slate-400 font-sans">Mounting P2.5/P3.9 indoor and outdoor display panels with Novastar processors.</p>
            </div>

            <div className="bg-brand-card p-4 rounded border border-slate-800 space-y-3">
              <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80" alt="FOH Control Desk" className="w-full h-48 object-cover rounded" />
              <h4 className="font-syne font-bold text-white text-base uppercase">FOH Show Control</h4>
              <p className="text-xs text-slate-400 font-sans">GrandMA light desks and Midas digital mixers managed by certified directors.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* WHY CHOOSE US SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-brand-dark relative border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-tech tracking-widest uppercase font-semibold">
              <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
              CORE ADVANTAGES
              <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-syne font-extrabold text-white tracking-tight uppercase">
              ONE TEAM. COMPLETE PRODUCTION.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUsPillars.map((p, idx) => (
              <div key={idx} className="bg-brand-card p-8 rounded-sm border border-slate-800 hover:border-brand-red/50 transition-colors space-y-4">
                <div className="w-12 h-12 bg-brand-red/10 border border-brand-red/30 rounded text-brand-red flex items-center justify-center font-bold text-xl font-tech">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-syne font-bold text-white uppercase">{p.title}</h3>
                <p className="text-slate-300 text-xs font-sans leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* TESTIMONIALS & CLIENT LOGOS */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-brand-black relative border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-tech tracking-widest uppercase font-semibold">
              <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
              CLIENT TESTIMONIALS
              <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-syne font-extrabold text-white tracking-tight uppercase">
              TRUSTED ACROSS PRODUCTIONS
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-brand-card p-8 rounded border border-slate-800 space-y-4 flex flex-col justify-between">
                <p className="text-slate-300 text-sm font-sans italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-syne font-bold text-white text-sm">{t.author}</h4>
                    <p className="text-xs font-tech text-brand-grey">{t.title}, {t.company}</p>
                  </div>
                  <span className="text-xs font-tech text-brand-red font-bold">{t.logoText}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Client Logo Wall */}
          <div className="pt-8 border-t border-slate-800/60 flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {clientLogos.map((c, i) => (
              <span key={i} className="font-syne font-extrabold text-lg sm:text-2xl text-slate-500 hover:text-white transition-colors cursor-pointer tracking-wider">
                {c.label}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SHOWREEL SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-brand-dark relative border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative rounded-sm overflow-hidden border border-brand-red/40 shadow-2xl group h-[450px] flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80" 
              alt="Event Media Production Showreel Sri Lanka" 
              className="absolute inset-0 w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent"></div>

            <div className="relative text-center z-10 space-y-6 max-w-xl px-4">
              <span className="text-xs font-tech text-brand-red font-bold uppercase tracking-widest bg-brand-black/90 px-4 py-1.5 rounded-full border border-brand-red/30">
                2026 OFFICIAL PRODUCTION SHOWREEL
              </span>
              <h2 className="text-4xl sm:text-6xl font-syne font-extrabold text-white uppercase">
                SEE IT IN MOTION.
              </h2>
              
              {/* Play Launcher Button */}
              <button 
                onClick={() => setShowreelOpen(true)}
                className="w-20 h-20 mx-auto rounded-full bg-brand-red text-white flex items-center justify-center shadow-2xl shadow-brand-red/50 hover:scale-110 transition-transform group-hover:bg-red-600"
              >
                <i data-lucide="play" className="w-8 h-8 ml-1"></i>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Showreel Video Modal */}
      {showreelOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
          <button 
            onClick={() => setShowreelOpen(false)}
            className="absolute top-6 right-6 text-white p-3 rounded-full border border-white/20 hover:border-brand-red transition-colors"
          >
            <i data-lucide="x" className="w-6 h-6"></i>
          </button>
          
          <div className="max-w-4xl w-full aspect-video rounded overflow-hidden border border-brand-red/40 shadow-2xl">
            <iframe 
              className="w-full h-full" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Event Media Production Showreel" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* CONTACT / QUOTATION FORM SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="contact" className="py-24 bg-brand-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-brand-red text-xs font-tech tracking-widest uppercase font-semibold">
                  <span className="w-8 h-[2px] bg-brand-red inline-block"></span>
                  START YOUR PRODUCTION
                </div>
                <h2 className="text-3xl sm:text-5xl font-syne font-extrabold text-white tracking-tight uppercase leading-none">
                  HAVE AN EVENT IN MIND? <br />
                  <span className="text-brand-red">LET'S PRODUCE IT.</span>
                </h2>
                <p className="text-slate-300 font-sans text-sm leading-relaxed">
                  Fill out our detailed event quotation form. Our production managers will review your technical requirements and contact you within 24 hours.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-4 font-tech text-xs text-slate-300">
                <div className="flex items-start gap-4 p-4 bg-brand-card border border-slate-800 rounded">
                  <i data-lucide="map-pin" className="w-5 h-5 text-brand-red shrink-0 mt-0.5"></i>
                  <div>
                    <span className="text-white font-bold block mb-0.5">HEADQUARTERS</span>
                    <span>{companyInfo.headquarters}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-brand-card border border-slate-800 rounded">
                  <i data-lucide="phone" className="w-5 h-5 text-brand-red shrink-0 mt-0.5"></i>
                  <div>
                    <span className="text-white font-bold block mb-0.5">PHONE / INQUIRIES</span>
                    <span>{companyInfo.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-brand-card border border-slate-800 rounded">
                  <i data-lucide="mail" className="w-5 h-5 text-brand-red shrink-0 mt-0.5"></i>
                  <div>
                    <span className="text-white font-bold block mb-0.5">DIRECT EMAIL</span>
                    <span>{companyInfo.email}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7 bg-brand-card border border-slate-800 rounded-sm p-6 sm:p-10 shadow-2xl">
              
              {formSubmitted ? (
                <div className="text-center py-16 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-syne font-bold text-white uppercase">QUOTATION REQUEST RECEIVED</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto font-sans">
                    Thank you! Our technical production team in Sri Lanka has received your request and will reach out with a complete proposal shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  <h3 className="text-xl font-syne font-bold text-white uppercase tracking-wide border-b border-slate-800 pb-3">
                    LET'S BUILD YOUR EVENT
                  </h3>

                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech text-brand-grey uppercase mb-1">Your Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="John Perera"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-brand-black border border-slate-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-brand-grey uppercase mb-1">Company / Organization</label>
                      <input 
                        type="text" 
                        placeholder="Apex Holdings"
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-brand-black border border-slate-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech text-brand-grey uppercase mb-1">Phone Number *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+94 77 123 4567"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-brand-black border border-slate-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-brand-grey uppercase mb-1">Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-brand-black border border-slate-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>
                  </div>

                  {/* Event Type & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech text-brand-grey uppercase mb-1">Event Category</label>
                      <select 
                        value={formData.eventType}
                        onChange={e => setFormData({...formData, eventType: e.target.value})}
                        className="w-full bg-brand-black border border-slate-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                      >
                        <option value="Concert & Musical Show">Concert & Musical Show</option>
                        <option value="Corporate Event & Conference">Corporate Event & Conference</option>
                        <option value="Gala & Award Ceremony">Gala & Award Ceremony</option>
                        <option value="Product Launch & Activation">Product Launch & Activation</option>
                        <option value="Outdoor Festival">Outdoor Festival</option>
                        <option value="Live Multicam Broadcast">Live Multicam Broadcast</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-brand-grey uppercase mb-1">Estimated Event Date</label>
                      <input 
                        type="date" 
                        value={formData.eventDate}
                        onChange={e => setFormData({...formData, eventDate: e.target.value})}
                        className="w-full bg-brand-black border border-slate-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>
                  </div>

                  {/* Multi-Select Services Checkboxes */}
                  <div>
                    <label className="block text-xs font-tech text-brand-grey uppercase mb-2">Services Required (Select All That Apply)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        "Event Production", "LED Wall", "Sound System", "Lighting", "Stage & Trussing", 
                        "Photography", "Videography", "Drone Coverage", "Live Streaming"
                      ].map((srvTitle) => {
                        const isChecked = formData.services.includes(srvTitle);
                        return (
                          <div 
                            key={srvTitle}
                            onClick={() => handleServiceCheckbox(srvTitle)}
                            className={`p-2.5 rounded border text-xs font-tech cursor-pointer flex items-center gap-2 select-none transition-colors ${
                              isChecked ? 'bg-brand-red/20 border-brand-red text-white' : 'bg-brand-black border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${isChecked ? 'bg-brand-red border-brand-red text-white' : 'border-slate-600'}`}>
                              {isChecked && '✓'}
                            </div>
                            <span className="truncate">{srvTitle}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget & Message */}
                  <div>
                    <label className="block text-xs font-tech text-brand-grey uppercase mb-1">Additional Requirements / Details</label>
                    <textarea 
                      rows="3" 
                      placeholder="Tell us about your venue location, expected audience size, and stage layout preferences..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-brand-black border border-slate-800 rounded p-4 text-sm text-white focus:outline-none focus:border-brand-red"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full bg-brand-red hover:bg-red-700 text-white font-tech font-bold text-sm tracking-wider uppercase py-4 rounded shadow-xl shadow-brand-red/30 transition-all"
                  >
                    REQUEST A QUOTATION
                  </button>

                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FLOATING WHATSAPP BUTTON */}
      {/* ------------------------------------------------------------- */}
      <a 
        href={`https://wa.me/${companyInfo.whatsappPhone}?text=${encodeURIComponent("Hi Event Media Production, I'm interested in getting a quotation for an upcoming event.")}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 border border-emerald-400/40 group"
        aria-label="WhatsApp Contact"
      >
        <i data-lucide="message-square" className="w-6 h-6"></i>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-tech text-xs font-bold uppercase whitespace-nowrap">
          WhatsApp Inquiry
        </span>
      </a>

      {/* ------------------------------------------------------------- */}
      {/* FOOTER */}
      {/* ------------------------------------------------------------- */}
      <footer className="bg-brand-black border-t border-slate-800 pt-16 pb-12 font-sans text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
            
            {/* Col 1: Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand-red flex items-center justify-center font-syne font-bold text-white text-lg rounded-sm">
                  EMP
                </div>
                <span className="font-syne font-extrabold text-white tracking-wider text-sm">
                  EVENT MEDIA PRODUCTION
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400">
                {companyInfo.subtext}
              </p>
              <div className="text-xs font-tech text-brand-red font-bold">
                {companyInfo.tagline}
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-3 font-tech text-xs">
              <h4 className="font-syne font-bold text-white text-sm uppercase tracking-wider">NAVIGATION</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-brand-red transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-brand-red transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-brand-red transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection('productions')} className="hover:text-brand-red transition-colors">Featured Productions</button></li>
                <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-brand-red transition-colors">Portfolio</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-brand-red transition-colors">Contact & Quote</button></li>
              </ul>
            </div>

            {/* Col 3: Services List */}
            <div className="space-y-3 font-tech text-xs">
              <h4 className="font-syne font-bold text-white text-sm uppercase tracking-wider">OUR SERVICES</h4>
              <ul className="space-y-2">
                <li><span className="text-slate-300">Event Production & Staging</span></li>
                <li><span className="text-slate-300">LED Display Wall Rigs</span></li>
                <li><span className="text-slate-300">Line Array Audio Systems</span></li>
                <li><span className="text-slate-300">DMX Concert Stage Lighting</span></li>
                <li><span className="text-slate-300">Press Photography & 4K Video</span></li>
                <li><span className="text-slate-300">Multicamera Live Streaming</span></li>
              </ul>
            </div>

            {/* Col 4: Socials & Official Facebook Link */}
            <div className="space-y-4 font-tech text-xs">
              <h4 className="font-syne font-bold text-white text-sm uppercase tracking-wider">CONNECT WITH US</h4>
              <p className="text-xs text-slate-400">Follow our active production builds and live event feeds across Sri Lanka:</p>
              
              {/* Official Facebook Link */}
              <div className="flex flex-col space-y-2">
                <a 
                  href={companyInfo.socials.facebook}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-tech text-xs px-4 py-2 rounded transition-colors"
                >
                  <i data-lucide="facebook" className="w-4 h-4"></i>
                  Official Facebook Page
                </a>

                <div className="flex items-center gap-3 pt-2">
                  <a href={companyInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-slate-900 border border-slate-800 hover:border-brand-red text-slate-300 hover:text-white flex items-center justify-center">
                    <i data-lucide="instagram" className="w-4 h-4"></i>
                  </a>
                  <a href={companyInfo.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-slate-900 border border-slate-800 hover:border-brand-red text-slate-300 hover:text-white flex items-center justify-center">
                    <i data-lucide="youtube" className="w-4 h-4"></i>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Legal */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-tech text-slate-500 gap-4">
            <div>
              © {new Date().getFullYear()} Event Media Production (Pvt) Ltd. All Rights Reserved. Sri Lanka.
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300">Terms of Production</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
