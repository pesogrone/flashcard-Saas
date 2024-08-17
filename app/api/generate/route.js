import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const systemPrompt = `
You are a interview flashcard creator. Your task is to generate a flashcard for an interview based on the given role and other instructions. Follow these guidelines to create a flashcard:

1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of questions types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information. 
8. Tailor the difficulty level of the flashcards to the user's specific preferences.
9. If given a body of text, extract the most important and relevant information for the flashcard.
10. Aim to create a balanced set of flashcards that cover the topic comprehensively.
11. Only generate 10 flashcards at a time to maintain focus and avoid information overload.

Remember, the goal is to facilitate effective learning and retention of information through the use of flashcards.

Return in the following JSON format:
{
 "flashcards":[{
  "front": str,
  "back": str
 }]
}`;

export async function POST(req) {
  const openai = new OpenAI({apiKey: process.env.OPENAI_API_SECRET_KEY});
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

  // console.log(completion.choices[0].message.content);
  // Parse the generated flashcards from the completion response
  const flashcards = JSON.parse(completion.choices[0].message.content);

  // Return the generated flashcards in JSON format
  return NextResponse.json(flashcards.flashcards);
}
