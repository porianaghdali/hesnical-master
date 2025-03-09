




const HeaderFilter=()=>{
    return(
        <>
        
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-1 grid gap-1">
            <label htmlFor="Symbole" className="text-[8px]">
              نماد معاملاتی
            </label>
            <input
              type="text"
              id="Symbole"
              className="bg-[#F7F7F7] w-full py-1 px-2 outline-none border-[1px] border-[#9F9F9F] rounded"
            />
          </div>
          <div className="col-span-1 grid gap-1">
            <label htmlFor="" className="text-[8px]">
              برچسب
            </label>
            <select
              className="bg-[#F7F7F7] w-full py-1 px-2 outline-none border-[1px] border-[#9F9F9F] rounded"
              defaultValue="1"
            ></select>
          </div>
          <div className="col-span-1 grid gap-1">
            <label htmlFor="" className="text-[8px]">
              سود و زیان
            </label>
            <select
              className="bg-[#F7F7F7] w-full py-1 px-2 outline-none border-[1px] border-[#9F9F9F] rounded"
              defaultValue="2"
            ></select>
          </div>
          <div className="col-span-1 grid gap-1">
            <label htmlFor="" className="text-[8px]">
              خرید و فروش
            </label>
            <select
              className="bg-[#F7F7F7] w-full py-1 px-2 outline-none border-[1px] border-[#9F9F9F] rounded"
              defaultValue="3"
            ></select>
          </div>
          <div className="col-span-1 grid gap-1">
            <label htmlFor="" className="text-[8px]">
              مدت معامله
            </label>
            <select
              className="bg-[#F7F7F7] w-full py-1 px-2 outline-none border-[1px] border-[#9F9F9F] rounded"
              defaultValue="4"
            ></select>
          </div>
          <div className="col-span-1 grid gap-1"></div>
        </div>
        </>
    )
}
export default HeaderFilter