//
"use client";

import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Plus, RightArrow, setting, tick } from "@/utiles/dummy";
Modal.setAppElement(document.body);

const TagModal = () => {
  const { token } = useUser();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [tags, setTages] = useState([]);
  const [step, setStep] = useState(1);
  useEffect(() => {
    axios
      .get(apiUrl + "/api/v1/TradeNoteAndTags", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTages(res.data);
      })
      .catch((err) => {});
  }, []);
  const palet = [
    {
      id: 0,
      rgb: "brown",
    },
    {
      id: 1,
      rgb: "red",
    },
    {
      id: 2,
      rgb: "yellow",
    },
    {
      id: 3,
      rgb: "blue",
    },
    {
      id: 4,
      rgb: "gray",
    },
    {
      id: 5,
      rgb: "green",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState();
  const renderStep1 = () => (
    <>
      <h2 className="text-base leading-[24.8px] font-semibold mb-4">
        برچسب ها
      </h2>
      <p className="text-xs mb-6 leading-[19px]">
        در صورتی که برچسب مورد نظر خود رادر لیست زیر یافت نکردید میتوانید با
        کلیک بر روی دکمه ی افزودن برچسب مورد نظرتان را به لیست اضافه نمایید .{" "}
      </p>
      <div className="pb-4 border-b-[1px] border-[#E0E0E0] mb-4 flex justify-between ">
        <button
          onClick={() => setStep(2)}
          className="rounded-full border-[1px] text-xs text- text-[#8E8D8D] px-4 py-1  border-[#8E8D8D] flex justify-center bg-[#F1F0F0]"
        >
          {Plus}{" "}
          <p style={{ paddingTop: "inherit" }} className="text-center ">
            افزودن برچسب
          </p>
        </button>
        <button className="flex  items-center">{setting}</button>
      </div>
      <div className="flex gap-4 flex-wrap border-b-[1px] border-[#E0E0E0] mb-4 pb-4">
        {tags?.data?.$values.map((tag, key) => {
          return (
            <button
              key={key}
              onClick={() => setIsOpen(true)}
              className="rounded-full border-[1px] text-[#8E8D8D] px-4 py-1 border-[#8E8D8D] flex justify-center bg-[#F1F0F0]"
            >
              {tag.tags}
            </button>
          );
        })}
      </div>
      <div className="flex justify-around gap-4">
        {" "}
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 w-full  bg-[#646464] rounded-lg text-white  py-2  text-base font-light"
        >
          تایید
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 w-full border-[1px] rounded-lg border-[#9F9F9F] bg-[#FFFFFF] text-[#646464]   py-2 text-base font-light"
        >
          انصراف
        </button>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h2 className="text-base leading-[24.8px] font-semibold mb-4 flex gap-1">
        <button onClick={() => setStep(1)}>{RightArrow}</button>
        افزودن برچسب
      </h2>
      <p className="text-xs mb-6 leading-[19px]">
        عنوان و مشخصات برچسب مورد نظر خود را وارد نمایید .
      </p>
      <div className="pb-4 border-b-[1px] border-[#E0E0E0] mb-4 grid gap-1 ">
        <label className="text-[10px] text-[#565656]" htmlFor="tagName">
          عنوان برچسب
        </label>
        <input
          className="border-[1px] border-[#E0E0E0] rounded w-1/2 outline-none px-2 py-1"
          id="tagName"
          type="text"
          minLength="3"
          maxLength="10"
        />
        <label className="text-[10px] text-[#565656]">
          حداقل و حداکثر تعداد کاراکتر
        </label>
      </div>
      <div className="grid gap-2 flex-wrap mb-4 pb-4">
        <p className="text-xs  leading-[19px]">رنگ برچسب </p>
        <div className="flex gap-3">
          {palet.map((item, key) => {
            return (
              <button
                onClick={() => {
                  setSelectedColor(item.id);
                }}
                style={{ backgroundColor: item.rgb }}
                className="w-[30px] h-[30px] rounded flex justify-center items-center"
                key={key}
              >
                {selectedColor === key ? tick : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex justify-around gap-4">
        {" "}
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 w-full  bg-[#646464] rounded-lg text-white  py-2  text-base font-light"
        >
          ذخیره
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 w-full border-[1px] rounded-lg border-[#9F9F9F] bg-[#FFFFFF] text-[#646464]   py-2 text-base font-light"
        >
          انصراف
        </button>
      </div>
    </>
  );
  return (
    <>
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full border-[1px] w-[94px] px-2 py-1 border-[#8E8D8D] flex justify-center bg-[#F1F0F0]"
        >
          {Plus}
        </button>

        <Modal
          isOpen={isOpen}
          onAfterClose={() => {
            setStep(1)
            setSelectedColor(null)
          }}
          onRequestClose={() => setIsOpen(false)}
          className="bg-white p-6 rounded-lg shadow-lg w-[433px]"
          overlayClassName="fixed inset-0 flex items-center justify-center bg-black/50"
        >
          {step == 1 ? renderStep1() : renderStep2()}
        </Modal>
      </div>
    </>
  );
};

export default TagModal;
