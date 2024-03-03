const TopBar = () => {
 const features = ["Tasks", "File", "Downloads", "View", "Help"];
 return (
  <div className="border-b-2 border-b-neutral-800">
   <div className="pt-4 flex items-center gap-x-3 px-6">
    <span>logo</span>
    <h1>Internet Download Manager 10.36</h1>
   </div>
   <div className="pt-8 pb-8 px-6">
    <ul className="flex gap-x-6">
     {features.map((feature) => (
      <li
       key={feature}
       className="text-neutral-500 cursor-pointer transition-all duration-300 hover:text-neutral-400"
      >
       {feature}
      </li>
     ))}
    </ul>
   </div>
  </div>
 );
};
export default TopBar;
