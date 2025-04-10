
import React from 'react';
import { Info, Heart, Leaf } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">About Healthy You Journey</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-health-green bg-opacity-40 flex flex-col items-center text-center">
          <Info className="h-10 w-10 mb-4 text-health-primary" />
          <h3 className="text-xl font-semibold mb-2">BMI Information</h3>
          <p>
            Body Mass Index (BMI) is a value derived from a person's weight and height. 
            It provides a simple measure to classify weight categories that may lead to health issues.
          </p>
        </Card>
        
        <Card className="p-6 bg-health-blue bg-opacity-40 flex flex-col items-center text-center">
          <Heart className="h-10 w-10 mb-4 text-health-primary" />
          <h3 className="text-xl font-semibold mb-2">Health Benefits</h3>
          <p>
            Maintaining a healthy BMI can reduce the risk of heart disease, type 2 diabetes, 
            certain cancers, and improve overall quality of life.
          </p>
        </Card>
        
        <Card className="p-6 bg-health-green bg-opacity-40 flex flex-col items-center text-center">
          <Leaf className="h-10 w-10 mb-4 text-health-primary" />
          <h3 className="text-xl font-semibold mb-2">Nutrition Matters</h3>
          <p>
            Proper nutrition is key to maintaining a healthy weight. Our meal plans 
            provide simple guidance based on your individual needs.
          </p>
        </Card>
      </div>
      
      <div className="mt-8 text-center text-gray-600">
        <p className="max-w-2xl mx-auto">
          <strong>Disclaimer:</strong> This tool provides general guidance and is not a substitute 
          for professional medical advice. Always consult with healthcare professionals before 
          making significant changes to your diet or exercise routine.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
