import { whitePlus, file } from "@/utiles/dummy";
import Image from "next/image";
import Link from "next/link";
const NoAccount = () => {
  return (
    <div className="h-full">
      <p className="w-full p-4 border-b-[1px] border-[#E9EAEB] text-[#181D27] text-2xl leading-8 font-semibold">
        لیست حساب های معاملاتی
      </p>

      <div className="grid items-center justify-center gap-1 h-full">
        <div className="grid gap-1">
          <div  className="flex justify-center mb-7   ">
            <div style={
              {
                boxShadow: "0px 0px 0px 1px var(--Colors-Effects-Shadows-shadow-skeumorphic-inner-border, rgba(10, 13, 18, 0.18)) inset, 0px -2px 0px 0px var(--Colors-Effects-Shadows-shadow-skeumorphic-inner, rgba(10, 13, 18, 0.05)) inset, 0px 1px 2px 0px var(--Colors-Effects-Shadows-shadow-xs, rgba(10, 13, 18, 0.05))"

              }
            } className="p-3 rounded-[10px] border"> {file}</div>
           
            <div style={{
            backgroundImage: "url('/img/accountsImg.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }} className="absolute h-[520px] w-[520px] top-[50%] -z-0 translate-y-[-52%]  right-[50%] translate-x-[49.5%] ">

            </div>
          </div>
          <p className="text-[16px] z-10 text-center font-semibold text-[#181D27] leading-6">
            {" "}
            لیست حساب معاملاتی شما خالی است
          </p>
          <p className="text-sm mb-5 z-10 text-center text-[#535862] leading-5">
            {" "}
            برای مشاهده اطلاعات و عملکرد معاملات، لطفاً یک حساب معاملاتی اضافه
            کنید.
          </p>
          <Link href="/addAccount" className="px-4 z-10 gap-2 mx-auto text-white bg-[#8658D7] flex py-2.5 border-[2px] border-[#8658D7] rounded-lg">
            {whitePlus}
            افزودن حساب
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NoAccount;
