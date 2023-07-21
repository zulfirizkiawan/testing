import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function CardCart({
  img,
  title,
  price,
  description,
  //   quantity,
  //   handleIncrement,
  //   handleDecrement,
}) {
  const [quantity, setQuantity] = useState(1); // State untuk menyimpan jumlah quantity

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="w-full mt-8">
      <div className="flex flex-row">
        <div>
          <img
            src={img}
            alt="img-cart"
            className="h-[100px] w-[100px] object-cover"
          />
        </div>
        <div className="ml-5">
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
          <div className="grid grid-cols-2">
            <div className="flex">{description}</div>
            <div className="flex">
              <div
                className="bg-cyan-600 rounded-lg text-white px-2 items-center cursor-pointer"
                onClick={handleIncrement}
              >
                -
              </div>
              <div className="px-4">{quantity}</div>
              <div
                className="bg-cyan-600 rounded-lg text-white px-2 items-center cursor-pointer"
                onClick={handleDecrement}
              >
                +
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <input
          type="text"
          className="w-full px-4 py-1 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring focus:border-cyan-600"
          placeholder="Masukkan catatan di sini..."
        />
      </div>
    </div>
  );
}
