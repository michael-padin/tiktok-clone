import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";

//icons
import { FaCheckCircle } from "react-icons/fa";

// store
import useAuthStore from "../store/authStore";

import NoResults from "./NoResults";
import { IUser } from "../types";

interface IProps {
  isPostingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id?: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <>
      <div className="w-full h-full bg-[#f8f8f8] overflow-y-auto overflow-x-hidden pt-5 px-8 ">
        {comments?.length ? (
          comments.map((comment) =>
            allUsers.map(
              (user: IUser) =>
                user._id ===
                  (comment.postedBy._id || comment.postedBy._ref) && (
                  <div className=" items-center mb-4" key={comment.comment}>
                    <div className="flex items-start gap-3 cursor-pointer">
                      <Link href={`/profile/${user._id}`}>
                        <div className="w-10 h-10">
                          <Image
                            src={user.image}
                            width={34}
                            height={34}
                            className="rounded-full"
                            alt="user profile"
                            layout="responsive"
                          />
                        </div>
                      </Link>
                      <div className="">
                        <Link href={`/profile/${user._id}`}>
                          <div>
                            <p className="flex items-center gap-1 text-md font-bold text-primary lowercase">
                              {user.userName.replaceAll(" ", "")}
                              <FaCheckCircle className="text-[#20d5ec]" />
                            </p>
                            <p className="capitalize text-gray-400 text-xs font-normal">
                              {user.userName}
                            </p>
                          </div>
                        </Link>
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                )
            )
          )
        ) : (
          <NoResults text="No comments yet" />
        )}
      </div>
      {userProfile && (
        <div className=" py-[21px] px-[30px] basis-auto border-t-[1px] border-gray-300 px w-full bg-white">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e: any) => setComment(e.target.value)}
              placeholder="Add a comment"
              className="bg-primary rounded-lg px-4 py-2 text-md font-medium w-full border-[1px]  border-gray-100 solid focus:outline-none focus:border-[1px] focus:border-gray-300"
            />
            <button className="text-sm text-gray-300" onClick={addComment}>
              {isPostingComment ? "commenting...." : "Post"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Comments;
