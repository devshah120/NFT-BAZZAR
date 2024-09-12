import React, { useEffect, useState, useContext } from "react";
import { Label, Input, Container } from "../components";
import { cn } from "../utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Preview } from "../components/cards/Preview";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Router } from "react-router-dom";
import { NFTBazzarContext } from "../../Context/NFTBazzarContext";
import Loader from "../components/Loader";

function CreateNFT() {
  const {uploadFileToIPFS,createNFT } = useContext(NFTBazzarContext);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loader, setLoader] = useState(false);

  // const router=Router()
  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoader(true);
      const Image = data.Image[0]; // Ensure Image is correctly extracted
      console.log(Image);

      // Create a FormData object to handle file upload
      const formData = new FormData();
      formData.append("Image", Image);

      // Upload image
      // const uploadImage = await axios.post("/api/nft/upload", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // console.log(uploadImage.data.imageUrl);

      // if (uploadImage.status === 200) {
      //   // Proceed with minting the NFT
      //   const nftData = await axios.post("/api/nft/mint", {
      //     ...data,
      //     Image_URL: uploadImage.data.imageUrl,
      //   });
      //   console.log(nftData);

      //   if (nftData.status === 200) {
      //     navigate("/explore");
      //   }
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const radius = "200";

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
      // Update form data to keep it in sync
      register("Image").onChange(e);
    }
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value); 
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); 
  };

  const handleButtonClick = async () => {
    try {
      setLoader(true);
      if (file) {
        const response=await uploadFileToIPFS(file);
        if (response.success==true) {
          console.log("Uploaded to IPFS link:-",response.pinataURL);
          
          await createNFT(name,description, price,response.pinataURL);
        } // Call uploadToPinata with imageUrl
        setLoader(false);
        navigate("/")
        alert("NFT Minted");
      } else {
        console.error("No image  available to upload.");
        setLoader(false);

      }
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      setLoader(false);
    }
  };

  
  return (
    <section className="my-10">
      <Container>
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center">
          <div className="max-w-md w-full md:mr-10 rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
              Welcome to NFT BAZZAR
            </h2>
            <p className="text-neutral-600 text-sm  text-center max-w-sm mt-2 dark:text-neutral-300">
              Create your unique NFT effortlessly. Upload your artwork, add
              details, set the price, and mint it on the blockchain.
              <br />
              Start now.
            </p>

            <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 mb-4">
                <LabelInputContainer>
                  <Label htmlFor="image">upload image</Label>
                  <Input
                    type="file"
                    className="h-32 w-full"
                    {...register("Image")}
                    onChange={(e) => {
                      handleImageChange(e);
                      register("Image").onChange(e);
                    }}
                  />

                  {/* <Input
                    placeholder="Tyler"
                    type="text"
                    value="Dhruv Shah"
                    radius="200"
                    className="h-32 hidden w-full"
                    {...register("Owner")}
                  /> */}
                  {/* <Input
                    placeholder="Tyler"
                    type="text"
                    value="Soham Patel"
                    radius="200"
                    className="h-32 hidden w-full"
                    {...register("Creator")}
                  /> */}
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="name">NFT Name</Label>
                  <Input
                    placeholder="NFT Name"
                    type="text"
                    {...register("Name")}
                    onChange={handleNameChange} // Handle name change
                    value={name}
                  />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="description">NFT Description</Label>
                <Input
                  placeholder="More About NFT "
                  type="text"
                  {...register("Description")}
                  onChange={handleDescriptionChange}
                  value={description}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="price">NFT Price</Label>
                <Input
                  placeholder="Enter Ammount"
                  type="text"
                  {...register("Price")}
                  onChange={handlePriceChange}
                  value={price}
                />
              </LabelInputContainer>

              <motion.div
                style={{
                  background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className="p-[2px] mb-4 rounded-lg transition duration-300 group/input"
              >
                <div
                  className={cn(
                    `flex flex-col gap-2 w-full border-none bg-gray-50 rounded-lg dark:bg-zinc-800 text-black dark:text-white shadow-input  p-4 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400
           `
                  )}
                >
                  <div className="flex justify-between items-center">
                    <h1 className=" font-bold text-[#5a5a5a] text-sm">Price</h1>
                    <h1>{price} ETH</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className=" font-bold text-[#5a5a5a] text-sm">
                      NFT Bazzar Fees <span>?</span>
                    </h1>
                    <h1>0.5%</h1>
                  </div>
                  <div className="border-b-2 border-[#5a5a5a]"></div>
                  <div className="flex justify-between">
                    <h1 className=" font-bold text-[#5a5a5a] text-sm">
                      You will receive
                    </h1>
                    <h1>{price-0.5} ETH</h1>
                  </div>
                </div>
              </motion.div>

              <LabelInputContainer className="mb-8">
                <Label htmlFor="royalties">NFT Royalties</Label>
                <Input
                  placeholder="Royalties %"
                  type="text"
                  {...register("Royalties")}
                />
              </LabelInputContainer>
              {/* <LabelInputContainer className="mb-8">
                <Label htmlFor="category">NFT Category</Label>
                <Input
                  id="category"
                  placeholder="Choose Any One"
                  type="text"
                  {...register("Token_ID")}
                />
              </LabelInputContainer> */}
              <LabelInputContainer className="mb-8">
                <Label htmlFor="category">NFT Category</Label>
                <motion.div
                  style={{
                    background: useMotionTemplate`
        radial-gradient(
          ${visible ? "100px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setVisible(true)}
                  onMouseLeave={() => setVisible(false)}
                  className="p-[2px] mb-4 rounded-lg transition duration-300 group/input"
                >
                  <select
                    name="cars"
                    id="cars"
                    {...register("Token_ID")}
                    className={cn(
                      `flex flex-col w-full border-none bg-gray-50 rounded-lg dark:bg-zinc-800 text-black dark:text-white shadow-input  p-3 text-base  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400
          
           `
                    )}
                  >
                    <option value="Art" className="">
                      Art
                    </option>
                    <option value="Gaming">Gaming</option>
                    <option value="Meta Verse">Meta Verse</option>
                    <option value="Sport">Sport</option>
                    <option value="Magic">Magic</option>
                    <option value="Abstract">Abstract</option>
                  </select>
                </motion.div>
              </LabelInputContainer>
              {
                loader ? (<button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 flex justify-center items-center gap-3 dark:to-zinc-900 to-neutral-600  dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                  onClick={handleButtonClick}
                  disabled
                >
                  <Loader /> <h1>Loading...</h1>
                  <BottomGradient />
                </button>) : (<button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                  onClick={handleButtonClick}
                >
                  Create Now &rarr;
                  <BottomGradient />
                </button>)
              }
              

              {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      
              <div className="flex flex-col space-y-4">
                <button
                  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  type="submit"
                >
                  <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    GitHub
                  </span>
                  <BottomGradient />
                </button>
                <button
                  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  type="submit"
                >
                  <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Google
                  </span>
                  <BottomGradient />
                </button>
                <button
                  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  type="submit"
                >
                  <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Instagram
                  </span>
                  <BottomGradient />
                </button>
              </div> */}
            </form>
          </div>
          <div>
            <h1 className=" text-white dark:text-black font-bold text-2xl text-center">
              Preview
            </h1>
            <Preview className=" hidden md:block " Name={name}
              Price={price}
              Image={imageUrl} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CreateNFT;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
