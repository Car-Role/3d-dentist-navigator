import React from 'react';
import VideoEmbed from '../VideoEmbed';

const AdvancedTechniquesSection = () => {
  return (
    <section id="advanced-techniques" className="mb-12">
      <h2 className="text-3xl font-bold text-primary mb-6">Advanced Techniques</h2>
      
      <div id="support-structures" className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">Support Structures</h3>
        <p>Master the art of support structure design:</p>
        <ul className="list-disc pl-6 mt-4">
          <li>Support density optimization</li>
          <li>Contact point size selection</li>
          <li>Overhang management</li>
        </ul>
      </div>

      <div id="post-processing" className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">Post-Processing</h3>
        <p>Learn essential post-processing techniques:</p>
        <ul className="list-disc pl-6 mt-4">
          <li>Cleaning procedures</li>
          <li>UV curing parameters</li>
          <li>Surface finishing methods</li>
        </ul>
        
        <div className="mt-6 not-prose">
          <h4 className="text-lg font-medium text-gray-900 mb-3">Post-Processing Walkthrough</h4>
          <VideoEmbed 
            videoId="dQw4w9WgXcQ"
            title="Post-Processing Dental 3D Prints"
          />
        </div>
      </div>
    </section>
  );
};

export default AdvancedTechniquesSection; 