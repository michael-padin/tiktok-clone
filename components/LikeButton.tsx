import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({ handleLike, handleDislike, likes }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState<boolean>(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className="gap-6 flex ">
      <div className="py-4 flex flex-row justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full  w-8 h-8 flex items-center justify-center text-[#fe2c55]"
            onClick={handleDislike}
          >
            <MdFavorite className="text-xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full  w-8 h-8 flex items-center justify-center"
            onClick={handleLike}
          >
            <MdFavorite className="text-xl" />
          </div>
        )}
        <p className="text-md font-semibold ml-[6px]">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
