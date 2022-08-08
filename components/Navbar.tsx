import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// google api
import { GoogleLogin, googleLogout } from "@react-oauth/google";

// icons
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import Logo from "../utils/tiktik-logo.png";

import { createOrGetUser } from "../utils";

import useAuthStore from "../store/authStore";

const Navbar = () => {
  const {
    userProfile,
    addUser,
    removeUser,
  }: { userProfile: any; addUser: any; removeUser: any } = useAuthStore();
  return (
    <div className="w-full z-10 fixed border-b-2 bg-white border-gray-200 ">
      <div className="xl:max-w-[1150px] m-auto flex justify-between items-center  py-2 px-4">
        <Link href="/">
          <div className="w-[100px] md:w-[130px]">
            <Image
              className="cursor-pointer"
              src={Logo}
              alt="tiktik"
              layout="responsive"
            />
          </div>
        </Link>
        <div>SEARCH</div>
        <div>
          {userProfile ? (
            <div className="flex gap-5 md:gap-10">
              <Link href="/upload">
                <button className="border-2 px-2 md:px4 text-md font-semibold flex items-center">
                  <IoMdAdd className="text-xl" />{" "}
                  <span className="hidden md:block">Upload</span>
                </button>
              </Link>
              {userProfile.image && (
                <Link href="/">
                  <>
                    <Image
                      src={userProfile.image}
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt="profile photo"
                    />
                  </>
                </Link>
              )}
              <button
                type="button"
                className="px-2"
                onClick={() => {
                  googleLogout();
                  removeUser();
                }}
              >
                <AiOutlineLogout color="red " fontSize={21} />
              </button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log("error")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
