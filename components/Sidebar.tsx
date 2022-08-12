import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { GoogleLogin, googleLogout } from "@react-oauth/google";

// icons
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import { RiLiveLine } from "react-icons/ri";

// components
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";
import useAuthStore from "../store/authStore";

const DiscoverMemo = React.memo(Discover);
const SuggestedAccountsMemo = React.memo(SuggestedAccounts);
const FooterMemo = React.memo(Footer);

const Sidebar = () => {
  const { userProfile }: { userProfile: any } = useAuthStore();

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3  justify-center sm:px-0 lg:justify-start cursor-pointer font-semibold text-[#000] rounded";
  const activeLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center sm:px-0 lg:justify-start cursor-pointer font-semibold text-[#fe2c55] rounded";

  return (
    <div className="fixed top-0 pt-20  z-20 bg-white h-[100vh] overflow-hidden hover:overflow-y-auto lg:hover-auto border-r-2 border-gray-100 lg:border-0 ">
      <div className="lg:w-[356px]  w-[72px] z-20 flex flex-col justify-start mb-10  ">
        <div className="border-b-[1px] border-gray-100 lg:pb-4 flex-wrap">
          <Link href="/">
            <div className={activeLink}>
              <p className="text-2xl">
                <AiFillHome />
              </p>
              <span className="text-xl hidden lg:block">For You</span>
            </div>
          </Link>
          <Link href="#">
            <div className={normalLink}>
              <p className="text-2xl">
                <FiUsers />
              </p>
              <span className="text-xl hidden lg:block">Following </span>
            </div>
          </Link>
          <Link href="#">
            <div className={normalLink}>
              <p className="text-2xl">
                <RiLiveLine />
              </p>
              <span className="text-xl hidden lg:block">LIVE</span>
            </div>
          </Link>
        </div>
        {!userProfile && (
          <div className="px-2 py-4 hidden lg:block ">
            <p className="text-gray-400">
              Log in to like and comment on videos
            </p>
            <div className="pr-4 py-4 ">
              <GoogleLogin
                onSuccess={(response) => console.log(response)}
                onError={() => console.log("error")}
              />
            </div>
          </div>
        )}
        <DiscoverMemo />
        <SuggestedAccountsMemo />
        <FooterMemo />
      </div>
    </div>
  );
};

export default Sidebar;
