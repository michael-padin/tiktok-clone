import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

// icons
import { FaCheckCircle, FaCommentDots } from "react-icons/fa";
import { CgClose} from "react-icons/cg";
import { BsFillPlayFill } from "react-icons/bs";

import axios from "axios";
import { BASE_URL } from "../../utils";
import { Video } from "../../types";

// global store
import useAuthStore from "../../store/authStore";

//components
import Comments from "../../components/Comments";
import LikeButton from "../../components/LikeButton";

// react-toastify
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImVolumeMedium, ImVolumeMute2 } from 'react-icons/im';

//types
interface IProps {
  postDetails: Video;
}

const CommentsMemo = React.memo(Comments);

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const { userProfile }: any = useAuthStore();

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

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      setPost({ ...post, likes: data.likes });
    } else {
      toast.error("Please log in to like and comment", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const addComment = async (e: any) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });
      setPost({ ...post, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };

  return (
    <div className="flex w-full z-40 absolute lg:fixed inset-0 bg-white flex-wrap lg:flex-nowrap  ">
      <div className="relative  flex-1 basis-[896px] shrink lg:w-9/12 flex justify-center items-center bg-black ">
        <div
          className="absolute top-6 left-2 lg:left-6 gap-6 z-50 h-10 w-10 rounded-full bg-frost-bg flex items-center justify-center p-2"
          onClick={() => router.back()}
        >
          <CgClose className="text-white text-2xl " />
        </div>
        <div className="relative h-full flex items-center justify-center">
            <video
              ref={videoRef}
              loop
              muted={isVideoMuted}
              onClick={onVideoClick}
              src={post.video.asset.url}
              className=" cursor-pointer object-contain h-full- w-full"
            ></video>
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
            <button onClick={() => setIsVideoMuted(false)} className="w-10 h-10 bg-frost-bg flex items-center justify-center p-2 rounded-full">
              <ImVolumeMute2 className="text-white text-2xl lg:text-3xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)} className="w-10 h-10 bg-frost-bg flex items-center justify-center p-2 rounded-full">
              <ImVolumeMedium className="text-white text-2xl lg:text-3xl" />
            </button>
          )}
        </div>
      </div>

      <div className="lg:w-[554px] sm:w-full flex flex-col relative pt-8 bg-white">
        <div className="flex items-center gap-3 px-8 py-4 cursor-pointer font-semibold rounded">
          <div className=" w-10 h-10 ">
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
          <div className = "bg-white">
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className=" flex flex-col gap-1">
                <p className="flex gap-2 items-center text-lg font-bold text-primary">
                  {post.postedBy.userName}
                  <FaCheckCircle className="text-[#20d5ec]" />
                </p>
                <p className="capitalize text-sm  text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className= "bg-white">
          <p className="px-8 text-md text-gray-600 pb   -4">{post.caption}</p>
          <div className="flex items-center lg:pb-5 px-8 bg-white">
            <LikeButton
              likes={post.likes}
              handleLike={() => handleLike(true)}
              handleDislike={() => handleLike(false)}
            />
            <div className="ml-5 py-4 flex flex-row justify-center items-center cursor-pointer">
              <div className="text-xl bg-primary rounded-full  w-8 h-8 flex items-center justify-center ">
                <FaCommentDots />
              </div>
              <p className="ml-[6px]">{post.comments?.length}</p>
            </div>
          </div>
        </div>
        <CommentsMemo
          comment={comment}
          setComment={setComment}
          addComment={addComment}
          comments={post.comments}
          isPostingComment={isPostingComment}
        />
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
