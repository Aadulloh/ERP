import axiosInstance from ".";
import { Notification } from "@helpers";

export function apiConfig() {
  async function getRequest(url: string, params: object = {}) {
    try {
      const res = await axiosInstance.get(url, { params });
      return res;
    } catch (error) {
        console.log(error);
        
    }
  }

  async function postRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.post(url, body);
      return res;
    } catch (error:any) {
        Notification("error", error?.message);

    }
  }
  return { getRequest, postRequest };
}
