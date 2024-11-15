"use client";

import React from "react";
import { useState, useEffect, Suspense } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = (e) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);

      if (response.ok) {
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("Prompt ID is required to update a prompt");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("An unexpected error happened in updating prompt:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

const UpdatePromptPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <UpdatePrompt />
  </Suspense>
);

export default UpdatePromptPage;
