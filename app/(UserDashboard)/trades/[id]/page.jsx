
// import RichTextEditor from "@/components/RichTextEditor";
// import LineChart from "@/utiles/charts/lineChart";
// import { RightArrow,LeftArrow} from "@/utiles/dummy";
// import TagModal from "./tagModal";
// const SelectedTrade = ({ params }) => {

//   const table = [
//     { title: "Volume", id: 1 },
//     { title: "side", id: 2 },
//     { title: "P&L", id: 3 },
//     { title: "Take profit", id: 4 },
//     { title: "Stoploss", id: 5 },
//     { title: "swap", id: 6 },
//     { title: "margin", id: 7 },
//     { title: "Entry Price", id: 8 },
//     { title: "Exit Price", id: 9 },
//     { title: "duration", id: 10 },
//     { title: "comm", id: 11 },
//     { title: "Pip", id: 12 },
//     { title: "rpp", id: 13 },
//     { title: "drawdown", id: 14 },
//     { title: "sb", id: 15 },
//     { title: "eb", id: 16 },
//     { title: "cml", id: 17 },
//     { title: "ltt", id: 18 },
//   ];
//   const options = {
//     plugins: {
//       legend: {
//         labels: {
//           font: {
//             family: "Raavi",
//             size: 16,
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           font: {
//             family: "Raavi",
//             size: 14,
//           },
//         },
//       },
//       y: {
//         ticks: {
//           font: {
//             family: "Raavi",
//             size: 14,
//           },
//         },
//       },
//     },
//   };
//   const data = {
//     labels: [
//       "2025-02-01",
//       "2025-02-05",
//       "2025-02-10",
//       "2025-02-20",
//     ],
//     datasets: [
//       {
//         label: "سود",
//         data: [1000, 1200, 900, 1100],
//         borderColor: "rgba(75,192,192,1)",
//         backgroundColor: "rgba(75,192,192,0.2)",
//         borderWidth: 2,
//         tension: 0.3, // برای نرم‌تر شدن خط
//       },
//     ],
//   };
//   return (
//     <div className="grid grid-cols-2  gap-2">
//       <div className="col-span-2 py-2 text-center flex justify-between">
//         <button className="flex gap-2">{RightArrow}معامله قبلی</button>
//         <p>helllo {params.id}</p>
//         <button className="flex gap-2">معامله بعدی {LeftArrow}</button>
        
//         </div>

//       <div className="col-span-1 border-[1px] grid  p-4 border-[#E0E0E0] rounded-xl bg-[#FAFAFA]">
//         <div className="grid grid-cols-3 border-b-[1px] border-[#E0E0E0] pb-4">
//           <div>
//             <p>entry date</p>
//             <p>28/04/2024 09:45</p>
//           </div>
//           <div>
//             <p>exit date</p>
//             <p>28/04/2024 11:45</p>
//           </div>
//           <div className="text-end">Logo</div>
//         </div>
//         <div className="grid grid-cols-5 justify-between gap-y-12 border-b-[1px] py-4 border-[#E0E0E0]">
//           {table.map((item, key) => {
//             return (
//               <div className="grid gap-1" key={key}>
//                 <p className="text-xs text-[#6A6A6A] text-center leading-[18.6px]">
//                   {item.title}
//                 </p>
//                 <p className="text-sm text-[22] text-center leading-[21.7px]">
//                   {item.id}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//         <div className="w-[70%] mx-auto">
//           <LineChart data={data} options={options} />
//         </div>
//       </div>
//       <div className="col-span-1 border-[1px] p-4 border-[#E0E0E0] rounded-xl bg-[#FAFAFA]">
//         <div className="grid grid-cols-1 pb-4 border-b-[1px] border-[#E0E0E0] gap-6">
//           <div>
//             <p className="text-sm leading-[18.5px] ">برچسب</p>
//           </div>

         
//             <div className="text-sm leading-[18.5px] "><TagModal/></div>
          
//         </div>
//         <div className="py-4 flex flex-col gap-6 h-full">
//           <p className="text-sm leading-[18.5px] ">یادداشت</p>

//           <RichTextEditor />
          
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SelectedTrade;
'use client'

import { useParams } from 'next/navigation'; // برای دریافت params در App Router
import RichTextEditor from "@/components/RichTextEditor";
import LineChart from "@/utiles/charts/lineChart";
import { RightArrow, LeftArrow } from "@/utiles/dummy";
import TagModal from "./tagModal";

const SelectedTrade = () => {
  const params = useParams(); // استفاده از useParams برای دریافت پارامترها

  const table = [
    { title: "Volume", id: 1 },
    { title: "side", id: 2 },
    { title: "P&L", id: 3 },
    { title: "Take profit", id: 4 },
    { title: "Stoploss", id: 5 },
    { title: "swap", id: 6 },
    { title: "margin", id: 7 },
    { title: "Entry Price", id: 8 },
    { title: "Exit Price", id: 9 },
    { title: "duration", id: 10 },
    { title: "comm", id: 11 },
    { title: "Pip", id: 12 },
    { title: "rpp", id: 13 },
    { title: "drawdown", id: 14 },
    { title: "sb", id: 15 },
    { title: "eb", id: 16 },
    { title: "cml", id: 17 },
    { title: "ltt", id: 18 },
  ];

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            family: "Raavi",
            size: 16,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "Raavi",
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: "Raavi",
            size: 14,
          },
        },
      },
    },
  };

  const data = {
    labels: [
      "2025-02-01",
      "2025-02-05",
      "2025-02-10",
      "2025-02-20",
    ],
    datasets: [
      {
        label: "سود",
        data: [1000, 1200, 900, 1100],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 2,
        tension: 0.3, // برای نرم‌تر شدن خط
      },
    ],
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="col-span-2 py-2 text-center flex justify-between">
        <button className="flex gap-2">{RightArrow}معامله قبلی</button>
        <p>helllo {params.id}</p>
        <button className="flex gap-2">معامله بعدی {LeftArrow}</button>
      </div>

      <div className="col-span-1 border-[1px] grid p-4 border-[#E0E0E0] rounded-xl bg-[#FAFAFA]">
        <div className="grid grid-cols-3 border-b-[1px] border-[#E0E0E0] pb-4">
          <div>
            <p>entry date</p>
            <p>28/04/2024 09:45</p>
          </div>
          <div>
            <p>exit date</p>
            <p>28/04/2024 11:45</p>
          </div>
          <div className="text-end">Logo</div>
        </div>
        <div className="grid grid-cols-5 justify-between gap-y-12 border-b-[1px] py-4 border-[#E0E0E0]">
          {table.map((item, key) => (
            <div className="grid gap-1" key={key}>
              <p className="text-xs text-[#6A6A6A] font-normal text-center leading-[18.6px]">
                {item.title}
              </p>
              <p className="text-sm text-[22] font-semibold text-center leading-[21.7px]">
                {item.id}
              </p>
            </div>
          ))}
        </div>
        <div className="w-[70%] mx-auto">
          <LineChart data={data} options={options} />
        </div>
      </div>

      <div className="col-span-1 border-[1px] p-4 border-[#E0E0E0] rounded-xl bg-[#FAFAFA]">
        <div className="grid grid-cols-1 pb-4 border-b-[1px] border-[#E0E0E0] gap-6">
          <div>
            <p className="text-sm leading-[18.5px]">برچسب</p>
          </div>
          <div className="text-sm leading-[18.5px]">
            <TagModal />
          </div>
        </div>
        <div className="py-4 flex flex-col gap-6 h-full">
          <p className="text-sm leading-[18.5px]">یادداشت</p>
          <RichTextEditor />
        </div>
      </div>
    </div>
  );
};

export default SelectedTrade;
