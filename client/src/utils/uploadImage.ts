import { axios } from '../core/axios'

interface UploadImageReturnProps {
    url: string;
    height: number;
    width: number;
    size: number;
}

export const uploadImage = async (image: File) : Promise<UploadImageReturnProps> => {
    
    const formData = new FormData()
    formData.append('image', image)

    const { data } = await axios.post('/upload', formData, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })

    return data
}   