import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  // topic styles
  const activeTopicStyle =
    "lg:border-[1px] hover:bg-secondary justify-center lg:border-[#fe2c55]  sm:py-2 px-3 py-2 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#fe2c55]";
  const topicStyle =
    "lg:border-[1px] hover:bg-secondary justify-center hover:border-[#fe2c55] sm:px-2  lg:border-gray-300 px-3 py-2 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-gray-500";

  return (
    <div className="border-b-[1px] border-gray-200 pb-6 lg:px-3">
      <p className="text-gray-500 font-semibold m-3 ml-0 mt-4 hidden lg:block">
        Popular Topics
      </p>
      <div className="flex flex-wrap lg:gap-3 lg:flex-row lg:justify-start justify-center flex-col gap-0">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="font-bold text-2xl xl-text-md">{item.icon}</span>
              <span className="font-medium text-md hidden lg:block capitalize">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
