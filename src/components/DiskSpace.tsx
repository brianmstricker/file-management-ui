import { TbServer } from "react-icons/tb";
import { FaEllipsisH } from "react-icons/fa";

const DiskSpace = () => {
 return (
  <div className="flex flex-col border border-neutral-800 p-4 rounded-xl bg-gradient-to-br from-neutral-700 via-neutral-800 via-20% to-neutral-900">
   <div className="flex justify-between items-center">
    <div className="flex items-center gap-3">
     <TbServer className="text-xl" />
     <span>Disk Space</span>
    </div>
    <FaEllipsisH className="text-xl" />
   </div>
   <div className="mt-4">
    <div className="max-w-[55%] mx-auto">
     <div className="relative flex justify-center">
      <div className="progress"></div>
      {/* <div className="absolute -top-5 left-0 h-2 bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 w-[90%] rounded-2xl" /> */}
     </div>
     <div className="flex justify-between items-end relative">
      <span className="text-sm">0%</span>
      <span className="text-3xl px-3 absolute left-1/2 -translate-x-1/2">
       😖
      </span>
      <span className="text-sm relative left-3">100%</span>
     </div>
    </div>
    <div className="flex flex-col items-center mt-4">
     <div className="text-white text-2xl">90%</div>
     <div>C:\Downloads</div>
    </div>
   </div>
   <div>
    <button className="w-full text-center mt-8 bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 text-white py-3 rounded-2xl">
     Disk Cleaner
    </button>
   </div>
  </div>
 );
};
export default DiskSpace;
