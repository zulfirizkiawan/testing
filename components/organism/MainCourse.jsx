import CardFood from "@/components/molecules/CardFood";
import React, { useCallback, useEffect, useState } from "react";
import { getFeaturedMenu } from "@/services/testapi";
import HeaderMenu from "./HeaderMenu";

const MainCourse = () => {
  const [menuList, setMenuList] = useState([]);

  const getMenuList = useCallback(async () => {
    const data = await getFeaturedMenu();
    // console.log("data makanan", data);
    setMenuList(data);
  }, []);

  useEffect(() => {
    getMenuList();
  }, [getMenuList]);

  useEffect(() => {}, [menuList]);

  return (
    <div className="px-10 py-14">
      <HeaderMenu />

      <div className="grid grid-cols-6 gap-5 mt-9">
        {menuList.map((item) => {
          return (
            <CardFood
              key={item.id}
              img={item.gambar}
              title={item.nama}
              price={item.harga}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MainCourse;
