'use client'

import { useOptimistic } from "react";
import { togglePostLikeStatus } from '@/actions/posts';
import Post from "./post";

export default function Posts({ posts }) { //(1)
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, function (prevPosts, updatedPostId) { //(2)

    const updatedPostIndex = prevPosts.findIndex(post => post.id === updatedPostId);
    if (updatedPostIndex === -1) return prevPosts;

    const updatedPost = { ...prevPosts[updatedPostIndex] }; //This is the same as -->  const updatedPost = prevPosts[updatedPostIndex]. We're basically cloning our object according to its id.
    updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
    updatedPost.isLiked = !updatedPost.isLiked;
    const newPosts = [...prevPosts]; //We store the spreaded item objects into a new array
    newPosts[updatedPostIndex] = updatedPost; //We finally update our new cloned array. In this case, we update an specific position of the array (that belongs to an object) with the updated object
    return newPosts;
  });

  if (!optimisticPosts || optimisticPosts.length === 0) return <p>There are no posts yet. Maybe start sharing some?</p>;

  async function updatePost(postId) {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {
        optimisticPosts.map(function(post){
          return (
            <li key={post.id}>
              <Post post={post} action={updatePost} />
            </li>
          )
        })
      }
    </ul>
  );

};

//(1)
//I wanna update my Posts here, which I'm outputting optimistically whenever the data for one of those posts changed. And I'm actually doing this here in the Posts component because it's actually the entire 
//posts array that's being fetched from the database for this posts page. And it's that entire list of posts that, in the end, got updated therefore.

//(2)
//Now we can call useOptimistic in the Posts component. 
//The first input it takes is the data with which we wanna start (posts). So, the data we fetched from the database.
//The second argument is a function that will be called automatically by React when you tell it to call it, that will update this posts array optimistically. 
//So this will be a function that changes this post array on the client side until the change has been processed on the server side, so that we can change it immediately, and then only sync it back with that server 
//side state once that server site update has been performed. For that, this function should then take two arguments, where the first argument is the old posts states. For example, the initial array 
//of posts. And the second argument is some data that allows us to perform the update. And it will be up to us to define which kind of data we expect here. In my case here, I expect to get the updatedPostId, so the 
//ID of the post that should switch from liked to not liked, or vice versa.