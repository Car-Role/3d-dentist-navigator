import React, { useState } from 'react';
import TopNav from '../components/TopNav';
import GuideNavigation from '../components/GuideNavigation';
import GuideContent from '../components/GuideContent';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <GuideNavigation 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <GuideContent />
        </div>
      </main>
    </div>
  );
};

export default Index;