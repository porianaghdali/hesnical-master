// const Card = () => {
//   return (
//     <div className="bg-white rounded-lg">
//       <div className="p-4">header</div>
//       <hr/>
//       <div className="p-4">main</div>
//     </div>
//   );
// };
// export default Card;

import React from "react";
import { description } from "../utiles/dummy";
const Card = React.memo(({ title, value, des }) => {
  return (
    <div
      style={{
        boxShadow:
          "0px 1px 2px 0px var(--Colors-Effects-Shadows-shadow-xs, rgba(10, 13, 18, 0.05))",
      }}
      className="  rounded-xl border-[1px] border-[#E9EAEB] p-5  bg-white  w-full "
    >
      <div className="text-[16px] font-semibold text-[#535862 ] mb-2 flex justify-between">
        {title}{" "}
        <div className="relative group">
  <button className="">
    {description}
  </button>
  <p className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 text-xs text-white bg-[#0A0D12] font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-200 
     before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:top-full 
     before:border-4 before:border-transparent before:border-t-[#0A0D12]">
    {des}
  </p>
</div>

      </div>
      <div className="text-3xl font-semibold text-[#181D27">{value}</div>
    </div>
  );
});

export default Card;
