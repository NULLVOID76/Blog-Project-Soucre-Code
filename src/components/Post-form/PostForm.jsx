import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "..";
import service from "../../appwrite/confg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  // console.log(post);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        Title: post?.Title || "",
        slug: post?.$id || "",
        Content: post?.Content || "",
        Status: post?.Status || "Active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const submit = async (data) => {
    console.log(post,data);
    if (post) {
      const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
      console.log(file);
      file && service.deleteFile(post.featuredImage);
      const dbPost = await service.updatePost(post.$id, {...data,featuredImage: file ? file.$id : undefined});
      dbPost && navigate(`/post/${dbPost.$id}`);

    } else {
    
      const file = await service.uploadFile(data.image[0]);
      if (file) {

        data.featuredImage = file.$id;
        const dbPost = await service.createPost({
          ...data,
          UserId: userData.$id,
        });
        dbPost && navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransfrom = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
  }, []);

  useEffect(() => {
    const subcription = watch((value, { name }) => {
      if (!post && name === "Title") {
        setValue("slug", slugTransfrom(value.Title), { shouldValidate: true });
      }
    });
  }, [watch, slugTransfrom, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("Title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          disabled
          // onInput={(e) => {
            
          //   setValue("slug", slugTransfrom(e.currentTarget.value), {
          //     shouldValidate: true,
          //   });
          // }}
        />
        <RTE
          label="Content :"
          name="Content"
          control={control}
          defaultValue={getValues("Content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["Active", "Inactive"]}
          label="Status"
          className="mb-4"
          {...register("Status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
