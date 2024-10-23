import React from "react";
import GoogleOAuthButton from "@/components/GoogleOAuthButton";
import { client } from "@/libs/api";
import apiFunction from "@/components/api";
import Brick from "@/vectors/landing/Brick";
import NiceStuff from "@/vectors/landing/NiceStuff";
import Window from "@/vectors/landing/Window";
import Super from "@/vectors/landing/Super";
import Super2 from "@/vectors/landing/super2";

const page = async () => {
  const clubRes = await apiFunction("GET", "/clubs/ก30927-1", {});
  return (
    <main className="relative -z-[100] h-screen w-screen bg-gradient-to-b from-[#7CA871]">
      <div className="flex h-full flex-col items-center justify-end space-y-10 text-center">
        <div className="absolute bottom-0 left-1/2 -z-[99] -translate-x-1/2 sm:hidden">
          <Super className="h-screen" />
        </div>
        <div className="absolute bottom-0 right-0 -z-[99] hidden sm:block">
          <Super2 className="w-screen" />
        </div>
        <div className="flex flex-col">
          <p className="to-63% bg-gradient-to-br from-[#ADDB64] to-greenishCream bg-clip-text text-6xl font-bold leading-normal text-transparent">
            Register
          </p>

          <div className="-mb-12 -mt-12 flex items-center justify-center space-x-3">
            <NiceStuff className="h-28 w-32" />
            <p className="from-24% bg-gradient-to-br from-greenishCream to-[#ADDB64] bg-clip-text text-4xl font-bold text-transparent">
              ลงทะเบียน
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="from-24% bg-gradient-to-b from-greenishCream to-[#ADDB64] bg-clip-text text-4xl font-bold text-transparent">
            กช.
          </p>
          <div className="mx-3 h-12 w-[2px] rounded-full bg-greenishCream sm:h-48"></div>
          <div className="from-24% flex flex-col bg-gradient-to-bl from-greenishCream to-[#ADDB64] bg-clip-text text-xs font-bold text-transparent">
            <p>งานกิจกรรมพัฒนาผู้เรียน</p>
            <p>โรงเรียนเตรียมอุดมศึกษา</p>
          </div>
        </div>
        <div className="relative z-10">
          <GoogleOAuthButton />
        </div>
        <div></div>
        <div></div>
      </div>
      {/* <div className="absolute -bottom-40">
      <Brick className="w-screen" />
      </div> */}
      <div className="relative z-10">
        <GoogleOAuthButton />
      </div>
    </main>
  );
};

export default page;
