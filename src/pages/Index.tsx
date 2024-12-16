import React from 'react';
import TopNav from '../components/TopNav';
import GuideContent from '../components/GuideContent';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <GuideContent />
        </div>
      </main>
    </div>
  );
};

export default Index;