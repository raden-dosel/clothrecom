import { model, models, Schema } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Please provide a prompt!"],
  },
  tag: {
    type: String,
    required: [true, "Please provide a tag!"],
  },
});

// Example of using pre-save middleware
PromptSchema.pre("save", function (next) {
  // Perform some action before saving the document

  console.log("A prompt is about to be saved:", this);
  next();
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
