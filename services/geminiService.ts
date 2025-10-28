
import { GoogleGenAI, Type } from "@google/genai";
import { AssociationRule } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        antecedent: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "The 'if' part of the rule. An array of item names.",
        },
        consequent: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "The 'then' part of the rule. An array of item names.",
        },
        confidence: {
          type: Type.NUMBER,
          description: "The probability of seeing the consequent in a transaction given the antecedent is also present. A value between 0 and 1.",
        },
        support: {
          type: Type.NUMBER,
          description: "The fraction of transactions that contain both the antecedent and the consequent. A value between 0 and 1.",
        },
        suggestion: {
          type: Type.STRING,
          description: "A short, actionable shelf placement suggestion in plain English based on this rule.",
        },
      },
      required: ["antecedent", "consequent", "confidence", "support", "suggestion"],
    },
};


export const analyzeTransactions = async (
  csvData: string,
  minSupport: number,
  minConfidence: number
): Promise<AssociationRule[]> => {
  const prompt = `
    You are an expert data analyst specializing in Association Rule Mining for retail market basket analysis.
    Your task is to analyze the following customer transaction data provided in CSV format. Each line represents a single transaction, and the items in that transaction are separated by commas.

    Analyze this data to find strong association rules that reveal which products are frequently purchased together.
    
    Please adhere to these parameters for your analysis:
    - Minimum Support: ${minSupport.toFixed(3)}
    - Minimum Confidence: ${minConfidence.toFixed(3)}

    Return the results as a JSON array, where each object represents a single association rule and strictly follows the provided JSON schema. Ensure the antecedent and consequent do not contain the same items. Only include rules that meet the minimum support and confidence thresholds.

    Here is the transaction data:
    ---
    ${csvData}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText);
    
    if (!Array.isArray(parsedResult)) {
        throw new Error("AI response is not a valid array.");
    }

    // Sort results by confidence descending
    return parsedResult.sort((a, b) => b.confidence - a.confidence);

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from AI. Please check the data format and try again.");
  }
};
