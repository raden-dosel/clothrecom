"use client";

import { useState, useEffect } from "react";
import Card from "./Card";

const Feed = () => {
  //Search functionality
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // Filter prompts function
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  // Handle search change function
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  // Handle tag click function
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  // Fetch posts useState
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // Fetch posts useEffect
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); // Set loading to true
      const response = await fetch("/api/prompt");
      const data = await response.json();
      console.log(data);
      if (!data || data.length === 0) {
        console.log("No data available");
        setIsLoading(false);
        return;
      } else {
        setPosts(data); // Set posts to data
        console.log("Data is not empty");
        setIsLoading(false); // Set loading to false after fetching
        console.log("data:", data);
      }
    };

    fetchPosts();
  }, []);

  console.log("Fetching posts:");
  console.log(posts);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          className="search_input peer"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      {isLoading ? (
        <p>Loading Posts...</p>
      ) : (
        <>
          {/* All Prompts */}
          {searchText ? (
            <CardList data={searchedResults} handleTagClick={handleTagClick} />
          ) : (
            <CardList data={posts} handleTagClick={handleTagClick} />
          )}
        </>
      )}
    </section>
  );
};

const CardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.length > 0 ? (
        data.map((post) => (
          <Card key={post._id} post={post} handleTagClick={handleTagClick} />
        ))
      ) : (
        <p>No posts available. Please check back later.</p>
      )}
    </div>
  );
};

export default Feed;
