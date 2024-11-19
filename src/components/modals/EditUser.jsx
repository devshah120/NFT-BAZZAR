import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {useForm, useWatch} from 'react-hook-form'
import { RxCross2 } from "react-icons/rx";
import { FaPen } from "react-icons/fa";
import { uploadFile } from '../../utils/uploadFile';
import { login } from '../../store/authSlice';
import UserService from '../../dataGathering/userData';


function EditUser({userdata,onClose}) {

    const dispatch = useDispatch()
 
  const { register, handleSubmit, control } = useForm()
  const [mainImage, setMainImage] = useState()
  const [bgImage, setBgImage] = useState()
  const MainImage_URL = useWatch({
    name: "MainImage_URL", // watch the Image field
    control, // control comes from useForm
    defaultValue: null, // set a default value
  });
  const BgImage_URL = useWatch({
    name: "BgImage_URL", // watch the Image field
    control, // control comes from useForm
    defaultValue: null, // set a default value
  });
  const submit = async (data) => {

    console.log(data);

    try {
        // Helper function to handle image uploads and update the user
        const handleImageUploadAndUpdate = async (images) => {
          const { BgImage_URL, MainImage_URL } = images;
          console.log(BgImage_URL, MainImage_URL);
          
          const uploadedBgImage = BgImage_URL[0] ? await uploadFile(BgImage_URL[0]) : userdata.BgImage_URL;
          const uploadedMainImage = MainImage_URL[0] ? await uploadFile(MainImage_URL[0]) : userdata.MainImage_URL;
    
          if (uploadedBgImage !== undefined && uploadedMainImage !== undefined) {
            const updatedData = { ...data };
            if (uploadedBgImage) updatedData.BgImage_URL = uploadedBgImage;
            if (uploadedMainImage) updatedData.MainImage_URL = uploadedMainImage;
    
            const res = await UserService.updateUser({...updatedData,_id: userdata._id})
    
            if (res.data.success) {
              const userData = res.data.updatedUser;
              dispatch(login({ userData }));
              onClose();
            } else {
              console.error("Error updating user data:", res.data.message);
            }
          } else {
            console.error("Error in uploading images.");
          }
        }
        // Check and handle different image scenarios
        if (data.BgImage_URL || data.MainImage_URL) {
          await handleImageUploadAndUpdate(data);
        } else {
          // If no new images, send data as is
          const res = await axios.post('http://localhost:3000/api/user/updateuser', {
            ...data,
            MainImage_URL: userdata.MainImage_URL,
            BgImage_URL: userdata.BgImage_URL,
            _id: userdata._id,
          })
    
          if (res.data.success) {
            const userData = res.data.updatedUser;
            dispatch(login({ userData }));
            onClose();
          } else {
            console.error("Error updating user data:", res.data.message);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    
    


    
  }
  useEffect(() => {
    // Create and set main image URL
    let mainImageUrl;
    if (MainImage_URL && MainImage_URL[0]) {
      try {
        mainImageUrl = URL.createObjectURL(MainImage_URL[0]);
        setMainImage(mainImageUrl);
      } catch (error) {
        console.error("Failed to create main image URL:", error);
      }
    }

    // Create and set background image URL
    let bgImageUrl;
    if (BgImage_URL && BgImage_URL[0]) {
      try {
        bgImageUrl = URL.createObjectURL(BgImage_URL[0]);
        setBgImage(bgImageUrl);
      } catch (error) {
        console.error("Failed to create background image URL:", error);
      }
    }

    // Cleanup function to revoke object URLs
    return () => {
      if (mainImageUrl) {
        URL.revokeObjectURL(mainImageUrl);
      }
      if (bgImageUrl) {
        URL.revokeObjectURL(bgImageUrl);
      }
    };
  }, [MainImage_URL, BgImage_URL]);
  return (
    <div className=' fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex items-center justify-center rounded-3xl z-20'>
      <div className=' bg-white p-4 m-1 rounded w-full max-w-sm relative py-10'>
        <RxCross2 onClick={onClose} className=' absolute h-6 w-6 right-2 top-2'/>
        <h2 className=' text-center font-semibold'>Profile</h2>
        <p className=' text-center text-sm'>Edit your details</p>

        <form onSubmit={handleSubmit(submit)} className='grid gap-2 mt-5'>
        <div >
            <label htmlFor="BgImage_URL" className=' flex items-center justify-center' >
              <div className=' relative w-fit'>
                {
                  bgImage? <img src={bgImage} alt="" className='h-24  border-[3px]' /> : <img src={userdata?.BgImage_URL} alt="" className='h-24   border-[3px]' /> 
                }
                
                <div className='bg-white p-[5px] border-[3px] h-8 w-8 flex items-center justify-center rounded-full absolute -right-3 -bottom-3'><FaPen /></div>
              </div>
            </label>
            <input type="file" name="BgImage_URL" id="BgImage_URL" {...register("BgImage_URL")} hidden />
          </div>
          <div >
            <label htmlFor="MainImage_URL" className=' flex items-center justify-center' >
              <div className=' relative w-fit'>
                {
                  mainImage? <img src={mainImage} alt="" className='h-24 w-24 rounded-full border-[3px]' /> : <img src={userdata?.MainImage_URL} alt="" className='h-24 w-24 rounded-full border-[3px]' /> 
                }
                
                <div className='bg-white p-[5px] border-[3px] h-8 w-8 flex items-center justify-center rounded-full absolute right-0 bottom-1'><FaPen /></div>
              </div>
            </label>
            <input type="file" name="MainImage_URL" id="MainImage_URL" {...register("MainImage_URL")} hidden />
          </div>
          <div className=' flex flex-col gap-1'>
            <label htmlFor="name">Name</label>
            <input type="text" name="Name" id="Name" {...register("Name")} defaultValue={userdata?.Name} required placeholder=' Enter your name' className=' bg-slate-100 rounded-md px-2 py-1 border' />
          </div>
          <div className=' flex flex-col gap-1'>
            <label htmlFor="Description">Description</label>
            <input type="text" name="Description" id="Description" {...register("Description")} defaultValue={userdata?.Description} required placeholder=' Enter your Description' className=' bg-slate-100 rounded-md px-2 py-1 border' />
          </div>
          <button className=' bg-slate-600 hover:bg-slate-700 rounded-md text-lg h-8 mt-5 font-semibold text-white'>
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditUser