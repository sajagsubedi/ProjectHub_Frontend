"use client";

import PinnedProjects from "@/components/dashboardComponents/PinnedProjects";
import { useAuth } from "@/context/AuthProviders";
import Image from "next/image";
import React from "react";

const Page = () => {
  const { user } = useAuth();
  return (
    <main className="w-full min-h-screen p-8">
      <section className="flex justify-center md:justify-start lg:w-[30vw]">
        <div className="w-[300px] lg:w-full  bg-white drop-shadow-md shadow-gray-300 min-h-[175px] lg:h-[200px] overflow-hidden rounded">
          <div className="w-full bg-rose-200 p-3 pb-6 flex flex-col justify-start">
            <h3 className="text-lg font-bold text-gray-600">Welcome Back!</h3>
            <h5 className="text-base text-rose-500 ml-2 font-medium">
              Dashboard
            </h5>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center items-center p-1 rounded-full bg-rose-50 self-start ml-5 -translate-y-1/2">
              <Image
                className="w-10 h-10 rounded-full"
                src={user?.avatar?.url || "/user.png"}
                alt="user photo"
                height={40}
                width={40}
              />
            </div>
            <div className="flex w-full justify-between -translate-y-5">
              <div className="flex flex-col px-2">
                <h4 className="text-gray-600 text-base font-medium">
                  {user?.fullName}
                </h4>
                <h4 className="text-gray-600 text-base">{user?.email}</h4>
              </div>
              <div className="px-2">
                <button className="px-2 py-1 rounded bg-rose-500 text-white font-medium max-w-max hover:bg-rose-600">
                  My Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PinnedProjects />
    </main>
  );
};

export default Page;
