import axios from 'axios'


export const uploadFile = async(Image) => {
    try {
        const formData = new FormData()
        formData.append('Image', Image)

        const uploadImage = await axios.post('/api/nft/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        
        return uploadImage.data.imageUrl
        
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error.message)
        throw error
    }
}