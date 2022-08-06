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
import { MdDelete } from "react-icons/md";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
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

  return (
    <div className="flex w-full h-full flex-wrap left-0 top-[60px] md-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center">
      <div className="bg-white rounded-lg lg:w-[1100px] xl:h-[80vh] p-14 ">
        <div>
          <p className="text-2xl font-bold">Upload Video</p>
          <p className="text-md text-gray-400 mt-1">
            Post a video to your account
          </p>
        </div>
        <div className=" flex gap-6  flex-row mt-10">
          <div className="border-dashed rounded-xl border-2 border-gray-200 flex flex-col justify-center items-center outline-none w-[260px] h-[400px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading... </p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      controls
                      className="rounded-xl h-[450px] mt-16 bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
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
              </div>
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
            theme = 'dark'
            transition = {Slide}
          />

          <div className="flex flex-col gap-3 pb-10 w-full">
            <label className="text-md font-medium">Caption</label>
            <input
              type="text"
              value=""
              onChange={() => {}}
              className="rounded outline-none text-md border-[1px] border-gray-200 p-2"
            />
            <label className="text-md font-medium">Choose a Category</label>
            <select
              onChange={() => {}}
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
                onClick={() => {}}
                type="button"
              >
                Discard
              </button>
              <button
                className="bg-[#fe2c55] text-white  text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                onClick={() => {}}
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
