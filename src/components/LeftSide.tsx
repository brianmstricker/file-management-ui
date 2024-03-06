"use client";
import { TbFolderDown, TbFolderCheck, TbRectangle } from "react-icons/tb";
import { CiMusicNote1 } from "react-icons/ci";
import { FaRegFileArchive, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoVideocamOutline, IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineAndroid } from "react-icons/ai";
import { PiImage, PiFolders } from "react-icons/pi";
import { useState } from "react";
import { cn } from "@/lib/utils";
import DiskSpace from "./DiskSpace";

const categories = [
 {
  idx: 0,
  name: "All Downloads",
  icon: <PiFolders />,
  opened: false,
  subcategories: [
   { name: "Music", icon: <CiMusicNote1 /> },
   { name: "Compressed", icon: <FaRegFileArchive /> },
   { name: "Videos", icon: <IoVideocamOutline /> },
   { name: "Programs", icon: <TbRectangle /> },
   { name: "Documents", icon: <IoDocumentTextOutline /> },
   { name: "APKs", icon: <AiOutlineAndroid /> },
   { name: "Images", icon: <PiImage /> },
  ],
 },
 {
  idx: 1,
  name: "Unfinished",
  opened: false,
  icon: <TbFolderDown />,
 },
 { idx: 2, name: "Finished", opened: false, icon: <TbFolderCheck /> },
];

type Category = {
 idx: number;
 name: string;
 icon: JSX.Element;
 opened: boolean;
 subcategories?: { name: string; icon: JSX.Element }[];
};

const LeftSide = () => {
 const [menuOpen, setMenuOpen] = useState<{ idx: number; opened: boolean }[]>(
  []
 );
 const handleMenuClick = (category: Category) => {
  setMenuOpen((prev) => {
   const idx = prev.findIndex((item) => item.idx === category.idx);
   if (idx === -1) {
    const updated = [...prev, { idx: category.idx, opened: true }];
    return updated;
   }
   const updated = [...prev];
   updated[idx] = { ...updated[idx], opened: !updated[idx].opened };
   return updated;
  });
 };
 return (
  <aside className="border-r-2 border-r-neutral-800 text-neutral-400 p-2 lg:p-6 flex-col justify-between xl:min-w-[300px] hidden lg:flex">
   <div className="flex flex-col border border-neutral-800 p-2 lg:px-4 py-1 rounded-xl transition-all duration-200 mb-4">
    {categories.map((category) => (
     <div
      key={category.name}
      className="relative mb-1 transition-all duration-500 ease-in-out overflow-auto"
     >
      <div
       onClick={() => handleMenuClick(category)}
       className="cursor-pointer transition-all duration-500 bg-neutral-900 z-[2] hover:bg-neutral-800 flex items-center p-2 rounded-xl justify-between w-full sticky top-0"
      >
       <div className="flex flex-1 items-center gap-x-3">
        <span className="text-xl">{category.icon}</span>
        <span>{category.name}</span>
       </div>
       <div>
        <FaChevronDown
         className={cn(
          "transition-all duration-200 ml-2",
          menuOpen?.map(
           (item) => item.idx === category.idx && item.opened && "rotate-180"
          )
         )}
        />
       </div>
      </div>
      <ul
       className={cn(
        "mx-auto flex flex-col w-fit gap-y-1 lg:gap-y-2 transition-all duration-500 opacity-0 ease-in h-0 -translate-y-2",
        menuOpen?.map(
         (item) =>
          item.idx === category.idx &&
          item.opened &&
          "opacity-100 h-auto translate-y-0"
        )
       )}
      >
       {menuOpen?.map(
        (item) =>
         item.idx === category.idx &&
         item.opened &&
         category.subcategories?.map((subcategory) => (
          <li
           key={subcategory.name}
           className="flex items-center gap-x-3 transition-all duration-300 cursor-pointer hover:bg-neutral-800 py-1 px-3 rounded-xl"
          >
           <span className="text-neutral-300">{subcategory.icon}</span>
           <span className="text-sm text-neutral-500">{subcategory.name}</span>
          </li>
         ))
       )}
      </ul>
     </div>
    ))}
   </div>
   <DiskSpace />
  </aside>
 );
};
export default LeftSide;
