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
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/95 backdrop-blur-sm border-r border-gray-100 transition-all duration-300 ease-in-out overflow-y-auto shadow-sm",
        collapsed ? "w-16 transform translate-x-0" : "w-64 transform translate-x-0"
      )}
    >
      <div className="sticky top-0 flex justify-end p-2 bg-white/80 backdrop-blur-sm z-10">
        <button
          onClick={onToggle}
          className="p-2 hover:bg-blue-50 rounded-full transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-primary" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-primary" />
          )}
        </button>
      </div>
      <div className="px-4 py-2">
        {sections.map((section) => (
          <div key={section.id} className="mb-6">
            <button
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "text-left font-medium text-gray-900 hover:text-primary transition-colors",
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
                      className="text-sm text-gray-600 hover:text-primary transition-colors w-full text-left py-1"
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