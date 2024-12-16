import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Section {
  id: string;
  title: string;
  subsections?: { id: string; title: string; }[];
}

const sections: Section[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    subsections: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'equipment', title: 'Required Equipment' },
    ],
  },
  {
    id: 'basic-techniques',
    title: 'Basic Techniques',
    subsections: [
      { id: 'file-preparation', title: 'File Preparation' },
      { id: 'printer-setup', title: 'Printer Setup' },
    ],
  },
  {
    id: 'advanced-techniques',
    title: 'Advanced Techniques',
    subsections: [
      { id: 'support-structures', title: 'Support Structures' },
      { id: 'post-processing', title: 'Post-Processing' },
    ],
  },
];

interface GuideNavigationProps {
  collapsed: boolean;
  onToggle: () => void;
}

const GuideNavigation = ({ collapsed, onToggle }: GuideNavigationProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 overflow-y-auto",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex justify-end p-2">
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-500" />
          )}
        </button>
      </div>
      <div className="px-4 py-2">
        {sections.map((section) => (
          <div key={section.id} className="mb-4">
            <button
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "text-left font-medium text-primary hover:text-primary-dark transition-colors",
                collapsed ? "w-8 overflow-hidden" : "w-full"
              )}
            >
              {section.title}
            </button>
            {!collapsed && section.subsections && (
              <ul className="ml-4 mt-2 space-y-2">
                {section.subsections.map((subsection) => (
                  <li key={subsection.id}>
                    <button
                      onClick={() => scrollToSection(subsection.id)}
                      className="text-sm text-secondary-dark hover:text-primary transition-colors"
                    >
                      {subsection.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default GuideNavigation;