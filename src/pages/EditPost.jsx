import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/confg";
import { Container, PostForm } from "../components";

function EditPost() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    // console.log(post)
    if (slug) {
      service.getPost(slug).then((posts) => {
        posts && setPost(posts);
      });
    } else {
      navigate("/");
    }
  }, [slug,navigate]);

  return post?(
    <div>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ):null;
}

export default EditPost;
