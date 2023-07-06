import axiosInstance from './axios.service'
import BaseUrl from "./url.service"

const serverUrl = `${BaseUrl}/leads`


export const getAllLeads = async (query) => {
    return axiosInstance.get(`${serverUrl}/getLeadsForAdmin?${query}`)
}

