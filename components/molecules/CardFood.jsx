import Image from "next/image";
import React from "react";
import { NumericFormat } from "react-number-format";
import { BsPlus } from "react-icons/bs";

export default function CardFood({ img, title, price }) {
  return (
    <div className="h-auto p-2 bg-white rounded-lg">
      <img src={img} alt="product" className="w-full h-[150px] object-cover" />
      <div className="flexjustify-between py-2">
        <div className="text-gray-900">{title}</div>
        <div className="text-cyan-500">
          <NumericFormat
            value={price}
            prefix="Rp. "
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
          />
        </div>
      </div>
      <a href="#">
        <button className="flex rounded-lg bg-cyan-500 w-full text-white px-2 py-1 text-sm">
          <BsPlus size={20} />
          Tambahkan ke keranjang
        </button>
      </a>
    </div>
  );
}
