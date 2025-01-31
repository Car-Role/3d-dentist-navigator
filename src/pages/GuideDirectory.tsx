import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookOpen, Video, Beaker, Users, Wrench, Printer, ArrowRight, Stethoscope, Search } from 'lucide-react';
import AIChatFAB from '../components/AIChatFAB';
import { Input } from "@/components/ui/input";

const resourceCategories = [
  {
    id: 'splints',
    title: 'Splints',
    description: 'Comprehensive guide for different types of dental splints and guards.',
    icon: Stethoscope,
    image: '/images/splints.jpg',
    links: [
      { title: 'MN Day Guard', sublinks: [
        { title: 'NTI', url: '/guide/getting-started' },
        { title: 'Michigan Style', url: '/guide/getting-started' },
        { title: 'Flat Plane', url: '/guide/getting-started' },
      ]},
      { title: 'MX Night Guard', sublinks: [
        { title: 'NTI', url: '/guide/getting-started' },
        { title: 'Michigan Style', url: '/guide/getting-started' },
        { title: 'Flat Plane', url: '/guide/getting-started' },
      ]},
    ]
  },
  {
    id: 'materials',
    title: 'Placeholder Title 1',
    description: 'Placeholder description text',
    icon: Beaker,
    image: '/images/dental-resin.jpg',
    links: [
      { title: 'Placeholder Category', sublinks: [
        { title: 'Placeholder Link 1', url: '#' },
        { title: 'Placeholder Link 2', url: '#' },
        { title: 'Placeholder Link 3', url: '#' },
      ]},
    ]
  },
  {
    id: 'tutorials',
    title: 'Placeholder Title 2',
    description: 'Placeholder description text',
    icon: Video,
    image: '/images/tutorial-preview.jpg',
    links: [
      { title: 'Placeholder Category', sublinks: [
        { title: 'Placeholder Link 1', url: '#' },
        { title: 'Placeholder Link 2', url: '#' },
        { title: 'Placeholder Link 3', url: '#' },
      ]},
    ]
  },
  {
    id: 'research',
    title: 'Placeholder Title 3',
    description: 'Placeholder description text',
    icon: BookOpen,
    image: '/images/research-papers.jpg',
    links: [
      { title: 'Placeholder Category', sublinks: [
        { title: 'Placeholder Link 1', url: '#' },
        { title: 'Placeholder Link 2', url: '#' },
        { title: 'Placeholder Link 3', url: '#' },
      ]},
    ]
  },
  {
    id: 'community',
    title: 'Placeholder Title 4',
    description: 'Placeholder description text',
    icon: Users,
    image: '/images/community.jpg',
    links: [
      { title: 'Placeholder Category', sublinks: [
        { title: 'Placeholder Link 1', url: '#' },
        { title: 'Placeholder Link 2', url: '#' },
        { title: 'Placeholder Link 3', url: '#' },
      ]},
    ]
  },
  {
    id: 'software',
    title: 'Placeholder Title 5',
    description: 'Placeholder description text',
    icon: Wrench,
    image: '/images/software-tools.jpg',
    links: [
      { title: 'Placeholder Category', sublinks: [
        { title: 'Placeholder Link 1', url: '#' },
        { title: 'Placeholder Link 2', url: '#' },
        { title: 'Placeholder Link 3', url: '#' },
      ]},
    ]
  },
];

const GuideDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter categories based on search term
  const filteredCategories = resourceCategories.filter(category => {
    const searchString = `${category.title} ${category.description} ${
      category.links.map(link => `${link.title} ${
        link.sublinks?.map(sublink => sublink.title).join(' ') || ''
      }`).join(' ')
    }`.toLowerCase();
    
    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Guide Directory</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Access comprehensive guides and documentation for all your dental practice needs.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-lg blur-xl group-hover:bg-primary/10 transition-all duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm shadow-sm rounded-lg border border-gray-200/50 hover:border-primary/20 transition-all duration-300">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-primary/70 transition-colors duration-300" />
                <Input
                  type="text"
                  placeholder="Search guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 bg-transparent pl-12 pr-4 py-6 text-lg placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-primary/30 rounded-lg"
                />
              </div>
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Showing {filteredCategories.length} {filteredCategories.length === 1 ? 'result' : 'results'}
              </p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <category.icon className="w-16 h-16 text-primary/70" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.links.map((link, index) => (
                    <li key={index}>
                      {link.url ? (
                        <Link 
                          to={link.url}
                          className="flex items-center text-gray-600 hover:text-primary gap-2 group/link"
                        >
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                          {link.title}
                        </Link>
                      ) : (
                        <div className="flex items-center text-gray-800 font-medium gap-2">
                          {link.title}
                        </div>
                      )}
                      {link.sublinks && (
                        <ul className="ml-4 mt-2 space-y-2">
                          {link.sublinks.map((sublink, subIndex) => (
                            <li key={subIndex}>
                              <Link 
                                to={sublink.url}
                                className="flex items-center text-gray-600 hover:text-primary gap-2"
                              >
                                <ArrowRight className="w-4 h-4 transition-transform hover:translate-x-1" />
                                {sublink.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <AIChatFAB />
    </div>
  );
};

export default GuideDirectory;
