import React from 'react';
import VideoEmbed from '../VideoEmbed';

const GettingStartedSection = () => {
  return (
    <section id="getting-started" className="mb-12">
      <h2 className="text-3xl font-bold text-primary mb-6">Getting Started</h2>
      
      <div id="introduction" className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">Introduction</h3>
        <p>Welcome to the comprehensive guide on dental 3D printing. This guide will walk you through everything you need to know about implementing 3D printing in your dental practice.</p>
        
        <div className="mt-6 not-prose">
          <h4 className="text-lg font-medium text-gray-900 mb-3">Quick Start Tutorial</h4>
          <VideoEmbed 
            videoId="dQw4w9WgXcQ"
            title="Introduction to Dental 3D Printing"
          />
        </div>
      </div>

      <div id="equipment" className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">Required Equipment</h3>
        <p>To get started with dental 3D printing, you'll need the following essential equipment:</p>
        <ul className="list-disc pl-6 mt-4">
          <li>3D Printer compatible with dental resins</li>
          <li>Dental-specific resins</li>
          <li>Post-processing equipment</li>
          <li>Digital design software</li>
        </ul>
      </div>
    </section>
  );
};

export default GettingStartedSection; 