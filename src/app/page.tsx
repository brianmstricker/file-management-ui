"use client";
import ContextMenu from "@/components/ContextMenu";
import LeftSide from "@/components/LeftSide";
import PageTopBar from "@/components/PageTopBar";
import { useEffect, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { VscMusic } from "react-icons/vsc";
import { FaRegFileZipper, FaCheck } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RxDownload, RxUpload } from "react-icons/rx";
import { cn } from "@/lib/utils";

type File = {
 type: string;
 name: string;
 size: string;
 status: string;
 timeLeft: string;
 date: string;
};

const files = [
 {
  type: "image",
  name: "UIUXMonster.png",
  size: "745 KB",
  status: "Complete",
  timeLeft: "0 Sec",
  date: "2023/08/09",
 },
 {
  type: "music",
  name: "2pacCover.mp3",
  size: "3.00 MB",
  status: "80%",
  timeLeft: "0 Sec",
  date: "2023/08/09",
 },
 {
  type: "archive",
  name: "UIUXMonster.zip",
  size: "745 KB",
  status: "Complete",
  timeLeft: "0 Sec",
  date: "2023/08/09",
 },
 {
  type: "document",
  name: "Details.pdf",
  size: "2 MB",
  status: "50%",
  timeLeft: "5 Min 12 Sec",
  date: "2023/08/09",
 },
];

const initContextMenu = {
 show: false,
 x: 0,
 y: 0,
};

export default function Home() {
 const [contextMenu, setContextMenu] = useState(initContextMenu);
 const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const contextRef = useRef<HTMLDivElement>(null);
 const containerRef = useRef<HTMLDivElement>(null);
 function handleOnContextMenu(e: React.MouseEvent<HTMLDivElement>, file: File) {
  e.preventDefault();
  if (contextRef.current && containerRef.current) {
   const contextRefAttr = contextRef.current.getBoundingClientRect();
   const { clientX, clientY } = e;
   const isLeftSide = clientX < containerRef.current.clientWidth / 1.35;
   const isUpperSection = clientY < containerRef.current.clientHeight / 1.7;
   let x;
   let y;
   if (isLeftSide) {
    x = clientX + 4;
   } else {
    x = clientX - contextRefAttr.left + 24;
   }
   if (isUpperSection) {
    y = clientY + 12;
   } else {
    y = clientY - contextRefAttr.height - 175;
   }
   setSelectedFile(file);
   setContextMenu({ show: true, x, y });
  }
 }
 const closeContextMenu = () => {
  setSelectedFile(null);
  setContextMenu(initContextMenu);
 };
 useEffect(() => {
  const allSelected = document.getElementById(
   "allSelected"
  ) as HTMLInputElement;
  const otherFormCheckboxes = document.querySelectorAll(
   "input[type=checkbox]:not(#allSelected):not(#selectAll)"
  );
  otherFormCheckboxes.forEach((checkbox) => {
   if (checkbox instanceof HTMLInputElement) {
    checkbox.addEventListener("change", () => {
     const allOtherCheckboxesChecked = Array.from(otherFormCheckboxes).every(
      (checkbox) => checkbox instanceof HTMLInputElement && checkbox.checked
     );
     if (allOtherCheckboxesChecked) {
      allSelected.checked = true;
     } else {
      allSelected.checked = false;
     }
    });
   }
  });
 }, []);
 return (
  <div className="flex-1 h-full flex relative">
   <LeftSide />
   <main className="flex-1">
    <PageTopBar />
    <div
     ref={containerRef}
     className="p-2 xl:p-4 md:pl-8 text-neutral-400 h-full w-full relative"
    >
     <div className="customGrid gridHeader px-3 py-4 mb-1">
      <span>
       <input
        type="checkbox"
        name="allSelected"
        id="allSelected"
        className="hidden"
       />
       <label
        htmlFor="allSelected"
        className="border w-4 h-4 flex items-center justify-center rounded-[4px] pointer-events-none select-none"
       >
        <span className="hidden">
         <FaCheck className="text-white text-[10px]" />
        </span>
       </label>
      </span>
      <span className="col-span-2">Name</span>
      <span>Size</span>
      <span>Status</span>
      <span>Time Left</span>
      <span>Last Modification</span>
     </div>
     <div className="grid grid-cols-2 md:flex md:flex-col gap-3">
      {contextMenu.show && (
       <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        closeMenu={closeContextMenu}
       />
      )}
      {files.map((file) => (
       <div
        key={file.name}
        className={cn(
         "transition-all duration-300 cursor-pointer w-full rounded-xl customGrid px-3 py-4 mb-1",
         selectedFile?.name === file.name && "bg-neutral-700",
         !selectedFile && "hover:bg-neutral-800/80"
        )}
        ref={contextRef}
        onContextMenu={(e) => handleOnContextMenu(e, file)}
       >
        <span>
         <input type="checkbox" id={file.name} className="hidden" />
         <label
          htmlFor={file.name}
          className="border w-4 h-4 rounded-[4px] cursor-pointer flex items-center justify-center"
         >
          <span className="hidden">
           <FaCheck className="text-white text-[10px]" />
          </span>
         </label>
        </span>
        <div className="col-span-2 flex items-center gap-4">
         <span className="text-2xl hidden md:block">
          {file.type === "image" ? (
           <CiImageOn />
          ) : file.type === "music" ? (
           <VscMusic />
          ) : file.type === "archive" ? (
           <FaRegFileZipper />
          ) : file.type === "document" ? (
           <IoDocumentTextOutline />
          ) : (
           ""
          )}
         </span>
         <div className="flex flex-col gap-1">
          <span>{file.name}</span>
          <span className="text-xs text-neutral-500 capitalize hidden md:block">
           {file.type}
          </span>
         </div>
        </div>
        <span>{file.size}</span>
        <div
         className={cn(
          "max-w-[80%]",
          file.status.includes("%") && "flex flex-col gap-1.5 -mt-1.5"
         )}
        >
         <span>{file.status}</span>
         {file.status.includes("%") && (
          <div className="relative bg-gray-300/5 w-full h-2 rounded-2xl hidden md:block">
           <div
            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 rounded-2xl"
            style={{ width: file.status }}
           />
          </div>
         )}
        </div>
        <span>{file.timeLeft}</span>
        <span>{file.date}</span>
       </div>
      ))}
     </div>
     <div className="absolute bottom-[160px] min-[480px]:bottom-[120px] sm:bottom-[120px] xl:bottom-[95px] border-t-2 border-t-neutral-800 w-full left-0 py-4 sm:py-8">
      <div className="md:pl-11 gridFooter">
       <span>
        <input
         type="checkbox"
         name="selectAll"
         id="selectAll"
         className="hidden"
        />
        <label
         htmlFor="selectAll"
         className="border w-4 h-4 flex items-center justify-center rounded-[4px] cursor-pointer select-none"
         onClick={() => {
          const selectAll = document.getElementById(
           "selectAll"
          ) as HTMLInputElement;
          const allOtherCheckboxes = document.querySelectorAll(
           "input[type=checkbox]:not(#selectAll)"
          );
          allOtherCheckboxes.forEach((checkbox) => {
           if (checkbox instanceof HTMLInputElement) {
            if (selectAll.checked) {
             checkbox.checked = false;
            } else {
             checkbox.checked = true;
            }
           }
          });
         }}
        >
         <span className="hidden">
          <FaCheck className="text-white text-[10px]" />
         </span>
        </label>
       </span>
       <span className="col-span-1 sm:col-span-2 text-xs sm:text-sm md:text-base">
        Select all
       </span>
       <div className="md:hidden h-[20px] w-[2px] bg-gray-800/50 mx-2" />
       <span className="hidden xl:block" />
       <div className="flex flex-row col-span-4 xl:col-span-3 gap-4 md:gap-8 justify-center items-center">
        <span className="-ml-3 text-xs sm:text-sm md:text-base">
         Speed test:
        </span>
        <div className="block sm:flex gap-6">
         <div className="flex items-center gap-3">
          <RxDownload className="text-2xl" />
          <span className="font-bold text-white text-xs sm:text-sm md:text-base">
           10.55 Mbs
          </span>
         </div>
         <div className="flex items-center gap-3">
          <RxUpload className="text-2xl" />
          <span className="font-bold text-white text-xs sm:text-sm md:text-base">
           6.30 Mbs
          </span>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </main>
  </div>
 );
}
