import React from 'react';

const GuideContent = () => {
  return (
    <div className="prose max-w-none">
      <section id="getting-started" className="mb-12">
        <h1 className="text-3xl font-bold mb-6">Getting Started</h1>
        
        <div id="introduction" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            Welcome to the comprehensive guide on 3D printing for dental practices. This guide will walk you through everything you need to know about implementing 3D printing in your dental office, from basic concepts to advanced techniques.
          </p>
        </div>

        <div id="equipment" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Required Equipment</h2>
          <p className="mb-4">
            To get started with 3D printing in your dental practice, you'll need the following essential equipment:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>3D Printer (Dental-specific recommended)</li>
            <li>Printing Materials (Resins)</li>
            <li>Post-processing Equipment</li>
            <li>Safety Equipment</li>
          </ul>
        </div>
      </section>

      <section id="basic-techniques" className="mb-12">
        <h1 className="text-3xl font-bold mb-6">Basic Techniques</h1>
        
        <div id="file-preparation" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">File Preparation</h2>
          <p className="mb-4">
            Proper file preparation is crucial for successful 3D printing. Learn how to:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Convert scan data to printable files</li>
            <li>Optimize file settings for dental applications</li>
            <li>Check for common file issues</li>
          </ul>
        </div>

        <div id="printer-setup" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Printer Setup</h2>
          <p className="mb-4">
            Learn how to properly set up your printer for optimal results:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Calibration procedures</li>
            <li>Material loading and handling</li>
            <li>Initial test prints</li>
          </ul>
        </div>
      </section>

      <section id="advanced-techniques" className="mb-12">
        <h1 className="text-3xl font-bold mb-6">Advanced Techniques</h1>
        
        <div id="support-structures" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Support Structures</h2>
          <p className="mb-4">
            Understanding support structures is crucial for successful prints:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Types of supports</li>
            <li>Optimal support placement</li>
            <li>Removing supports safely</li>
          </ul>
        </div>

        <div id="post-processing" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Post-Processing</h2>
          <p className="mb-4">
            Learn essential post-processing techniques:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Cleaning procedures</li>
            <li>Curing methods</li>
            <li>Finishing techniques</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default GuideContent;