import React, { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

//icons
import {FaCheckCircle} from "react-icons/fa"

import useAuthStore from "../store/authStore";
import { IUser } from "../types";

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="lg:border-b-[1px] border-gray-200 pb-4 lg:px-3 ">
      <p className="text-gray-500 hidden lg:block mb-2 text-sm font-medium mt-4 ">
        Suggested accounts
      </p>

      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 hover:bg-[#f8f8f8] p-2 cursor-pointer font-semibold rounded justify-center lg:justify-start">
              <div className="w-8 h-8">
                <Image
                  src={user.image}
                  width={34}
                  height={34}
                  className="rounded-full"
                  alt="user profile"
                  layout="responsive"
                />
              </div>
              <div className="hidden lg:block">
                <p className="flex items-center gap-1 text-md font-bold text-primary lowercase">
                  {user.userName.replaceAll(" ", "")}
                  <FaCheckCircle className="text-[#20d5ec]" />
                </p>
                <p className = "capitalize text-gray-400 text-xs font-normal">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
