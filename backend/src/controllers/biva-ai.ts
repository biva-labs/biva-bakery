import Groq from "groq-sdk"
import { configDotenv } from "dotenv";
import { PROMPT } from "./prompt.ts";
import { string } from "zod";
import type { Context } from "hono";

configDotenv()

const groq = new Groq({
    apiKey: process.env.GROQ_SECRET,
})

export async function bivaAiChat(c: Context) {
    const body = await c.req.json()
    const query = body.query;

    if (typeof query !== 'string' || query.trim() === '') {
        return c.json({ error: "Missing or invalid 'query' in request body." }, 400);
    }

    const completion = await getGroqChatCompletion(query);
    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
        return c.json({error: "No response from Groq API."}, 500)
    }

    return c.json({content: responseContent})
}

export const getGroqChatCompletion = async (query: string) => {
    return groq.chat.completions.create({
        messages: [
      // Set an optional system message. This sets the behavior of the
      // assistant and can be used to provide specific instructions for
      // how it should behave throughout the conversation.
      {
        role: "system",
        content: PROMPT,
      },
      // Set a user message for the assistant to respond to.
      {
        role: "user",
        content: query,
      },
    ],
    model: "openai/gpt-oss-20b",
    max_completion_tokens: 500,
    })
}