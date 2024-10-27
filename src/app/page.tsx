import React from "react";
import GoogleOAuthButton from "@/components/GoogleOAuthButton";
import apiFunction from "@/components/api";
import Brick from "@/vectors/landing/Brick";
import NiceStuff from "@/vectors/landing/NiceStuff";
import Window from "@/vectors/landing/Window";
import Windowphone from "@/vectors/landing/Windowphone";
import Super from "@/vectors/landing/Super";
import BrickSmall from "@/vectors/landing/BrickSmall";
import { redirect } from "next/navigation";

const page = async () => {
  const userData = await apiFunction("GET", "/user", {});
  if (userData?.data?.success !== false) {
    redirect("/account");
  }
  return (
    <main className="via-21% to-77% relative -z-[100] h-screen w-screen overflow-hidden bg-gradient-to-b sm:bg-gradient-to-r from-[#6FB07C] via-[#4F8D78] to-[#072923] sm:z-0">
      <div className="w-[110vw] sm:w-[70vw] right-0 absolute sm:-right-20 top-10 sm:top-20 md:-right-40 -z-10">
        <Window className="h-[50vh] w-full sm:h-40 md:h-[75vh]" />
      </div>
      <div className="absolute bottom-0 -z-20">
        <Brick className="hidden sm:block sm:h-[30vh] sm:w-screen" />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-20">
        <BrickSmall className="h-[55vh] sm:hidden" />
      </div>
      <div className="flex h-[80vh] sm:h-full flex-col items-center justify-end  text-center sm:flex sm:items-start sm:justify-center md:pl-16 lg:pl-16 xl:pl-32">
        <div className="items-center sm:flex sm:flex-col sm:justify-center space-y-4">
          <div className="flex flex-col -mt-24">
            <p className="bg-gradient-to-br from-[#ADDB64] to-[#ECF5C8] bg-clip-text text-6xl font-bold leading-normal text-transparent sm:leading-loose md:leading-extra-loose md:text-8xl">
              Register
            </p>
            <div className="-mb-12 -mt-12 md:-mt-32 flex items-center justify-center space-x-3">
              <NiceStuff className="h-28 w-32 sm:h-32 sm:w-36" />
              <p className="from-24% bg-gradient-to-br from-greenishCream to-[#ADDB64] bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
                ลงทะเบียน
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="from-24% bg-gradient-to-b from-greenishCream to-[#ADDB64] bg-clip-text text-4xl font-bold text-transparent">
              กช.
            </p>
            <div className="mx-3 h-12 w-[2px] rounded-full bg-greenishCream sm:h-12 md:h-14"></div>
            <div className="from-24% flex flex-col bg-gradient-to-bl from-greenishCream to-[#ADDB64] bg-clip-text text-xs font-bold text-transparent">
              <p>งานกิจกรรมพัฒนาผู้เรียน</p>
              <p>โรงเรียนเตรียมอุดมศึกษา</p>
            </div>
          </div>
          <div className="relative z-50">
            <GoogleOAuthButton />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
