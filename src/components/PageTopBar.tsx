import { TiAttachmentOutline } from "react-icons/ti";
import { RiDownloadCloud2Line } from "react-icons/ri";
import { IoPlayOutline, IoStopOutline } from "react-icons/io5";
import {
 TbClockStop,
 TbSettings,
 TbLayersSubtract,
 TbCalendarTime,
 TbShare3,
} from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";

const firstOptions = [
 { text: "Resume", icon: IoPlayOutline },
 { text: "Stop", icon: IoStopOutline },
 { text: "Stop All", icon: TbClockStop },
];

const secondOptions = [
 { text: "Delete", icon: MdOutlineDeleteForever },
 { text: "Options", icon: TbSettings },
 { text: "Queues", icon: TbLayersSubtract },
 { text: "Schedule", icon: TbCalendarTime },
 { text: "Share", icon: TbShare3 },
];

const PageTopBar = () => {
 //todo: maybe refactor the mobile/large menu
 return (
  <div className="border-b-2 border-b-neutral-800 p-5 text-neutral-400">
   <div className="flex flex-col gap-2 xl:gap-0 xl:flex-row xl:items-center">
    <div className="bg-neutral-800/40 rounded-xl flex justify-between items-center min-w-[180px] xl:min-w-[300px] pr-1 py-1 pl-4 cursor-pointer">
     <div className="flex items-center gap-4">
      <TiAttachmentOutline className="text-2xl" />
      <span>Add Url</span>
     </div>
     <div className="bg-gradient-to-b from-green-300 via-20% via-blue-400 to-purple-500 text-white rounded-2xl p-2">
      <RiDownloadCloud2Line className="text-2xl" />
     </div>
    </div>
    <div className="h-[40px] w-[2px] bg-neutral-700 ml-2 mr-4 hidden xl:block shrink-0" />
    {/* small screen menu */}
    <div className="min-[1280px]:hidden grid grid-cols-4 gap-y-1 w-full min-[480px]:flex justify-between">
     {firstOptions.map((option) => (
      <div
       key={option.text}
       className="cursor-pointer hover:brightness-150 flex flex-col w-[55px] mx-auto"
      >
       <option.icon className="text-2xl lg:text-3xl mx-auto" />
       <span className="text-xs md:text-sm mx-auto">{option.text}</span>
      </div>
     ))}
     {secondOptions.map((option) => (
      <div
       key={option.text}
       className="cursor-pointer hover:brightness-150 flex flex-col w-[55px] mx-auto"
      >
       <option.icon className="text-2xl lg:text-3xl mx-auto" />
       <span className="text-xs md:text-sm mx-auto">{option.text}</span>
      </div>
     ))}
    </div>
    {/* large screen menu */}
    <div className="hidden xl:flex flex-row items-center gap-3 min-[1450px]:gap-7">
     <div className="flex items-center gap-6 min-[1450px]:gap-12">
      {firstOptions.map((option) => (
       <div
        key={option.text}
        className="cursor-pointer transition-all duration-300 hover:brightness-150 flex flex-col"
       >
        <option.icon className="text-3xl mx-auto" />
        <span className="text-sm">{option.text}</span>
       </div>
      ))}
     </div>
     <div className="h-[40px] w-[2px] bg-neutral-700 mx-4 hidden xl:block shrink-0" />
     <div className="flex items-center gap-6 min-[1450px]:gap-12">
      {secondOptions.map((option) => (
       <div
        key={option.text}
        className="cursor-pointer transition-all duration-300 hover:brightness-150 flex flex-col"
       >
        <option.icon className="text-3xl mx-auto" />
        <span className="text-sm">{option.text}</span>
       </div>
      ))}
     </div>
    </div>
   </div>
  </div>
 );
};
export default PageTopBar;
