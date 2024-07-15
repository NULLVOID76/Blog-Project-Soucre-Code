import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/confg";
import { Query } from "appwrite";
import { useSelector } from "react-redux";

function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  const userData = useSelector((state) => state.userData);
  service.getPosts([Query.equal("UserId",userData.$id)]).then((post) => {
    post && setPosts(post.documents);
  });

  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
