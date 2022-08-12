import React, { useState, useEffect } from "react";
import Image from "next/image";

//icons
import { FaCheckCircle } from "react-icons/fa";

import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState<boolean>(true);
  const [videoLists, setVideoLists] = useState<Video[]>([]);
  const { user, userVideos, userLikedVideos } = data;

  const videos = showUserVideos
    ? "absolute ease duration-300 h-[2px] bg-gray-900 bottom-0 w-full"
    : "text-prim";
  const Liked = !showUserVideos
    ? "absolute ease duration-300 h-[2px] bg-gray-900 bottom-0 w-full"
    : "text-gray-200";

  useEffect(() => {
    if (showUserVideos) {
      setVideoLists(userVideos);
    } else {
      setVideoLists(userLikedVideos);
    }
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <div className="w-full min-h-[100vh] p-8">
      <div className="flex gap-5  mb-4 bg-white w-full">
        <div className="w-[116px] h-[116px]">
          <Image
            src={user.image}
            width={34}
            height={34}
            className="rounded-full"
            alt="user profile"
            layout="responsive"
          />
        </div>
        <div className="hidden xl:block">
          <p className="flex items-center gap-1 text-[32px] font-bold text-primary lowercase">
            {user.userName.replaceAll(" ", "")}
            <FaCheckCircle className="text-[#20d5ec]" />
          </p>
          <p className="capitalize font-semibold text-gray-400 text-lg ">
            {user.userName}
          </p>
        </div>
      </div>

      <div>
        <div className="flex mb-10 mt-10 border-b-[1px] border-gray-200 bg-white w-[460px] ">
          <span
            className={`flex items-center   relative justify-center text-xl font-semibold cursor-pointer mt-2 shrink grow basis-[0%] ${
              showUserVideos ? "text-black" : "text-gray-400"
            } `}
            onClick={() => setShowUserVideos(true)}
            onMouseEnter={() => setShowUserVideos(true)}
          >
            Videos
            <div className={videos}></div>
          </span>
          <span
            className={`flex items-center relative justify-center text-xl font-semibold cursor-pointer mt-2 shrink grow basis-[0%] ${
              !showUserVideos ? "text-black" : "text-gray-400"
            } `}
            onClick={() => setShowUserVideos(false)}
            onMouseEnter={() => setShowUserVideos(false)}
          >
            Liked
            <div className={Liked}></div>
          </span>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videoLists.length > 0 ? (
            videoLists.map((video: Video, idx) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
            />
          )}
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
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};

export default Profile;
