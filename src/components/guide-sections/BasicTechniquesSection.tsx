import React from 'react';
import VideoEmbed from '../VideoEmbed';
import ScannerSelector from '../ScannerSelector';

const BasicTechniquesSection = () => {
  return (
    <section id="basic-techniques" className="mb-12">
      <h2 className="text-3xl font-bold text-primary mb-6">Basic Techniques</h2>
      
      <div id="file-preparation" className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">File Preparation</h3>
        <p>Proper file preparation is crucial for successful dental 3D printing. Learn about:</p>
        <ul className="list-disc pl-6 mt-4">
          <li>STL file optimization</li>
          <li>Support structure placement</li>
          <li>Print orientation</li>
        </ul>
        
        <div className="mt-6 not-prose">
          <h4 className="text-lg font-medium text-gray-900 mb-3">File Preparation Tutorial</h4>
          <VideoEmbed 
            videoId="dQw4w9WgXcQ"
            title="File Preparation for Dental 3D Printing"
          />
        </div>
      </div>

      <div id="scanner-selection" className="mb-8">
        <ScannerSelector />
      </div>

      <div id="printer-setup" className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">Printer Setup</h3>
        <p>Configure your printer correctly with these essential steps:</p>
        <ul className="list-disc pl-6 mt-4">
          <li>Printer calibration</li>
          <li>Resin settings</li>
          <li>Build platform leveling</li>
        </ul>
      </div>
    </section>
  );
};

export default BasicTechniquesSection; 