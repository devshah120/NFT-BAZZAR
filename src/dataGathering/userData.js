import axios from "axios";

export class UserService {

    async login({MetaHash}){
        try {
                // Proceed with minting the NFT
                const userdata = await axios.post('http://127.0.0.1:3000/api/user/login', {MetaHash},{withCredentials: true});
                console.log(userdata);
                return userdata; 
        } catch (error) {
            throw error
        }
    }

    async register({MetaHash,Name,Email,Description,MainImage_URL,BgImage_URL}){
        try {
                // Proceed with minting the NFT
                const userdata = await axios.post('http://127.0.0.1:3000/api/user/register', {MetaHash,Name,Email,Description,MainImage_URL,BgImage_URL});
                console.log(userdata);
                return userdata;
        } catch (error) {
            throw error;
        }
    }

    async updateUser({Name,Description,MainImage_URL,BgImage_URL,_id}){
        try {
            const userdata = await axios.post(`/api/user/userupdate/${_id}`, {Name,Description,MainImage_URL,BgImage_URL},{
                withCredentials: true,
            });
            console.log(userdata);
            return userdata;
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            const res = await axios.get('/api/user/logout', {
                withCredentials: true,
            });
            return res
        } catch (error) {
            throw error;
        }
    }

    async getUserDetails(){
        try {
            const userdata = await axios.get('/api/user/userdetails');
            console.log(userdata);
            return userdata;
        } catch (error) {
            throw error;
        }
    }
    
}

const userService = new UserService();

export default userService