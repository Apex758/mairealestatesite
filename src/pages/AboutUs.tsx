import React, { useEffect, useRef } from 'react';
import { Users, Award, Globe, Sparkles, Shield, Zap, Target, Heart, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  // Refs for parallax elements
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  return (
    <div className="pt-16 min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
            MAI REAL ESTATE L.L.C <span className="font-medium">– A LEGACY IN THE MAKING</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Finding you the perfect place to call home.
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
              About <span className="font-medium">Us</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              MAI Real Estate L.L.C is not just a brokerage—it is an institution of trust, innovation, and
              excellence in Dubai's dynamic real estate landscape. As a fully licensed real estate powerhouse,
              we specialize in buying, selling, and leasing, ensuring an unparalleled customer experience.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Trusted, tested, and approved, we transcend the conventional to become architects of
              opportunity, crafting legacies that stand the test of time. Rooted in unwavering integrity and
              fueled by visionary ambition, we redefine real estate with every transaction, delivering bespoke
              experiences and extraordinary results.
            </p>
          </div>

          <div className="md:w-1/2 relative h-[400px] overflow-hidden rounded-lg shadow-xl">
            <div
              ref={el => parallaxRefs.current[0] = el}
              className="absolute inset-0"
            >
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Dubai Real Estate"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-light text-gray-900 dark:text-white text-center mb-12">
            Vision & <span className="font-medium">Mission</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-400">
                To lead the global real estate frontier by shaping iconic, transformative properties that epitomize
                luxury and inspire legacy. With a relentless pursuit of excellence, we innovate, elevate, and
                curate exceptional spaces that transcend generations.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built upon the philosophy of "I AM," we do more than develop real estate—we craft a timeless
                narrative of purpose, ingenuity, and divine excellence. From redefining brokerage services in
                Dubai to pioneering real estate development on a global scale, MAI Real Estate is not just
                shaping spaces; we are sculpting the future.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-light text-gray-900 dark:text-white text-center mb-12">
          Our <span className="font-medium">Services</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-light text-gray-900 dark:text-white text-center mb-12">
            Core <span className="font-medium">Values</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Expertise Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-light text-gray-900 dark:text-white text-center mb-12">
          Our <span className="font-medium">Expertise</span>
        </h2>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            At MAI Real Estate L.L.C, we are not simply navigating the real estate market—we are
            pioneering its evolution. Our leadership is forged by visionaries with expertise spanning
            technology, AI, blockchain, mathematics, and Dubai's high-stakes real estate arena. This
            fusion of disciplines grants us an unrivaled advantage, allowing us to approach every venture
            with precision, foresight, and strategic brilliance.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Our mastery of blockchain technology ensures transparency, security, and efficiency in all
            transactions, while our deep-rooted mathematical insights drive intelligent, data-backed
            investment decisions. Every deal, every property, every relationship we cultivate is a building
            block in reshaping the future of real estate.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            With MAI Real Estate, you don't just invest—you create a legacy.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-light text-gray-900 dark:text-white text-center mb-12">
            Why Choose <span className="font-medium">MAI Real Estate?</span>
          </h2>

          <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-sm text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              We are more than a brokerage; we are the architects of success and the custodians of legacy.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              With an unyielding commitment to integrity, innovation, and elite service, we transcend
              conventional real estate to deliver transformative experiences.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Partner with us—not just for extraordinary results, but for a future that redefines what is possible.
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
          <div className="absolute inset-0 bg-blue-900/70 dark:bg-blue-900/80"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-white mb-6">
            Ready to find your <span className="font-medium">dream property</span>?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to guide you through Dubai's luxury real estate market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/listings"
              className="px-4 py-2 bg-white text-blue-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Properties
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
