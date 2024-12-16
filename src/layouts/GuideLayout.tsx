import React, { useState, useEffect } from 'react';
import GuideNavigation from '../components/GuideNavigation';
import GuideContent from '../components/GuideContent';
import AIChatFAB from '../components/AIChatFAB';

const GuideLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarCollapsed(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <GuideNavigation 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobile={isMobile}
      />
      <main 
        className={`
          transition-all duration-300 ease-in-out pt-16
          ${isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-16' : 'ml-64'}
        `}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <GuideContent />
        </div>
      </main>
      <AIChatFAB />
    </div>
  );
};

export default GuideLayout;