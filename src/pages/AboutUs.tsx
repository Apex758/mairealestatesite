import React, { useEffect, useRef, useState } from 'react';
import { Users, Award, Globe, Sparkles, Shield, Zap, Target, Heart, Briefcase, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext';
import { translateText } from '../utils/translateUtils';

// Company value interface
interface CompanyValue {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Service interface
interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function AboutUs() {
  const { language } = useGlobal();
  // Refs for parallax elements
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Translation state
  const [translatedContent, setTranslatedContent] = useState({
    // Hero section
    legacyInTheMaking: 'A LEGACY IN THE MAKING',
    findingYouPerfect: 'Finding you the perfect place to call home.',
    
    // About Us section
    aboutUs: 'About',
    us: 'Us',
    aboutUsP1: 'MAI Real Estate L.L.C is not just a brokerage—it is an institution of trust, innovation, and excellence in Dubai\'s dynamic real estate landscape. As a fully licensed real estate powerhouse, we specialize in buying, selling, and leasing, ensuring an unparalleled customer experience.',
    aboutUsP2: 'Trusted, tested, and approved, we transcend the conventional to become architects of opportunity, crafting legacies that stand the test of time. Rooted in unwavering integrity and fueled by visionary ambition, we redefine real estate with every transaction, delivering bespoke experiences and extraordinary results.',
    
    // Vision & Mission section
    visionAndMission: 'Vision &',
    mission: 'Mission',
    ourVision: 'Our Vision',
    visionText: 'To lead the global real estate frontier by shaping iconic, transformative properties that epitomize luxury and inspire legacy. With a relentless pursuit of excellence, we innovate, elevate, and curate exceptional spaces that transcend generations.',
    ourMission: 'Our Mission',
    missionText: 'Built upon the philosophy of "I AM," we do more than develop real estate—we craft a timeless narrative of purpose, ingenuity, and divine excellence. From redefining brokerage services in Dubai to pioneering real estate development on a global scale, MAI Real Estate is not just shaping spaces; we are sculpting the future.',
    
    // Services section
    our: 'Our',
    services: 'Services',
    
    // Core Values section
    core: 'Core',
    values: 'Values',
    
    // Expertise section
    expertise: 'Expertise',
    expertiseP1: 'At MAI Real Estate L.L.C, we are not simply navigating the real estate market—we are pioneering its evolution. Our leadership is forged by visionaries with expertise spanning technology, AI, blockchain, mathematics, and Dubai\'s high-stakes real estate arena. This fusion of disciplines grants us an unrivaled advantage, allowing us to approach every venture with precision, foresight, and strategic brilliance.',
    expertiseP2: 'Our mastery of blockchain technology ensures transparency, security, and efficiency in all transactions, while our deep-rooted mathematical insights drive intelligent, data-backed investment decisions. Every deal, every property, every relationship we cultivate is a building block in reshaping the future of real estate.',
    expertiseP3: 'With MAI Real Estate, you don\'t just invest—you create a legacy.',
    
    // Why Choose Us section
    whyChoose: 'Why Choose',
    maiRealEstate: 'MAI Real Estate?',
    whyChooseP1: 'We are more than a brokerage; we are the architects of success and the custodians of legacy.',
    whyChooseP2: 'With an unyielding commitment to integrity, innovation, and elite service, we transcend conventional real estate to deliver transformative experiences.',
    whyChooseP3: 'Partner with us—not just for extraordinary results, but for a future that redefines what is possible.',
    
    // CTA section
    readyToFind: 'Ready to find your',
    dreamProperty: 'dream property',
    ourTeamOfExperts: 'Our team of experts is ready to guide you through Dubai\'s luxury real estate market.',
    browseProperties: 'Browse Properties',
    contactUs: 'Contact Us'
  });
  
  // Update translations when language changes
  useEffect(() => {
    const updateTranslations = async () => {
      if (language === 'en') return;
      
      try {
        const translated = {
          // Hero section
          legacyInTheMaking: await translateText('A LEGACY IN THE MAKING', language),
          findingYouPerfect: await translateText('Finding you the perfect place to call home.', language),
          
          // About Us section
          aboutUs: await translateText('About', language),
          us: await translateText('Us', language),
          aboutUsP1: await translateText('MAI Real Estate L.L.C is not just a brokerage—it is an institution of trust, innovation, and excellence in Dubai\'s dynamic real estate landscape. As a fully licensed real estate powerhouse, we specialize in buying, selling, and leasing, ensuring an unparalleled customer experience.', language),
          aboutUsP2: await translateText('Trusted, tested, and approved, we transcend the conventional to become architects of opportunity, crafting legacies that stand the test of time. Rooted in unwavering integrity and fueled by visionary ambition, we redefine real estate with every transaction, delivering bespoke experiences and extraordinary results.', language),
          
          // Vision & Mission section
          visionAndMission: await translateText('Vision &', language),
          mission: await translateText('Mission', language),
          ourVision: await translateText('Our Vision', language),
          visionText: await translateText('To lead the global real estate frontier by shaping iconic, transformative properties that epitomize luxury and inspire legacy. With a relentless pursuit of excellence, we innovate, elevate, and curate exceptional spaces that transcend generations.', language),
          ourMission: await translateText('Our Mission', language),
          missionText: await translateText('Built upon the philosophy of "I AM," we do more than develop real estate—we craft a timeless narrative of purpose, ingenuity, and divine excellence. From redefining brokerage services in Dubai to pioneering real estate development on a global scale, MAI Real Estate is not just shaping spaces; we are sculpting the future.', language),
          
          // Services section
          our: await translateText('Our', language),
          services: await translateText('Services', language),
          
          // Core Values section
          core: await translateText('Core', language),
          values: await translateText('Values', language),
          
          // Expertise section
          expertise: await translateText('Expertise', language),
          expertiseP1: await translateText('At MAI Real Estate L.L.C, we are not simply navigating the real estate market—we are pioneering its evolution. Our leadership is forged by visionaries with expertise spanning technology, AI, blockchain, mathematics, and Dubai\'s high-stakes real estate arena. This fusion of disciplines grants us an unrivaled advantage, allowing us to approach every venture with precision, foresight, and strategic brilliance.', language),
          expertiseP2: await translateText('Our mastery of blockchain technology ensures transparency, security, and efficiency in all transactions, while our deep-rooted mathematical insights drive intelligent, data-backed investment decisions. Every deal, every property, every relationship we cultivate is a building block in reshaping the future of real estate.', language),
          expertiseP3: await translateText('With MAI Real Estate, you don\'t just invest—you create a legacy.', language),
          
          // Why Choose Us section
          whyChoose: await translateText('Why Choose', language),
          maiRealEstate: await translateText('MAI Real Estate?', language),
          whyChooseP1: await translateText('We are more than a brokerage; we are the architects of success and the custodians of legacy.', language),
          whyChooseP2: await translateText('With an unyielding commitment to integrity, innovation, and elite service, we transcend conventional real estate to deliver transformative experiences.', language),
          whyChooseP3: await translateText('Partner with us—not just for extraordinary results, but for a future that redefines what is possible.', language),
          
          // CTA section
          readyToFind: await translateText('Ready to find your', language),
          dreamProperty: await translateText('dream property', language),
          ourTeamOfExperts: await translateText('Our team of experts is ready to guide you through Dubai\'s luxury real estate market.', language),
          browseProperties: await translateText('Browse Properties', language),
          contactUs: await translateText('Contact Us', language)
        };
        
        setTranslatedContent(translated);
        
        // Also translate company values and services
        for (let i = 0; i < companyValues.length; i++) {
          companyValues[i].title = await translateText(companyValues[i].title, language);
          companyValues[i].description = await translateText(companyValues[i].description, language);
        }
        
        for (let i = 0; i < services.length; i++) {
          services[i].title = await translateText(services[i].title, language);
          services[i].description = await translateText(services[i].description, language);
        }
      } catch (error) {
        console.error('Error translating content:', error);
      }
    };
    
    updateTranslations();
  }, [language]);

  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      parallaxRefs.current.forEach((ref, index) => {
        if (ref) {
          // Different speeds for different elements
          const speed = 0.1 + (index * 0.05);
          ref.style.transform = `translateY(${scrollY * speed}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Company values
  const companyValues: CompanyValue[] = [
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: 'Visionary Brilliance',
      description: 'Redefining possibilities with groundbreaking real estate opportunities.',
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: 'Integrity',
      description: 'Upholding transparency, trust, and unwavering ethical standards in every deal.',
    },
    {
      icon: <Award className="w-8 h-8 text-blue-500" />,
      title: 'Excellence',
      description: 'Delivering superior service with properties of unmatched caliber.',
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      title: 'Divine Responsibility',
      description: 'Creating sustainable and impactful real estate solutions that leave a lasting mark.',
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: 'Resilience',
      description: 'Thriving in challenges, adapting, and ensuring client success.',
    },
    {
      icon: <Heart className="w-8 h-8 text-blue-500" />,
      title: 'Client-Centric Innovation',
      description: 'Personalizing real estate journeys, exceeding every expectation.',
    },
  ];

  // Services
  const services: Service[] = [
    {
      icon: <Briefcase className="w-8 h-8 text-blue-500" />,
      title: 'Buying & Selling',
      description: 'Facilitating high-value transactions with expert precision, including cutting-edge, compliant cryptocurrency payment solutions in Dubai.',
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: 'Leasing Brokerage',
      description: 'Unlocking elite leasing opportunities with seamless transactions.',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-blue-500" />,
      title: 'Luxury Real Estate Advisory',
      description: 'Offering exclusive investment strategies and prestigious luxury properties for the world\'s most discerning clientele.',
    },
  ];

  // Animation effect for luxury elements
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>
        
        {/* Gold decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="mx-4 text-amber-400 tracking-[0.3em] uppercase text-sm font-light">Excellence</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extralight text-white mb-6 tracking-wider">
              MAI REAL ESTATE L.L.C <span className="font-light text-amber-300">– {translatedContent.legacyInTheMaking}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {translatedContent.findingYouPerfect}
            </p>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 py-24 relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center mb-6">
            <Star className="w-5 h-5 text-amber-500 mr-3" />
            <h2 className="text-3xl font-light text-gray-900 dark:text-white">
              {t('aboutUs')}
            </h2>
          </div>
                
                <div className="h-px w-24 bg-amber-500 mb-8"></div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {translatedContent.aboutUsP1}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {translatedContent.aboutUsP2}
                </p>
              </div>
            </div>

            <div className="md:w-1/2 relative h-[500px] overflow-hidden rounded-xl shadow-2xl">
              <div
                ref={el => parallaxRefs.current[0] = el}
                className="absolute inset-0"
              >
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Dubai Real Estate"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="bg-gray-900 py-24 relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="mx-4 text-amber-400 tracking-[0.3em] uppercase text-sm font-light">Purpose</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            
            <h2 className="text-3xl font-light text-white mb-4">
              {t('visionAndMission')} <span className="font-medium text-amber-300">{t('mission')}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className={`bg-gray-800/80 backdrop-blur-sm p-10 rounded-xl border border-gray-700 shadow-xl transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">{translatedContent.ourVision}</h3>
              <div className="h-px w-16 bg-amber-500 mb-6"></div>
              <p className="text-gray-300 leading-relaxed">
                {translatedContent.visionText}
              </p>
            </div>

            <div className={`bg-gray-800/80 backdrop-blur-sm p-10 rounded-xl border border-gray-700 shadow-xl transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">{translatedContent.ourMission}</h3>
              <div className="h-px w-16 bg-amber-500 mb-6"></div>
              <p className="text-gray-300 leading-relaxed">
                {translatedContent.missionText}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 py-24 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-500"></div>
              <span className="mx-4 text-amber-500 tracking-[0.3em] uppercase text-sm font-light">Expertise</span>
              <div className="h-px w-12 bg-amber-500"></div>
            </div>
            
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
              {t('our')} <span className="font-medium text-amber-500 dark:text-amber-400">{t('services')}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-300 group transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{React.cloneElement(service.icon as React.ReactElement, { className: 'w-8 h-8 text-white' })}</div>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <div className="h-px w-12 bg-amber-500 mb-6"></div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-gray-900 py-24 relative">
        <div className="absolute inset-0 z-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Dubai Real Estate"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="mx-4 text-amber-400 tracking-[0.3em] uppercase text-sm font-light">Foundation</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            
            <h2 className="text-3xl font-light text-white mb-4">
              {t('core')} <span className="font-medium text-amber-300">{t('values')}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <div
                key={index}
                className={`bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-amber-500/30 transition-all duration-300 group transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{React.cloneElement(value.icon as React.ReactElement, { className: 'w-7 h-7 text-white' })}</div>
                </div>
                <h3 className="text-xl font-medium text-white mb-3">
                  {value.title}
                </h3>
                <div className="h-px w-10 bg-amber-500 mb-4"></div>
                <p className="text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Expertise Section */}
      <div className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 py-24 relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-500"></div>
              <span className="mx-4 text-amber-500 tracking-[0.3em] uppercase text-sm font-light">Mastery</span>
              <div className="h-px w-12 bg-amber-500"></div>
            </div>
            
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
              {t('our')} <span className="font-medium text-amber-500 dark:text-amber-400">{t('expertise')}</span>
            </h2>
          </div>

          <div className={`bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {translatedContent.expertiseP1}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {translatedContent.expertiseP2}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium text-center mt-10 text-lg">
              {translatedContent.expertiseP3}
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-900 py-24 relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1546412414-e1885e51cfa5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-amber-400"></div>
              <span className="mx-4 text-amber-400 tracking-[0.3em] uppercase text-sm font-light">Distinction</span>
              <div className="h-px w-12 bg-amber-400"></div>
            </div>
            
            <h2 className="text-3xl font-light text-white mb-4">
              {t('whyChoose')} <span className="font-medium text-amber-300">{t('maiRealEstate')}</span>
            </h2>
          </div>

          <div className={`bg-gray-800/80 backdrop-blur-sm p-12 rounded-xl border border-gray-700 shadow-xl text-center transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {translatedContent.whyChooseP1}
            </p>
            <div className="h-px w-24 bg-amber-500 mx-auto my-8"></div>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {translatedContent.whyChooseP2}
            </p>
            <div className="h-px w-24 bg-amber-500 mx-auto my-8"></div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {translatedContent.whyChooseP3}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        <div
          ref={el => parallaxRefs.current[1] = el}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1546412414-e1885e51cfa5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          />
          {/* Adjusted overlay for light mode */}
          <div className="absolute inset-0 bg-blue-200/70 dark:bg-blue-900/80"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* Adjusted text color for light mode */}
          <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
            {translatedContent.readyToFind} <span className="font-medium">{translatedContent.dreamProperty}</span>?
          </h2>
          {/* Adjusted text color for light mode */}
          <p className="text-gray-700 dark:text-white/90 mb-8 max-w-2xl mx-auto">
            {translatedContent.ourTeamOfExperts}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/listings"
              className="px-4 py-2 bg-white text-blue-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              {translatedContent.browseProperties}
            </Link>
            {/* Adjusted border, text, and hover colors for light mode */}
            <Link
              to="/contact"
              className="px-8 py-3 bg-transparent border-2 border-blue-900 text-blue-900 dark:border-white dark:text-white font-medium rounded-lg hover:bg-blue-900/10 dark:hover:bg-white/10 transition-colors"
            >
              {translatedContent.contactUs}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
