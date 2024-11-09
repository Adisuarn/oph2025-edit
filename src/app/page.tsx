import React from 'react'

import GoogleOAuthButton from '@/components/GoogleOAuthButton'
import Brick from '@/vectors/landing/Brick'
import BrickSmall from '@/vectors/landing/BrickSmall'
import NiceStuff from '@/vectors/landing/NiceStuff'
import Window from '@/vectors/landing/Window'

const page = async () => {
  return (
    <main className="via-21% to-77% relative h-screen w-screen overflow-hidden bg-gradient-to-b from-[#6FB07C] via-[#4F8D78] to-[#072923] sm:z-0 sm:bg-gradient-to-br">
      <div className="absolute right-0 top-10 w-[110vw] z-30 sm:-right-20 sm:top-20 sm:w-[70vw] md:-right-40">
        <Window className="h-[50vh] w-full sm:h-40 md:h-[75vh]" />
      </div>
      <div className="absolute bottom-0">
        <Brick className="hidden sm:block sm:h-[30vh] sm:w-screen" />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
        <BrickSmall className="h-[55vh] sm:hidden" />
      </div>
      <div className="flex h-[80vh] flex-col items-center justify-end text-center sm:flex sm:h-full sm:items-start sm:justify-center md:pl-16 lg:pl-16 xl:pl-32">
        <div className="relative z-20 items-center space-y-4 sm:flex sm:flex-col sm:justify-center">
          <div className="-mt-24 flex flex-col">
            <p className="bg-gradient-to-br from-[#ADDB64] from-10% to-[#ECF5C8] bg-clip-text text-6xl font-bold leading-normal text-transparent sm:leading-loose md:text-8xl md:leading-extra-loose">
              Register
            </p>
            <div className="-mb-12 -mt-12 flex items-center justify-center space-x-3 md:-mt-32">
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
            <div className="mx-3 h-6 w-[2px] rounded-full bg-greenishCream sm:h-6 md:h-8"></div>
            <div className="from-24% flex flex-col bg-gradient-to-bl from-greenishCream to-[#ADDB64] bg-clip-text text-xs font-bold text-transparent">
              <p>งานกิจกรรมพัฒนาผู้เรียน</p>
              <p>โรงเรียนเตรียมอุดมศึกษา</p>
            </div>
          </div>
          <div className="relative z-50 justify-center flex">
            <GoogleOAuthButton />
          </div>
        </div>
      </div>
    </main>
  )
}

export default page
