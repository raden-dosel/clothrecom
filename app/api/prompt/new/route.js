import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 200 });
  } catch (error) {
    console.error(
      "An unexpected error happened in connecting to the database in create post:",
      error
    );
    return new Response("Failed to create new post", { status: 500 });
  }
};
