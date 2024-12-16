import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GuideNavigationProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

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

const GuideNavigation = ({ collapsed, onToggle, isMobile }: GuideNavigationProps) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [activeSubsection, setActiveSubsection] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const absoluteTop = window.scrollY + top;
          const absoluteBottom = window.scrollY + bottom;

          if (scrollPosition >= absoluteTop && scrollPosition < absoluteBottom) {
            setActiveSection(section.id);

            if (section.subsections) {
              for (const subsection of section.subsections) {
                const subElement = document.getElementById(subsection.id);
                if (subElement) {
                  const { top: subTop, bottom: subBottom } = subElement.getBoundingClientRect();
                  const absoluteSubTop = window.scrollY + subTop;
                  const absoluteSubBottom = window.scrollY + subBottom;

                  if (scrollPosition >= absoluteSubTop && scrollPosition < absoluteSubBottom) {
                    setActiveSubsection(subsection.id);
                    break;
                  }
                }
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const currentScrollPos = window.pageYOffset;
      const headerHeight = 96;
      const scrollPosition = currentScrollPos + rect.top - headerHeight;
      
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });

      if (isMobile) {
        setIsOpen(false);
      }
    }
  };

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-4 top-20 z-50 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          aria-label="Open guide navigation"
        >
          <BookOpen className="h-6 w-6 text-primary" />
        </button>

        <nav
          className={cn(
            "fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity z-50",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out",
              isOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="h-full overflow-y-auto px-4 py-6">
              {sections.map((section) => (
                <div key={section.id} className="py-2">
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "text-left font-medium w-full px-3 py-2 rounded-lg transition-colors",
                      activeSection === section.id
                        ? "text-primary bg-blue-50/80"
                        : "text-gray-600 hover:text-primary hover:bg-blue-50/50"
                    )}
                  >
                    {section.title}
                  </button>
                  
                  {section.subsections && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {section.subsections.map((subsection) => (
                        <li key={subsection.id}>
                          <button
                            onClick={() => scrollToSection(subsection.id)}
                            className={cn(
                              "text-sm w-full text-left px-3 py-2 rounded-lg transition-colors",
                              activeSubsection === subsection.id
                                ? "text-primary bg-blue-50/50 font-medium"
                                : "text-gray-500 hover:text-primary hover:bg-blue-50/30"
                            )}
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
          </div>
        </nav>
      </>
    );
  }

  return (
    <nav
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/95 backdrop-blur-sm border-r border-gray-100 transition-all duration-300 ease-in-out z-50",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="sticky top-0 flex justify-end p-2 bg-white/80 backdrop-blur-sm border-b border-gray-100">
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

      <div className={cn(
        "h-[calc(100%-3rem)] overflow-y-auto",
        collapsed ? "px-2" : "px-4"
      )}>
        {sections.map((section) => (
          <div key={section.id} className="py-2">
            <button
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "text-left font-medium transition-colors relative w-full rounded-lg",
                collapsed 
                  ? "w-8 h-8 p-1 hover:bg-blue-50" 
                  : "w-full px-3 py-2",
                activeSection === section.id
                  ? "text-primary bg-blue-50/80"
                  : "text-gray-600 hover:text-primary hover:bg-blue-50/50"
              )}
              title={collapsed ? section.title : undefined}
            >
              {collapsed ? section.title.charAt(0) : section.title}
            </button>
            
            {!collapsed && section.subsections && (
              <ul className="ml-4 mt-1 space-y-1">
                {section.subsections.map((subsection) => (
                  <li key={subsection.id}>
                    <button
                      onClick={() => scrollToSection(subsection.id)}
                      className={cn(
                        "text-sm w-full text-left px-3 py-2 rounded-lg transition-colors",
                        activeSubsection === subsection.id
                          ? "text-primary bg-blue-50/50 font-medium"
                          : "text-gray-500 hover:text-primary hover:bg-blue-50/30"
                      )}
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