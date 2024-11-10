import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";
//GET (read)
export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found.", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error("Error fetching prompts:", error); // Log the error for more details
    return new Response("Error fetching prompts.", { status: 500 });
  }
};

//PATCH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json(); // Destructure the prompt and tag from the request body to update
  try {
    await connectDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found.", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.error("Error updating prompt:", error); // Log the error for more details
    return new Response("Error updating prompt.", { status: 500 });
  }
};

//DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

    if (!deletedPrompt)
      return new Response("Prompt not found.", { status: 404 });

    return new Response(JSON.stringify(deletedPrompt), { status: 200 });
  } catch (error) {
    console.error("Error deleting prompt:", error); // Log the error for more details
    return new Response("Error deleting prompt.", { status: 500 });
  }
};
