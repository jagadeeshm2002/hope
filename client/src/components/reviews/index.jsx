import { Button, Rating } from "@material-tailwind/react";
import React, { useEffect, useState, useMemo } from "react";

export default function Reviews() {
  
  return (
    <div className="flex flex-col-reverse xl:flex-row w-full gap-5">
      <div className="w-full xl:w-1/2">
        <ReviewForm />
      </div>
      <div className="grid grid-cols-1 gap-4 w-full xl:w-1/2 h-full">
        {/* <ReviewCard/> */}
        {[...Array(2).keys()].map((val) => (
          <ReviewCard key={val} />
        ))}
      </div>
    </div>
  );
}

export function ReviewCard() {
  return (
    <div className="bg-white shadow-lg rounded-lg w-full p-3 flex flex-row gap-2 h-full ">
      <div className="flex justify-center items-start w-16">
        <p className="rounded-full bg-pink-400 w-9 h-9 mt-2 text-center text-xl font-semibold text-white">
          {/* {"jaga"?.charAt(0).toUpperCase() || 'S'} */}
        s</p>
      </div>
      <div className="flex flex-col w-full "> 
        <div className="flex flex-col items-start w-full">
          <div className="flex justify-between flex-row w-full">
            <p className="font-semibold">Rating for review</p> 
            <Rating value={4} readonly className="" />
          </div>
          <p className="text-xs text-gray-700">Thursday,Apr 11,2024</p>
        </div>
        <div className="flex-grow items-start mt-2">
          <p className="text-start "> 
            description for product review Lorem ipsum dolor sit amet Lorem
          </p>
        </div>
      </div>
    </div>
  );
}

export function ReviewForm(onSubmit) {
  const initialValues = useMemo(
    () => ({
      title: "",
      comment: "",
      starRate: 5,
      recommend: "yes",
    }),
    []
  );

  const [title, setTitle] = useState(initialValues.title || "");
  const [comment, setComment] = useState(initialValues.comment || "");
  const [starRate, setStarRate] = useState(initialValues.starRate || 5);
  const [recommend, setRecommend] = useState(initialValues.recommend || "yes");
  const [success, setSuccess] = useState(false);

  const [titleErr, setTitleErr] = useState(false);
  const [commentErr, setCommentErr] = useState(false);

  useEffect(() => {
    // Clear errors on rerender (e.g., edit mode)
    setTitleErr(false);
    setCommentErr(false);
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidForm = validate();
    if (isValidForm) {
      // onSubmit({ title, comment, starRate, recommend });

      setSuccess(true);

      setTitle(initialValues.title || "");
      setComment(initialValues.comment || "");
      setStarRate(initialValues.starRate || 5);
      setRecommend(initialValues.recommend || "yes");
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const validate = () => {
    let isValid = true;
    setTitleErr(false);
    setCommentErr(false);

    if (!title.trim()) {
      setTitleErr(true);
      isValid = false;
    }

    if (!comment.trim()) {
      setCommentErr(true);
      isValid = false;
    }

    return isValid;
  };
  return (
    <div className="bg-white shadow-lg rounded-lg w-full  p-3">
      {success ? (
        <div className="flex justify-center items-center w-full h-52">
          <p className=""> Thank you for your review</p>
        </div>
      ) : (
        <>
          <p className="text-lg font-semibold text-start mx-3 mb-3">
            Write a Review
          </p>
          <hr className="my-2" />
          <form
            className="flex flex-col items-start justify-center w-full gap-2 px-3"
            onSubmit={handleSubmit}
          >
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={` w-full border rounded-md bg-blue-gray-50 px-2 py-1 ${
                titleErr ? "border-red-800" : "border-gray-300"
              }`}
              placeholder="Enter Review Title"
            />
            <p
              className={`${
                titleErr ? "block" : "hidden"
              } text-red-500 text-sm`}
            >
              *Title Required
            </p>
            <label htmlFor="comment">commment</label>
            <textarea
              type="text"
              name="comment"
              id="comment"
              placeholder="write Review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={` w-full border rounded-md bg-blue-gray-50 px-2 py-1 ${
                commentErr ? "border-red-800" : "border-gray-300"
              }`}
            />
            <p
              className={`${
                commentErr ? "block" : "hidden"
              } text-red-500 text-sm`}
            >
              *comment Required
            </p>
            <label htmlFor="rating" className="mt-4">
              Rating
            </label>
            <Rating value={starRate} onChange={(val) => setStarRate(val)} />
            <label htmlFor="recommend">Will you recommend this product?</label>
            <select
              name="recommend"
              id="recommend"
              defaultValue={recommend}
              onChange={(e) => setRecommend(e.target.value)}
              className=" w-full border rounded-md bg-blue-gray-50 border-gray-300 px-2 py-1"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <Button className="my-4  " type="none">
              Share a Review
            </Button>
          </form>{" "}
        </>
      )}
    </div>
  );
}
