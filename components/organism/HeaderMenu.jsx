import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlineFastfood } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import CardCart from "../molecules/CardCart";
import { NumericFormat } from "react-number-format";
import { getFeaturedMenu, getVoucher } from "@/services/testapi";
import { ToastContainer, toast } from "react-toastify";

export default function HeaderMenu() {
  const [nav, setNav] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [menuList, setMenuList] = useState([]);
  const [voucher, setVoucher] = useState([]);
  const [voucherInput, setVoucherInput] = useState("");

  const handleNav = () => {
    setNav(!nav);
  };

  const getMenuList = useCallback(async () => {
    const data = await getFeaturedMenu();
    // console.log("data makanan", data);
    setMenuList(data);
  }, []);

  useEffect(() => {
    getMenuList();
  }, [getMenuList]);
  useEffect(() => {}, [menuList]);

  const getVouchers = useCallback(async () => {
    const data = await getVoucher();
    console.log("data voucher", data);
    setVoucher(data);
  }, []);

  useEffect(() => {
    getVouchers();
  }, [getVouchers]);
  useEffect(() => {}, [voucher]);

  useEffect(() => {
    // Hitung total harga setiap kali menuList berubah
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      menuList.forEach((item) => {
        totalPrice += item.harga;
      });

      // Cek apakah input voucher cocok dengan kriteria diskon
      if (voucherInput.toLowerCase() === voucher.kode) {
        totalPrice -= voucher.nominal;
        if (totalPrice < 0) {
          totalPrice = 0;
        } else {
          totalPrice -= voucher.nominal;
        }
      }

      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [menuList, voucherInput]);

  const handleVoucherInput = (e) => {
    setVoucherInput(e.target.value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex">
        <MdOutlineFastfood className="mr-2 text-cyan-600" /> Main Course
      </div>
      <div onClick={handleNav}>
        <button className="relative flex py-1 px-3 rounded-md text-black bg-[#e0e0e0] border border-cyan-600">
          <BsFillCartFill className="mt-1 mr-2 text-cyan-600" /> keranjang
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-[100%] px-2">
            2
          </div>
        </button>
      </div>

      <div
        className={
          nav ? "fixed right-0 top-0 w-full h-screen bg-black/20" : "hidden"
        }
      >
        {/* Side Drawer Menu */}
        <div
          className={
            nav
              ? "fixed right-0 top-0 w-[35%] h-screen bg-white py-10 ease-in duration-500 overflow-y-auto"
              : "fixed right-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div className="py-4 px-3 flex flex-col">
            <div className="justify-between flex flex-row">
              <div className="flex">
                <MdOutlineFastfood className="mr-2 text-cyan-600" /> Main Course
              </div>
              <div onClick={handleNav} className="cursor-pointer">
                <AiOutlineClose size={16} />
              </div>
            </div>
            <div className="py-4 px-3 flex flex-col">
              {menuList.map((item) => {
                return (
                  <CardCart
                    key={item.id}
                    img={item.gambar}
                    title={item.nama}
                    price={item.harga}
                    description="Mantap"
                  />
                );
              })}
            </div>
            <div className="w-full bg-slate-600 h-[0.5px] mb-5" />
            <div>
              <div className="flex">
                <MdOutlineFastfood className="mr-2 text-cyan-600" /> Tambah
                Voucher <span className="ml-2 text-gray-400">(Opsional)</span>
              </div>
              <div className="w-full mt-4">
                <input
                  type="text"
                  value={voucherInput}
                  onChange={handleVoucherInput}
                  className="w-full px-4 py-1 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring focus:border-cyan-600"
                  placeholder="Tambahkan voucher di sini..."
                />
              </div>
            </div>

            <div className="justify-between flex flex-row mt-10">
              <div className="">Total</div>
              <div>
                <NumericFormat
                  value={totalPrice}
                  prefix="Rp. "
                  displayType="text"
                  thousandSeparator="."
                  decimalSeparator=","
                />
              </div>
            </div>

            <a href="#" className="mt-2">
              <button className="flex rounded-lg bg-cyan-500 w-full text-white px-2 py-2 text-sm justify-center">
                Buat pesanan
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
