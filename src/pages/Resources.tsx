import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const printTypes = [
  {
    id: 'surgical-guides',
    title: 'Surgical Guides',
    description: 'Precise guides for implant placement and surgical procedures.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dental-models',
    title: 'Dental Models',
    description: 'Accurate replicas for treatment planning and patient education.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'temporary-crowns',
    title: 'Temporary Crowns',
    description: 'Custom-fit provisional restorations for immediate placement.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'aligners',
    title: 'Clear Aligners',
    description: 'Custom orthodontic aligners for teeth straightening.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dentures',
    title: 'Digital Dentures',
    description: 'Fully customized dentures with precise fit and aesthetics.',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
  },
];

const Resources = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Dental 3D Printing Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive guides for different types of dental 3D prints
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {printTypes.map((print) => (
            <Link to={`/guide/${print.id}`} key={print.id}>
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <img
                  src={print.image}
                  alt={print.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle className="text-primary">{print.title}</CardTitle>
                  <CardDescription>{print.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-primary-dark hover:underline">
                    View Guide →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Resources;