"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Card = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const router = useRouter();
  const pathName = usePathname();
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <p className="font-semibold ">{post.creator.username}</p>
            <p className="limp">{post.creator.email}</p>
          </div>
        </div>

        {/** Copy Button */}

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
      </div>
      <p className="prompt_content">{post.prompt}</p>
      <p
        className="prompt_tag blue_gradient"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex justify-center gap-4 border-t border-gray-300 pt-3">
          <p
            className="green_gradient text-sm cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="red_gradient text-sm cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
