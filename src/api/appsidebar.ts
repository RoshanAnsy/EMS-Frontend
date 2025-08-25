import axios from "axios";

// axios.defaults.withCredentials = true;

export const GetSideBar = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assignMenuToRole`);
  return response.data;
};
