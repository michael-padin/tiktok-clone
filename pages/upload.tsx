import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import axios from "axios";

import { SanityAssetDocument } from "@sanity/client";

import useAuthStore from "../store/authStore";

// react-toastify
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//utilities
import { client } from "../utils/client";
import { topics } from "../utils/constants";

//icons
import { FaCloudUploadAlt } from "react-icons/fa";
import { BASE_URL } from "../utils";

const Upload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");
  const [category, setCategory] = useState<string>(topics[0].name);
  const [savingPost, setSavingPost] = useState<boolean>(false);

  const { userProfile }: { userProfile: any } = useAuthStore();

  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      setIsLoading(true);
      await client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);
      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };
      await axios.post(`${BASE_URL}/api/post`, document);
      router.push("/");
    }
  };

  useEffect(() => {
    wrongFileType &&
      toast.error("Please upload a valid file type", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    return () => {
      setWrongFileType(false);
    };
  }, [wrongFileType]);

  const handleDiscard = () => {
    setVideoAsset(undefined);
    setCaption("");
    setCategory(topics[0].name);
  };

  return (
    <div className="flex z-20 absolute overflow-x-hidden w-full flex-wrap inset-0 pt-20 lg:pt-20 lg:bg-[#f8f8f8] bg-[#ffff]  justify-center">
      <div className="bg-white rounded-lg lg:w-[1100px] xl:h-[80vh]  p-14 py-6 ">
        <div>
          <p className="text-2xl font-bold">Upload Video</p>
          <p className="text-md text-gray-400 mt-1">
            Post a video to your account
          </p>
        </div>
        <div className=" flex gap-6  sm:flex-col lg:flex-row mt-10">
          <div className="border-dashed rounded-xl border-2 border-gray-200 flex flex-col justify-center items-center outline-none w-[260px] h-[400px] cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p className="p-10">Uploading... </p>
            ) : (
              <>
                {videoAsset ? (
                  <video
                    src={videoAsset.url}
                    controls
                    className="rounded-xl h-full w-full bg-black "
                  ></video>
                ) : (
                  <label className="cursor-pointer  p-10">
                    <div className="flex flex-col items-center h-full">
                      <div className="flex flex-col items-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">Upload Video</p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or ogg <br />
                        720x1280 or higher <br />
                        UP to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p className="bg-[#fe2c55] text-center mt-10 rounded text-white text-md font-medium p-3 w-52 outline-none">
                        Select File
                      </p>
                      <input
                        type="file"
                        name="upload-video"
                        className="w-0 h-0"
                        onChange={uploadVideo}
                      />
                    </div>
                  </label>
                )}
              </>
            )}
          </div>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Slide}
          />

          <div className="flex flex-col gap-3 pb-10 w-full">
            <label className="text-md font-medium">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="rounded outline-none text-md border-[1px] border-gray-200 p-2"
            />
            <label className="text-md font-medium">Choose a Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none border-[1px] border-gray-200 text-md capitalize p-2 rounded cursor-pointer lg:w-[50%]"
            >
              {topics.map((topic) => (
                <option
                  key={topic.name}
                  value={topic.name}
                  className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                >
                  {topic.name}
                </option>
              ))}
            </select>
            <div className="flex gap-6 mt-10 ">
              <button
                className="border-gray-300 border-[1px] text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                onClick={handleDiscard}
                type="button"
              >
                Discard
              </button>
              <button
                className="bg-[#fe2c55] text-white  text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                onClick={handlePost}
                type="button"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
