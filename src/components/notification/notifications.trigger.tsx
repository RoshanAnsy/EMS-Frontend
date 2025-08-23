import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';
import muteNotification from "../../../public/muteNoti.svg"
import { Dot } from 'lucide-react';
const noti_Data=["new update is there",
                " message received",
                    "new follow up is available",
                    " comment is available",
                    " update is there",
]
const notificationsTrigger = () => {
  return (
       <Popover>
            <PopoverTrigger>
                <p className=' flex gap-x-2'>
                <Image src={muteNotification} alt='mute' className='cursor-pointer'/>
                </p>
            </PopoverTrigger>
            <PopoverContent className='flex flex-col gap-y-4'>
                <div className='flex flex-col items-start gap-y-2 shadow-none'>
                    {noti_Data.map((noti, index) => (
                        <div key={index} className='flex gap-x-[2px] w-full items-start border-l-4 mb-2  font-semibold text-sm text-gray-600 shadow-none hover:bg-neutral-200 cursor-pointer'>
                            {/* <Image src='https://example.com/icon.png' alt='notification' className='w-6 h-6 rounded-full' /> */}
                            <Dot />
                            <p>{noti.toUpperCase()}</p>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover> 
 )
}

export default notificationsTrigger;
