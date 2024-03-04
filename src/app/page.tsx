import LeftSide from "@/components/LeftSide";
import PageTopBar from "@/components/PageTopBar";

export default function Home() {
 return (
  <div className="flex-1 h-full flex">
   <LeftSide />
   <main className="flex-1">
    <PageTopBar />
    <div>main</div>
   </main>
  </div>
 );
}
