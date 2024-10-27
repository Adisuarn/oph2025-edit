import React from 'react'

const Header = ({ type, data }: any) => {
  return (
    <>
      <p className="font-bold text-[36px]">
        {(() => {
          switch (type) {
            case 'organization':
              return 'องค์กร';
            case 'club':
              return 'ชมรม';
            default:
              return '';
          }
        })
          ()}
        {data.data.thainame}</p>
      <p className="font-inter font-normal text-[24px] text-[#828282]">{data.data.name}</p>
      <p className="font-normal text-[20px] text-[#828282]">
        {(() => {
          switch (type) {
            case 'organization':
              return 'องค์กร';
            case 'club':
              return 'ชมรม';
            case 'program':
              return 'สายการเรียน';
            case 'gifted':
              return 'โครงการพัฒนาความสามารถ'
            default:
              return '';
          }
        })
        ()} {data.data.members} คน</p>
      <div className="mt-6">
        <p className="text-[#828282] font-normal">IG: {data.data.ig}</p>
        <p className="text-[#828282] font-normal">FB: {data.data.fb}</p>
        <p className="text-[#828282] font-normal">อื่น ๆ: {data.data.others}</p>
      </div>
    </>
  )
}

export default Header
