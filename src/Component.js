import React from "react";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
function Component() {
  //pagination
  const [posts, setPosts] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  //input usestate
  const [input, setInput] = useState("");
  //main url
  const url = `https://hn.algolia.com/api/v1/search?query=${input}`;

  //submit handler function
  const handleSubmit = (e) => {
    if(!input){
     alert("Type in the input given to search ")
    }
    e.preventDefault();
    fetchData();
  };

  //users fetcher function
  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data.hits);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //;ogic for posts 10
  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage);
  const paginate = (presentNumber) => {
    setLoading(true);
    setCurrentPage(presentNumber);
    setLoading(false)
  };

  //remove function
  const handleRemove = (objectID) => {
    const newUsers = posts.filter((user) => user.objectID !== objectID);
    console.log(newUsers);
    setPosts(newUsers);
  };
  const pageNumbers = [];
  //the dom shower
  return (
    <>
      <div className="container w-[70%] my-10 mx-auto">
        <h1 className="text-3xl font-bold ">Search Hacker News</h1>
        <form action="#" type="submit">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
              className="uppercase border-b-blue-900  my-4 block bg-[#f1f5f8] w-[50%] border py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              type="text"
              name="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="block md:hidden  bg-slate-400 text-white p-2 my-2 rounded-md"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </form>

        <div className="users">
          <Pagination
            totalPosts={posts.length}
            postsPerPage={postsPerPage}
            paginate={paginate}
          />
          {/* loader */}
          {loading && (
            <div class="loading-container py-56">
              <div class="loading"></div>
            </div>
          )}

          {currentPosts.map((user) => {
            const { author, title, num_comments, objectID, url } = user;
            return (
              <div className="m-2 single-news shadow-md w-[auto] bg-white my-5 p-8  border rounded-md">
                <h2 className="m-2  font-bold ">{title}</h2>
                <p className="m-2 ">
                  {author}
                  <span> | {num_comments} comments</span>
                </p>
                <button className="rounded-md btn bg-gray-500 m-2 py-1 px-1 text-white">
                  <a href={url} target="_blank">
                    Read More
                  </a>
                </button>
                <button
                  className="rounded-md btn bg-red-500 m-2 py-1 px-1 text-white"
                  onClick={() => handleRemove(objectID)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Component;
