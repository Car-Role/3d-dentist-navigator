import React from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import GettingStartedSection from './guide-sections/GettingStartedSection';
import BasicTechniquesSection from './guide-sections/BasicTechniquesSection';
import AdvancedTechniquesSection from './guide-sections/AdvancedTechniquesSection';

const GuideContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (isHomePage) {
    return <HomePage />;
  }

  return (
    <article className="prose prose-blue max-w-none">
      <GettingStartedSection />
      <BasicTechniquesSection />
      <AdvancedTechniquesSection />
    </article>
  );
};

export default GuideContent;
