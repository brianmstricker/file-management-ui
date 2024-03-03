import LeftSide from "@/components/LeftSide";

export default function Home() {
 return (
  <div className="flex-1 h-full flex">
   <LeftSide />
   <main className="flex-1">main</main>
  </div>
 );
}
