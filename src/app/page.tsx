"use client";
import ContextMenu from "@/components/ContextMenu";
import LeftSide from "@/components/LeftSide";
import PageTopBar from "@/components/PageTopBar";
import { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { VscMusic } from "react-icons/vsc";
import { FaRegFileZipper } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";

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
   setContextMenu({ show: true, x, y });
  }
 }
 const closeContextMenu = () => {
  setContextMenu(initContextMenu);
 };
 return (
  <div className="flex-1 h-full flex relative">
   <LeftSide />
   <main className="flex-1">
    <PageTopBar />
    <div
     ref={containerRef}
     className="p-4 pl-8 text-neutral-400 h-full w-full relative"
    >
     <div className="customGrid items-center px-3 py-4 mb-1">
      <span>
       <label htmlFor="checkAll" className="border w-4 h-4 block rounded-[4px]">
        <input
         type="checkbox"
         name="checkAll"
         id="checkAll"
         className="hidden"
        />
       </label>
      </span>
      <span className="col-span-2">Name</span>
      <span>Size</span>
      <span>Status</span>
      <span>Time Left</span>
      <span>Last Modification</span>
     </div>
     <div className="flex flex-col gap-3">
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
        className="hover:bg-neutral-800/80 transition-all duration-500 cursor-pointer w-full rounded-xl customGrid items-center px-3 py-4 mb-1"
        ref={contextRef}
        onContextMenu={(e) => handleOnContextMenu(e, file)}
       >
        <span>
         <input type="checkbox" id={file.name} className="hidden" />
         <label
          htmlFor={file.name}
          className="border w-4 h-4 block rounded-[4px] cursor-pointer"
         />
        </span>
        <div className="col-span-2 flex items-center gap-4">
         <span className="text-2xl">
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
          <span className="text-xs text-neutral-500 capitalize">
           {file.type}
          </span>
         </div>
        </div>
        <span>{file.size}</span>
        <span>{file.status}</span>
        <span>{file.timeLeft}</span>
        <span>{file.date}</span>
       </div>
      ))}
     </div>
     <div className="absolute bottom-[95px] border-t-2 border-t-neutral-800 w-full left-0 py-6">
      <div className="pl-11 customGrid items-center justify-center">
       <span>
        <label
         htmlFor="checkAll"
         className="border w-4 h-4 block rounded-[4px]"
        >
         <input
          type="checkbox"
          name="checkAll"
          id="checkAll"
          className="hidden"
         />
        </label>
       </span>
       <span>Select all</span>
      </div>
     </div>
    </div>
   </main>
  </div>
 );
}
