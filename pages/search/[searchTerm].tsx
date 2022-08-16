import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

//icons
import { FaCheckCircle } from "react-icons/fa";

import useAuthStore from "../../store/authStore";
import { IUser, Video } from "../../types";
import NoResults from "../../components/NoResults";
import { serialize } from "v8";
import VideoCard from "../../components/VideoCard";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState<boolean>(false);
  const [showUserVideos, setShowUserVideos] = useState<boolean>(true);

  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const isAccount = isAccounts
    ? "absolute ease duration-300 h-[2px] bg-gray-900 bottom-0 w-full"
    : "text-prim";
  const isVideos = !isAccounts
    ? "absolute ease duration-300 h-[2px] bg-gray-900 bottom-0 w-full"
    : "text-gray-200";
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full ">
      <div>
        <div className="flex pt-4 border-b-[1px] border-gray-200 bg-white  ">
          <span
            className={`flex items-center   justify-center text-xl font-semibold cursor-pointer relative  py-[10px] w-[120px] ${
              isAccounts ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setIsAccounts(true)}
            onMouseEnter={() => setIsAccounts(true)}
          >
            Accounts
            <div className={isAccount}></div>
          </span>
          <span
            className={`flex items-center justify-center text-xl font-semibold cursor-pointer py-[10px] relative  w-[120px]  ${
              !isAccounts ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setIsAccounts(false)}
            onMouseEnter={() => setIsAccounts(false)}
          >
            Videos
            <div className={isVideos}></div>
          </span>
        </div>
        {isAccounts ? (
          <div className="md:mt-4 md: min-h-[60vh] ">
            {searchedAccounts.length > 0 ? (
              searchedAccounts.map((user: IUser, idx: number) => (
                <div className="hover:bg-[#f8f8f8]" key={idx}>
                  <Link href={`/profile/${user._id}`}>
                    <div className="flex items-center cursor-pointer border-b-2 border-gray-100">
                      <div className="w-[60px] h-[60px] m-4">
                        <Image
                          src={user.image}
                          width={34}
                          height={34}
                          className="rounded-full"
                          alt="user profile"
                          layout="responsive"
                        />
                      </div>
                      <div className="hidden xl:block my-4">
                        <div>
                          <p className="flex items-center gap-1 text-md font-bold text-primary lowercase">
                            {user.userName.replaceAll(" ", "")}
                            <FaCheckCircle className="text-[#20d5ec]" />
                          </p>
                          <p className="capitalize text-gray-400 text-xs font-normal">
                            {user.userName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <NoResults text={`No accounts results for ${searchTerm}`} />
            )}
          </div>
        ) : (
          <div className="md:mt-4 flex flex-wrap gap-6 md:justify-start lg:min-h-[60vh]">
            {videos.length > 0 ? (
              videos.map((video, idx) => <VideoCard post={video} key={idx} />)
            ) : (
              <NoResults text={`No video results for ${searchTerm}`} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: res.data,
    },
  };
};
export default Search;
