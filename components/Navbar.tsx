import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// google api
import { GoogleLogin, googleLogout } from "@react-oauth/google";

// icons
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import Logo from "../utils/tiktok-logo.svg";

import { createOrGetUser } from "../utils";

import useAuthStore from "../store/authStore";

const Navbar = () => {
  const {
    userProfile,
    addUser,
    removeUser,
  }: { userProfile: any; addUser: any; removeUser: any } = useAuthStore();
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);



  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  return (
    <div className="w-full z-40 top-0 fixed border-b-2 bg-white border-gray-200 ">
      <div className="xl:max-w-[1150px] m-auto flex justify-between items-center py-2 px-4 ">
        <Link href={`/`}>
          <div className="w-[100px] md:w-[130px] block sm:hidden">
            <Image
              className="cursor-pointer"
              src={Logo}
              alt="tiktik"
              layout="responsive"
            />
          </div>
        </Link>
        <div className="relative block">
          <form
            onSubmit={handleSearch}
            className="md:static top-10 left-20 bg-white "
          >
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search accounts and video"
              className="rounded-full border-[1px] border-gray-200 bg-[#f1f1f2] py-3 px-4 focus:border-gray-200 focus:border-[1px] focus:outline-none w-[292px] sm:w-[190px]"
            />
            <button className="flex items-center justify-center border-none absolute md:right-0 right-0 top-0 bottom-0 rounded-r-full px-3 text-2xl  py-3 bg-[#f1f1f2] hover:bg-[#eaeaeb]  outline-none text-gray-400">
              <BiSearch />
            </button>
          </form>
        </div>
        {userProfile ? (
          <div className="flex gap-2 ">
            <Link href="/upload">
              <button className="border-[1px] px-4 md:px4 text-lg font-semibold flex items-center hover:bg-[#f8f8f8] gap-2 text-gray-700">
                <IoMdAdd className="text-xl" />
                <span className="block sm:hidden">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href={`profile/${userProfile._id}`}>
                <div className="flex justify-center items-center h-10 w-10">
                  <Image
                    src={userProfile.image}
                    width={40}
                    height={40}
                    className="rounded-full"
                    alt="profile photo"
                  />
                </div>
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              className="text-3xl"
            >
              <AiOutlineLogout color="red " />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            shape={`${screenWidth > 768 ? "square" : "circle"}`}
            type={`${screenWidth > 768 ? "standard" : "icon"}`}
            logo_alignment="center"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
