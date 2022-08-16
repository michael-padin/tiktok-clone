import React, { useState, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

//icons
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

import { Video } from "../types";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const onVideoPress = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      videoRef.current?.play();
      setPlaying(true);
    }
  };



  return (
    <div className="flex p-5 lg:py-5 flex-col border-b-[1px] border-gray-200  w-full">
      <div>
        <div className="flex gap-3 lg:p-2 pr-0 cursor-pointer font-semibold rounded items-center">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image
                  src={post.postedBy.image}
                  width={62}
                  height={62}
                  className="rounded-full"
                  alt="profile photo"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div className="">
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center  gap-2">
                <p className="flex gap-2 items-center  md:text-md font-bold text-primary">
                  {post.postedBy.userName}
                  <FaCheckCircle className="text-[#20d5ec] text-md" />
                </p>
                <p className="capitalize text-xs  text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="my-3 lg:mt-2 lg:mb-3 lg:ml-16 lg:max-w-[70%]">
          <span className="font-normal text-md text-gray-600 ">
            {post.caption}
          </span>
        </div>
      </div>
      <div className="lg:ml-16 flex gap-4 ">
        <div
          className="rounded-3xl relative bg-black flex flex-wrap items-center justify-center h-[600px] w-[336px]"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              playsInline
              ref={videoRef}
              src={post.video.asset.url}
              loop
              muted={isVideoMuted}
              className=" object-cover rounded-2xl cursor pointer h-full"
            ></video>
          </Link>
          {isHover && (
            <div className="absolute bottom-6 cursor-pointer  left-0 right-0 flex gap-10 justify-between p-3 ">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-white text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-white text-2xl lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
