
import React, { useState } from 'react';
import { Scale, Utensils, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface FormData {
  weight: number;
  height: number;
  age: number;
  gender: string;
  activityLevel: string;
}

const BmiCalculator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    weight: 0,
    height: 0,
    age: 0,
    gender: 'male',
    activityLevel: 'moderate'
  });

  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');
  const [calorieNeeds, setCalorieNeeds] = useState<number | null>(null);
  const [mealPlan, setMealPlan] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'weight' || name === 'height' || name === 'age' ? parseFloat(value) : value
    });
  };

  const calculateBMI = () => {
    if (formData.weight <= 0 || formData.height <= 0) {
      toast({
        title: "Error",
        description: "Please enter valid weight and height values.",
        variant: "destructive"
      });
      return;
    }

    // BMI formula: weight (kg) / (height (m))^2
    const heightInMeters = formData.height / 100;
    const bmiValue = formData.weight / (heightInMeters * heightInMeters);
    setBmi(parseFloat(bmiValue.toFixed(1)));

    // Determine BMI category
    let category = '';
    if (bmiValue < 18.5) {
      category = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = 'Normal weight';
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }
    setBmiCategory(category);

    // Calculate daily calorie needs using Harris-Benedict equation (simplified)
    let bmr = 0;
    if (formData.gender === 'male') {
      bmr = 10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5;
    } else {
      bmr = 10 * formData.weight + 6.25 * formData.height - 5 * formData.age - 161;
    }

    // Apply activity factor
    let activityFactor = 1.2; // Sedentary
    if (formData.activityLevel === 'light') {
      activityFactor = 1.375;
    } else if (formData.activityLevel === 'moderate') {
      activityFactor = 1.55;
    } else if (formData.activityLevel === 'active') {
      activityFactor = 1.725;
    } else if (formData.activityLevel === 'very_active') {
      activityFactor = 1.9;
    }

    const dailyCalories = Math.round(bmr * activityFactor);
    setCalorieNeeds(dailyCalories);

    // Generate meal plan based on BMI category
    generateMealPlan(category, dailyCalories);

    // Save to Firebase (placeholder for now)
    saveToFirebase();
  };

  const generateMealPlan = (category: string, calories: number) => {
    let plan;
    
    if (category === 'Underweight') {
      plan = {
        breakfast: [
          'Oatmeal with banana, nuts, and honey',
          'Whole milk yogurt with granola and berries',
          'Protein smoothie with peanut butter'
        ],
        lunch: [
          'Chicken sandwich with avocado and cheese',
          'Rice bowl with beans, beef, and vegetables',
          'Pasta with meat sauce and a side salad'
        ],
        dinner: [
          'Salmon with sweet potato and steamed vegetables',
          'Chicken stir-fry with rice',
          'Beef stew with vegetables and bread'
        ],
        snacks: [
          'Mixed nuts and dried fruits',
          'Cheese and whole grain crackers',
          'Protein shake or smoothie'
        ]
      };
    } else if (category === 'Normal weight') {
      plan = {
        breakfast: [
          'Eggs with whole grain toast and avocado',
          'Greek yogurt with fruits and a drizzle of honey',
          'Oatmeal with berries and nuts'
        ],
        lunch: [
          'Grilled chicken salad with olive oil dressing',
          'Quinoa bowl with roasted vegetables and beans',
          'Turkey wrap with vegetables and hummus'
        ],
        dinner: [
          'Baked fish with steamed vegetables and brown rice',
          'Lean meat with roasted sweet potato and greens',
          'Veggie stir-fry with tofu and brown rice'
        ],
        snacks: [
          'Apple with peanut butter',
          'Greek yogurt',
          'Handful of nuts'
        ]
      };
    } else { // Overweight or Obese
      plan = {
        breakfast: [
          'Egg white omelet with vegetables',
          'Steel-cut oatmeal with berries (no added sugar)',
          'Greek yogurt (non-fat) with fruit'
        ],
        lunch: [
          'Large salad with grilled chicken and light dressing',
          'Veggie and bean soup with a small piece of whole grain bread',
          'Turkey lettuce wraps with vegetables'
        ],
        dinner: [
          'Baked fish with steamed vegetables',
          'Grilled chicken with roasted vegetables',
          'Tofu and vegetable stir-fry (minimal oil)'
        ],
        snacks: [
          'Celery sticks with hummus',
          'Cucumber slices',
          'Fresh fruit'
        ]
      };
    }
    
    setMealPlan(plan);
  };

  const saveToFirebase = () => {
    // This would normally connect to Firebase
    // For now we'll just show a success message
    toast({
      title: "Success",
      description: "Your health data has been saved!",
    });
    
    console.log("Data that would be saved to Firebase:", {
      ...formData,
      bmi,
      bmiCategory,
      calorieNeeds,
      timestamp: new Date()
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="p-6 bg-white shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-health-dark">BMI & Nutrition Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="weight">
                Weight (kg)
              </label>
              <Input
                type="number"
                id="weight"
                name="weight"
                placeholder="Enter your weight"
                value={formData.weight || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="height">
                Height (cm)
              </label>
              <Input
                type="number"
                id="height"
                name="height"
                placeholder="Enter your height"
                value={formData.height || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="age">
                Age
              </label>
              <Input
                type="number"
                id="age"
                name="age"
                placeholder="Enter your age"
                value={formData.age || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="activityLevel">
                Activity Level
              </label>
              <select
                id="activityLevel"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white"
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="very_active">Very Active (intense exercise daily)</option>
              </select>
            </div>
            
            <Button 
              onClick={calculateBMI} 
              className="w-full bg-health-primary hover:bg-opacity-90"
            >
              Calculate
            </Button>
          </div>
          
          <div className={`bg-health-blue rounded-lg p-4 ${bmi ? 'opacity-100' : 'opacity-50'}`}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5" /> Your Results
            </h3>
            
            {bmi ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Your BMI</p>
                  <p className="text-3xl font-bold">{bmi}</p>
                  <p className={`text-lg ${
                    bmiCategory === 'Normal weight' 
                      ? 'text-green-600' 
                      : bmiCategory === 'Underweight' 
                        ? 'text-blue-600' 
                        : 'text-health-warning'
                  }`}>
                    {bmiCategory}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <Activity className="h-4 w-4" /> Daily Calorie Needs
                  </p>
                  <p className="text-2xl font-bold">{calorieNeeds} calories</p>
                </div>
                
                {mealPlan && (
                  <div>
                    <p className="text-sm font-medium flex items-center gap-1 mb-2">
                      <Utensils className="h-4 w-4" /> Suggested Meal Plan
                    </p>
                    <div className="text-sm space-y-2">
                      <details className="bg-white p-2 rounded">
                        <summary className="font-semibold cursor-pointer">Breakfast Ideas</summary>
                        <ul className="list-disc pl-5 mt-2">
                          {mealPlan.breakfast.map((meal: string, index: number) => (
                            <li key={index}>{meal}</li>
                          ))}
                        </ul>
                      </details>
                      
                      <details className="bg-white p-2 rounded">
                        <summary className="font-semibold cursor-pointer">Lunch Ideas</summary>
                        <ul className="list-disc pl-5 mt-2">
                          {mealPlan.lunch.map((meal: string, index: number) => (
                            <li key={index}>{meal}</li>
                          ))}
                        </ul>
                      </details>
                      
                      <details className="bg-white p-2 rounded">
                        <summary className="font-semibold cursor-pointer">Dinner Ideas</summary>
                        <ul className="list-disc pl-5 mt-2">
                          {mealPlan.dinner.map((meal: string, index: number) => (
                            <li key={index}>{meal}</li>
                          ))}
                        </ul>
                      </details>
                      
                      <details className="bg-white p-2 rounded">
                        <summary className="font-semibold cursor-pointer">Snack Ideas</summary>
                        <ul className="list-disc pl-5 mt-2">
                          {mealPlan.snacks.map((snack: string, index: number) => (
                            <li key={index}>{snack}</li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Enter your information and click "Calculate" to see your results</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BmiCalculator;
