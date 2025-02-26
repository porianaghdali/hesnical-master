//
"use client";

import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import {note} from "@/utiles/dummy";
import RichTextEditor from "@/components/RichTextEditor";
Modal.setAppElement(document.body);

const NoteModal = () => {
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
 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState();
  const renderStep1 = () => (
    <>
      <h2 className="text-base leading-[24.8px] font-semibold mb-4">
      یادداشت      </h2>
      <p className="text-xs mb-6 leading-[19px]">
      
      </p>
      <RichTextEditor/>
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
          className=" flex justify-center "
        >
          {note}
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
          { renderStep1() }
        </Modal>
      </div>
    </>
  );
};

export default NoteModal;
