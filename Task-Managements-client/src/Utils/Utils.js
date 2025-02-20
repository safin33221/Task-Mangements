import axios from "axios"

export const imageUpload = async imgdata => {
    const formData = new FormData()

    formData.append('image', imgdata)
  
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_api}`, formData)
    return data.data.url
}

