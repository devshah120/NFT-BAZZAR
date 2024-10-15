import axios from "axios";

export class NftsService {




    async createNft({Name,Token_ID,Royalties,Creator,Description,Image,Owner,Price}){
        try {
            const formData = new FormData();
            formData.append('Image', Image);

            const uploadImage = await axios.post('/api/nft/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });

              if (uploadImage.status === 200) {
                // Proceed with minting the NFT
                const nftData = await axios.post('/api/nft/mint', { Name,Token_ID,Royalties,Creator,Description,Image,Owner,Price, Image_URL: uploadImage.data.imageUrl });
                console.log(nftData);
                return nftData
              } else {
                console.log("erro in image uploading");
              }
        } catch (error) {
            throw error
        }
    }

    async getAllNfts(){
        try {
          const allNfts = await axios.get('/api/nft/allNft')
          return allNfts;
        } catch (error) {
            throw error
        }
    }

    async getNft(id){   
        try {
          const nftData = await axios.get(`/api/nft/id/${id}`)
          return nftData;
        } catch (error) {
            throw error
        }
    }

    async getNftByCat(cat){   
      try {
        const nftData = await axios.get(`/api/nft/cat/${cat}`)
        return nftData;
      } catch (error) {
          throw error
      }
    }

    async getNftByCre(cre){   
      try {
        const nftData = await axios.get(`/api/nft/cre/${cre}`)
        return nftData;
      } catch (error) {
          throw error
      }
    }
    
    async searchNfts(search){
      try {
        console.log(search);
        
        const nftData = await axios.post(`/api/nft/searchnfts`, {search})
        console.log(nftData);
        return nftData;
        
      } catch (error) {
        throw error
      }
    }
}

const nftsService = new NftsService();

export default nftsService