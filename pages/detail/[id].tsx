import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

import axios from "axios";
import { BASE_URL } from "../../utils";
import { Video } from "../../types";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  if (!post) return null;

  const onVideoClick = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      videoRef.current?.play();
      setPlaying(true);
    }
  };

  return (
    <div className="flex w-full z-20 absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 gap-6 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              loop
              muted={isVideoMuted}
              onClick={onVideoClick}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            ></video>
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
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
      </div>

      <div className="relative w-[1000px] pt-8 md:w-[900px] lg:w-[700px]">
        <div className="">
          <div className="flex items-center gap-3 px-8 py-4 cursor-pointer font-semibold rounded">
            <div className=" w-10 h-10 ml-4">
              <Link href="https://">
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
              <Link href="/">
                <div className=" flex flex-col gap-1">
                  <p className="flex gap-2 items-center text-lg font-bold text-primary">
                    {post.postedBy.userName}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize text-sm  text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: {
      postDetails: data,
    },
  };
};

export default Detail;
