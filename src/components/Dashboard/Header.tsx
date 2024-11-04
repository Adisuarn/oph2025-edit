import React from 'react'

const Header = ({ type, data }: any) => {
  return (
    <>
      <p className="text-[36px] font-bold">
        {(() => {
          switch (type) {
            case 'organization':
              return 'องค์กร'
            case 'club':
              return 'ชมรม'
            default:
              return ''
          }
        })()}
        {data.data.thainame}
      </p>
      <p className="font-inter text-[24px] font-normal text-[#828282]">{data.data.name}</p>
      <p className="text-[20px] font-normal text-[#828282]">
        {(() => {
          switch (type) {
            case 'organization':
              return 'องค์กร'
            case 'club':
              return 'ชมรม'
            case 'program':
              return 'สายการเรียน'
            case 'gifted':
              return 'โครงการพัฒนาความสามารถ'
            default:
              return ''
          }
        })()}{' '}
        {data.data.members} คน
      </p>
      <div className="mt-6">
        <p className="font-normal text-[#828282]">IG : {data.data.ig || '-'}</p>
        <p className="font-normal text-[#828282]">FB : {data.data.fb || '-'}</p>
        <p className="font-normal text-[#828282]">อื่น ๆ : {data.data.others || '-'}</p>
      </div>
    </>
  )
}

export default Header
