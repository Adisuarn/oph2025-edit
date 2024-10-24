import React from "react";
import GoogleOAuthButton from "@/components/GoogleOAuthButton";
import { client } from "@/libs/api";
import apiFunction from "@/components/api";
import Brick from "@/vectors/landing/Brick";
import NiceStuff from "@/vectors/landing/NiceStuff";
import Window from "@/vectors/landing/Window";
import Super from "@/vectors/landing/Super";

const page = async () => {
  const clubRes = await apiFunction("GET", "/clubs/ก30927-1", {});
  return (
    <main className="via-21% to-77% relative -z-[100] h-screen w-screen bg-gradient-to-br from-[#6FB07C] via-[#4F8D78] to-[#072923] sm:z-0">
      <div className="absolute bottom-0 left-1/2 -z-[99] -translate-x-1/2 sm:hidden">
        <Super className="h-screen" />
      </div>
      <div className="absolute right-0 top-20 z-20">
        <Window className="hidden sm:block sm:h-60 md:h-[75vh]" />
      </div>
      <div className="absolute bottom-0 hidden sm:block">
        <Brick className="hidden sm:block sm:h-[30vh] sm:w-screen" />
      </div>
      <div className="flex h-full flex-col items-center justify-end space-y-10 text-center sm:flex sm:items-start sm:justify-center sm:pl-32">
        <div className="items-center sm:flex sm:flex-col sm:justify-center sm:space-y-4">
          <div className="flex flex-col">
            <p className="bg-gradient-to-br from-[#ADDB64] to-[#ECF5C8] bg-clip-text text-6xl font-bold leading-normal text-transparent sm:leading-relaxed md:text-8xl">
              Register
            </p>

            <div className="-mb-12 -mt-12 flex items-center justify-center space-x-3">
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
            <div className="mx-3 h-12 w-[2px] rounded-full bg-greenishCream sm:h-16 md:h-20"></div>
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
      {/* <div className="absolute -bottom-40">
      <Brick className="w-screen" />
      </div> */}
      {/* <div className="relative z-10">
        <GoogleOAuthButton />
      </div> */}
    </main>
  );
};

export default page;
