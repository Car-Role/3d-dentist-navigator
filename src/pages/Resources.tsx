import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookOpen, Video, Beaker, Users, Wrench, Printer, ArrowRight } from 'lucide-react';
import AIChatFAB from '../components/AIChatFAB';

const resourceCategories = [
  {
    id: 'manuals',
    title: 'Printer Manuals',
    description: 'Access detailed manuals and guides for popular dental 3D printers.',
    icon: Printer,
    image: '/images/printer-manual.jpg',
    links: [
      { title: 'SprintRay Pro Setup Guide', url: '#' },
      { title: 'NextDent 5100 Manual', url: '#' },
      { title: 'Asiga Max UV Guide', url: '#' },
    ]
  },
  {
    id: 'materials',
    title: 'Material Database',
    description: 'Comprehensive database of dental resins and their properties.',
    icon: Beaker,
    image: '/images/dental-resin.jpg',
    links: [
      { title: 'Model Resins Comparison', url: '#' },
      { title: 'Surgical Guide Materials', url: '#' },
      { title: 'Temporary Crown Resins', url: '#' },
    ]
  },
  {
    id: 'tutorials',
    title: 'Video Tutorials',
    description: 'Step-by-step video guides for various dental printing processes.',
    icon: Video,
    image: '/images/tutorial-preview.jpg',
    links: [
      { title: 'Print Setup Basics', url: '#' },
      { title: 'Post-Processing Guide', url: '#' },
      { title: 'Calibration Tutorial', url: '#' },
    ]
  },
  {
    id: 'research',
    title: 'Research Papers',
    description: 'Latest research on dental 3D printing technologies and materials.',
    icon: BookOpen,
    image: '/images/research-papers.jpg',
    links: [
      { title: 'Material Studies', url: '#' },
      { title: 'Clinical Applications', url: '#' },
      { title: 'Technology Reviews', url: '#' },
    ]
  },
  {
    id: 'community',
    title: 'Community Forum',
    description: 'Connect with other dental professionals using 3D printing.',
    icon: Users,
    image: '/images/community.jpg',
    links: [
      { title: 'Discussion Board', url: '#' },
      { title: 'Case Studies', url: '#' },
      { title: 'Tips & Tricks', url: '#' },
    ]
  },
  {
    id: 'software',
    title: 'Software Tools',
    description: 'Recommended software for dental CAD/CAM and print preparation.',
    icon: Wrench,
    image: '/images/software-tools.jpg',
    links: [
      { title: 'CAD Software Guide', url: '#' },
      { title: 'Slicer Settings', url: '#' },
      { title: 'Design Templates', url: '#' },
    ]
  },
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resource Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to master dental 3D printing, from technical guides to community insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourceCategories.map((category) => (
            <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <category.icon className="w-16 h-16 text-primary/70" />
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  {category.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {category.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {category.links.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.url}
                        className="flex items-center text-gray-600 hover:text-primary gap-2 group/link"
                      >
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Can't find what you're looking for? 
            <button className="text-primary hover:text-primary-dark font-medium ml-2">
              Ask our AI Assistant
            </button>
          </p>
        </div>
      </div>
      <AIChatFAB />
    </div>
  );
};

export default Resources;