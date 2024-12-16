import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const GuideContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (isHomePage) {
    return (
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="relative -mt-8 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              Transform Your Dental Practice with 3D Printing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Master the art of dental 3D printing with our comprehensive guide designed specifically for dental professionals.
            </p>
            <Link to="/guide/getting-started" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg transition-colors shadow-lg">
              Get Started
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                alt="Digital Workflow"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">Digital Workflow</h3>
              <p className="text-gray-600">Learn how to integrate 3D printing into your existing digital workflow seamlessly.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                alt="Advanced Techniques"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">Advanced Techniques</h3>
              <p className="text-gray-600">Master advanced printing techniques for surgical guides, models, and more.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
                alt="Community Support"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">Community Support</h3>
              <p className="text-gray-600">Join our community of dental professionals embracing 3D printing technology.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary/5 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Ready to Start Your 3D Printing Journey?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Our comprehensive guide will take you from beginner to expert with step-by-step instructions and professional tips.
          </p>
          <Link to="/guide/getting-started" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg transition-colors shadow-lg">
            Explore the Guide
          </Link>
        </section>
      </div>
    );
  }

  // Guide content for non-homepage routes
  return (
    <div className="prose max-w-none">
      <h1 id="getting-started" className="text-3xl font-bold text-primary mb-6">Getting Started with Dental 3D Printing</h1>
      
      <section id="introduction" className="mb-12">
        <h2 className="text-2xl font-semibold text-primary mb-4">Introduction</h2>
        <p className="text-gray-700 mb-4">
          3D printing has revolutionized the dental industry, offering unprecedented precision and efficiency in creating dental products. This comprehensive guide will walk you through everything you need to know about implementing 3D printing in your dental practice.
        </p>
        <p className="text-gray-700 mb-4">
          Whether you're new to digital dentistry or looking to expand your existing capabilities, this guide will help you master the essential techniques and best practices for dental 3D printing.
        </p>
      </section>

      <section id="equipment" className="mb-12">
        <h2 className="text-2xl font-semibold text-primary mb-4">Required Equipment</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>3D Printer (Dental-specific resin printer recommended)</li>
          <li>Washing and Curing Station</li>
          <li>Dental Design Software</li>
          <li>Post-processing Tools</li>
          <li>Safety Equipment</li>
        </ul>
      </section>

      <section id="basic-techniques" className="mb-12">
        <h2 className="text-2xl font-semibold text-primary mb-4">Basic Techniques</h2>
        <div id="file-preparation" className="mb-6">
          <h3 className="text-xl font-semibold text-primary mb-3">File Preparation</h3>
          <p className="text-gray-700 mb-4">
            Learn how to prepare your 3D models for printing, including proper orientation, support structure placement, and slicing parameters optimization.
          </p>
        </div>
        <div id="printer-setup" className="mb-6">
          <h3 className="text-xl font-semibold text-primary mb-3">Printer Setup</h3>
          <p className="text-gray-700 mb-4">
            Master the fundamentals of printer calibration, resin handling, and initial setup procedures for optimal print quality.
          </p>
        </div>
      </section>

      <section id="advanced-techniques" className="mb-12">
        <h2 className="text-2xl font-semibold text-primary mb-4">Advanced Techniques</h2>
        <div id="support-structures" className="mb-6">
          <h3 className="text-xl font-semibold text-primary mb-3">Support Structures</h3>
          <p className="text-gray-700 mb-4">
            Advanced techniques for creating optimal support structures that ensure print success while minimizing post-processing work.
          </p>
        </div>
        <div id="post-processing" className="mb-6">
          <h3 className="text-xl font-semibold text-primary mb-3">Post-Processing</h3>
          <p className="text-gray-700 mb-4">
            Detailed procedures for cleaning, curing, and finishing your printed dental products to achieve professional results.
          </p>
        </div>
      </section>
    </div>
  );
};

export default GuideContent;
