import axios from "axios";

// axios.defaults.withCredentials = true;

export const GetSideBar = async (id: string,token:string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/getUnAssignSidebar?userId=${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

type LoginFormInputs = {
  id: string; // userId
  Menu: {
    MenuId: string;
    subMenu: {
      SubMenuId: string;
      canView: boolean;
    }[];
  }[];
};
// type AssignMenuParams = {
//   MenuId: string;
//   canView?: boolean;
//   subMenus: {
//     SubMenuId: string;
//     canView?: boolean;
//   }[];
// };
export const UpdateAccessRights = async (data:LoginFormInputs[]) => {
  console.log(data);
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/assignMenuToRole`, {
   data
  });

  console.log("this is response form api of access right:",response)
  return response.data;
}


export const GetSideMenu = async (token:string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/GetMenuWithSubMenu`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};