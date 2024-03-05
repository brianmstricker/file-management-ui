"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { CiFileOn } from "react-icons/ci";

const options = [
 { text: "Open", icon: CiFileOn },
 { text: "Open With", icon: CiFileOn },
 { text: "Open Folder", icon: CiFileOn },
 { text: "separator" },
 { text: "Move/Rename", icon: CiFileOn },
 { text: "separator" },
 { text: "Redownload", icon: CiFileOn },
 { text: "separator" },
 { text: "Resume Download", icon: CiFileOn },
 { text: "separator" },
 { text: "Stop Download", icon: CiFileOn },
 { text: "Refresh Download Address", icon: CiFileOn },
 { text: "separator" },
 { text: "Add to queue", icon: CiFileOn },
 { text: "Delete from queue", icon: CiFileOn },
 { text: "separator" },
 { text: "Properties", icon: CiFileOn },
];

const ContextMenu = ({
 x,
 y,
 closeMenu,
 containerWidth,
 containerHeight,
}: {
 x: number;
 y: number;
 closeMenu: () => void;
 containerWidth: number;
 containerHeight: number;
}) => {
 console.log("cwidth", containerWidth);
 let left;
 let top;
 const halfX = containerWidth / 2;
 const halfY = containerHeight / 2;
 if (x + halfX > window.innerWidth) {
  left = x - halfX + 230;
 } else {
  left = x;
 }
 if (y + halfY + 75 > window.innerHeight) {
  top = y - halfY - 185;
 } else {
  top = y - 105;
 }
 const ref = useRef<HTMLMenuElement>(null);
 useEffect(() => {
  const handleClick = (e: MouseEvent) => {
   if (ref.current && !ref.current.contains(e.target as Node)) {
    closeMenu();
   }
  };
  document.addEventListener("click", handleClick);
  return () => document.removeEventListener("click", handleClick);
 }, [closeMenu]);
 return (
  <menu
   ref={ref}
   className={cn(
    "absolute w-[300px] bg-gradient-to-br from-neutral-700 via-neutral-800 via-20% to-neutral-900 z-50",
    "border border-neutral-800 rounded-xl py-2"
   )}
   style={{ left, top }}
  >
   <ul>
    {options.map((option, idx) => {
     if (option.text === "separator") {
      return (
       <div key={idx} className="bg-neutral-500/20 my-1 w-full h-[2px]" />
      );
     }
     return (
      <li
       key={idx}
       className="flex items-center gap-2 transition-all duration-300 cursor-pointer hover:bg-neutral-600/50 py-1.5 px-8"
      >
       {option.icon && <option.icon className="text-xl" />}
       <span className="text-sm">{option.text}</span>
      </li>
     );
    })}
   </ul>
  </menu>
 );
};
export default ContextMenu;
