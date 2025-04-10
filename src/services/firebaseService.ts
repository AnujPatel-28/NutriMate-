
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

interface HealthData {
  weight: number;
  height: number;
  age: number;
  gender: string;
  activityLevel: string;
  bmi: number;
  bmiCategory: string;
  calorieNeeds: number;
}

export const saveHealthData = async (healthData: HealthData) => {
  try {
    // This would normally save to Firebase
    // For demonstration, we're just returning the data
    // To actually save to Firebase, uncomment the code below:
    
    /*
    const docRef = await addDoc(collection(db, "healthData"), {
      ...healthData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
    */
    
    console.log("Data would be saved to Firebase:", healthData);
    return "dummy-id-12345";
  } catch (error) {
    console.error("Error saving health data: ", error);
    throw error;
  }
};
