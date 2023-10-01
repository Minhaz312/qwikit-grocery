import { API_URL } from "@/constants"

const url = API_URL+"/category"

export const getAllCategory = async () => {
    const res = await fetch(`${url}/get/all`)
    return await res.json()
}