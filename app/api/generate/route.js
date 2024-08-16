import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const systemPrompt = `
You are a flashcard creator. Your task is to generate a flashcard based on the given topic or content. Follow these guidelines to create a flashcard:

1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of questions types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information. 
8. Tailor the difficulty level of the flashcards to the user's specific preferences.
9. If givena body of text, extract the most important and relevatn information for the flashcard.
10. Aim to create a balnced set of flashcards that cover the topic comprehensively.

Remember, the goal is to facilitate effective learning and retention of information through the use of flashcards.

Return in the following JSON format:
{
 "flashcard":[{
  "front": str,
  "back": str
 }]
}`;

export async function POST(req) {
  const openai = new OpenAI();
  const data = await req.text();

  // Use OpenAI's chat.completion.create method to generate flashcards based on the user's input
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt }, // Provide the system prompt to guide the model
      { role: "user", content: data }, // Pass the user's input as a message
    ],
    model: "gpt-4o", // Specify the model to use for generating the flashcards
    response_format: { type: "json_object" }, // Specify the response format as JSON object
  });

  // Parse the generated flashcards from the completion response
  const flashcards = JSON.parse(completion.choices[0].message.content);

  // Return the generated flashcards in JSON format
  return NextResponse.json(flashcards.flashcards);
}
