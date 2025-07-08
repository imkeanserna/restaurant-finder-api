import Groq from "groq-sdk";
import { RestaurantSearchParams } from "../types/restaurantTypes";
import { LLMError } from "../utils/errors";

export class LLMService {
  private groq: Groq;

  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY!,
    });
  }

  async convertMessageToSearchParams(
    message: string,
  ): Promise<RestaurantSearchParams> {
    try {
      const response = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a restaurant search assistant. Convert user queries into structured JSON commands for restaurant search.

The JSON should follow this exact schema:
{
  "action": "restaurant_search",
  "parameters": {
    "query": "food type or restaurant name",
    "near": "location (city, neighborhood, address)",
    "price": "1|2|3|4" (1=cheap, 2=moderate, 3=expensive, 4=very expensive),
    "open_now": true/false,
    "rating": {
      "min": minimum_rating_number,
      "max": maximum_rating_number,
      "operator": "gte|lte|eq|between"
    },
    "limit": number_of_results (default 10, max 50)
  }
}

Rating Rules:
- "at least X stars" or "X+ stars" → {"min": X, "operator": "gte"}
- "below X stars" or "under X stars" → {"max": X, "operator": "lte"}
- "exactly X stars" → {"min": X, "max": X, "operator": "eq"}
- "between X and Y stars" → {"min": X, "max": Y, "operator": "between"}
- "good rating" → {"min": 4, "operator": "gte"}
- "decent rating" → {"min": 3, "operator": "gte"}
- "poor rating" or "bad rating" → {"max": 2, "operator": "lte"}

Rules:
- Only include parameters that are explicitly mentioned or strongly implied
- For price: 1=cheap/budget, 2=moderate/mid-range, 3=expensive/upscale, 4=very expensive/luxury
- For rating: extract minimum rating if mentioned (e.g., "4-star" = 4, "good rating" = 4)
- For open_now: only set to true if specifically mentioned
- Return ONLY valid JSON, no additional text or explanation
- If the query is not about restaurants, return: {"action": "invalid", "error": "Query is not about restaurant search"}`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        model: process.env.GROQ_LLM_MODEL!,
        temperature: 0.1,
        max_completion_tokens: 200,
        top_p: 1,
        stream: false,
        stop: null,
      });

      const content: string | null = response.choices[0].message.content;

      if (!content) {
        throw new LLMError("No response from llm service groq");
      }

      const cleanedContent = this.extractJSON(content);

      const parseJSON = JSON.parse(cleanedContent);

      if (parseJSON === "Invalid") {
        throw new LLMError(parseJSON.error || "Invalid query");
      }

      return parseJSON.parameters;
    } catch (error) {
      throw new LLMError("Failed to parse restaurant search request");
    }
  }

  private extractJSON(content: string): string {
    const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
    const match: RegExpMatchArray | null = content.match(codeBlockRegex);

    if (match) return match[1].trim();
    return content.trim();
  }
}
