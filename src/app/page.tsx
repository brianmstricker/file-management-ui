"use client";
import ContextMenu from "@/components/ContextMenu";
import LeftSide from "@/components/LeftSide";
import PageTopBar from "@/components/PageTopBar";
import { files } from "@/lib/constants";
import { useRef, useState } from "react";

const initContextMenu = {
 show: false,
 x: 0,
 y: 0,
};

export default function Home() {
 const [contextMenu, setContextMenu] = useState(initContextMenu);
 const [containerAttr, setContainerAttr] = useState({ width: 0, height: 0 });
 const contextRef = useRef<HTMLDivElement>(null);
 function handleOnContextMenu(e: React.MouseEvent<HTMLDivElement>) {
  e.preventDefault();
  const { clientX, clientY } = e;
  setContextMenu({ show: true, x: clientX, y: clientY });
  if (contextRef.current) {
   const contextAttr = contextRef.current.getBoundingClientRect();
   setContainerAttr({
    width: contextAttr.width,
    height: contextAttr.height,
   });
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
     ref={contextRef}
     onContextMenu={(e) => handleOnContextMenu(e)}
     className="p-4 text-neutral-400 h-full w-full"
    >
     {contextMenu.show && (
      <ContextMenu
       x={contextMenu.x}
       y={contextMenu.y}
       closeMenu={closeContextMenu}
       containerWidth={containerAttr.width}
       containerHeight={containerAttr.height}
      />
     )}
     <table className="max-w-[95%] w-full border-spacing-y-2 border-separate">
      <thead>
       <tr>
        <th>
         <div>
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
         </div>
        </th>
        <th className="text-start">Name</th>
        <th className="text-start">Size</th>
        <th className="text-start">Status</th>
        <th className="text-start">Time Left</th>
        <th className="text-start">Last Modification</th>
       </tr>
      </thead>
      <tbody>
       {files.map((file) => (
        <tr
         key={file.name}
         className="hover:bg-neutral-800/80 transition-all duration-500 cursor-pointer"
        >
         <td>
          <div>
           <label
            htmlFor={file.name}
            className="border w-4 h-4 block rounded-[4px]"
           >
            <input
             type="checkbox"
             name={file.name}
             id={file.name}
             className="hidden"
            />
           </label>
          </div>
         </td>
         <td>{file.name}</td>
         <td>{file.size}</td>
         <td>{file.status}</td>
         <td>{file.timeLeft}</td>
         <td>{file.date}</td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   </main>
  </div>
 );
}
