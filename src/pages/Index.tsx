
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BmiCalculator from '@/components/BmiCalculator';
import AboutSection from '@/components/AboutSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4 mb-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-health-dark">
              Your Healthy Journey Starts Here
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate your BMI, discover your daily calorie needs, and get personalized meal suggestions to support your health goals.
            </p>
          </div>
          
          <BmiCalculator />
          <AboutSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
