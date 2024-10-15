import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin} from '../store/authSlice'
import { useNavigate, useLocation} from 'react-router-dom'
import userService from "../dataGathering/userData"
import { Label, Input, Container } from "../components";
import { cn } from "../utils/cn";  
import { useForm } from "react-hook-form";

function Register() {
    const user = useSelector((state) => state.auth)
    const location = useLocation()
    const { account } = location.state || {};
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register ,handleSubmit} = useForm()


    const registerUser = async(data) => {
        try {
            const session = await userService.register({...data,MetaHash: account,Description: "Welcome to NFT BAZZAR",MainImage_URL:"/temp/profile.jpg",BgImage_URL:"/temp/profilebg.jpg"})
            console.log(session);
            if (session) {
              const userData = session.data
              
                dispatch(authLogin({userData}));
                console.log(user);
                navigate("/profile")
            }
        } catch (error) {
            throw error
        }
    }
  return (
    <section className=" h-[100vh] flex items-center">
      <Container>
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center">
          <div className="max-w-md w-full md:mr-10 rounded-2xl px-8 py-20 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
              You are almost there!
            </h2>
            <p className="text-neutral-600 text-sm  text-center max-w-sm mt-2 dark:text-neutral-300">
                Choose a display name and enter your email address to receive your updates when your NFTs sell or receive offers.
            </p>
            <form className="mt-8" onSubmit={handleSubmit(registerUser)} >
              <LabelInputContainer className="mb-4">
                <Label htmlFor="Name">Name</Label>
                <Input placeholder="Enter your Name" type="text" {...register("Name")}/>
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input placeholder="Enter your Email" type="email" {...register("Email")} />
              </LabelInputContainer>
      
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mb-4"
                type="submit"
              >
                Finish Sign-up &rarr;
                <BottomGradient />
              </button>
            </form>
          </div>
          
        </div>
    </Container>
    </section>
  )
}

const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
   
  const LabelInputContainer = ({
    children,
    className,
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };

export default Register