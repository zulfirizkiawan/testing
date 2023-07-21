import axios from "axios";

const URL = "https://tes-mobile.landa.id";
export async function getFeaturedMenu() {
  try {
    const response = await axios.get(`${URL}/api/menus`);

    const resMenu = response.data.datas;
    return resMenu;
  } catch (error) {
    throw error;
  }
}

export async function getVoucher() {
  try {
    const response = await axios.get(`${URL}/api/vouchers?kode=puas`);

    const resMenu = response.data.datas;
    return resMenu;
  } catch (error) {
    throw error;
  }
}
