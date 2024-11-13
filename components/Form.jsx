import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h3 className="text-left blue_gradient">
        <span className="text-transparent">{type} Post</span>
      </h3>
      <p className="text-left max-w-md">
        {type} and share amazing posts with the world, and let your imagination
        run wild with any AI-powered platform.
      </p>
      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 formbg"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="tag">Your AI Prompt</span>
          <textarea
            className="textarea"
            placeholder="Write your AI prompt here..."
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
          />
        </label>
        <label>
          <span className="tag">Tag</span>
          <input
            className="textinput"
            placeholder="Write your prompt tag here..."
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
          />
        </label>
        <div className="flex justify-end mx-3 mb-5  gap-4">
          <Link className="flex items-center text-gray-500 text-sm" href="/">
            Cancel
          </Link>
          <Button
            className="px-5 py-1.5 text-sm bg-primary rounded-full text-primary-foreground hover:bg-pink-500"
            type="submit"
            disabled={submitting}
          >
            {submitting ? `${type}ing...` : type}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Form;
