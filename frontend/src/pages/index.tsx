/* eslint-disable */
import Head from "next/head";
import Link from "next/link";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import config from "config";
import Spinner from "~/components/modal_spinner";



function SignIn({ handleSignIn, message }: any) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();



  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="flex flex-col max-w-md">
        {
          message != "" && (
            <div className="flex flex-col mb-5 justify-center items-center  w-80 ">
              <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{message}</span>
              </div>
            </div>)
        }

          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">

            <form className="card-body  w-80 " onSubmit={handleSubmit(handleSignIn)}>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email")}
                  disabled={isSubmitting}
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password")}
                  disabled={isSubmitting}
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />

              </div>
              <div className="form-control mt-6">
                <button
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting && (
                    <Spinner />
                  )}
                  Login
                </button>
                <div className="flex flex-row justify-center items-center">
                  <p className="label-text mr-1">Don't have account?</p>
                  <label className="label">
                    <Link href="/signup" className="label-text  link link-hover">Sign up</Link>
                  </label>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}



export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [failedMsg, setFailedMsg] = useState("");


  const handleSignIn = async (data: { email: string, password: string }) => {
    //console.log(data)

    let resMessage: string = "Failed to login or user does not exist,please try again";
    try {
      const response = await axios.post(`${config.backendApiUrl}/users/auth`, { email: data.email, password: data.password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Login successful', response.data);
      localStorage.setItem("userData", JSON.stringify(response.data.user))
      setLogin(true)
      resMessage = response.data
    } catch (error) {
      console.error('Login failed', error);
      setFailedMsg(resMessage)
    }
  }

  const userVerify = async (id: string, email: string) => {
    try {
      const response = await axios.post(`${config.backendApiUrl}/users/verify`, { id: id, email: email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('user is verified', response.data.users);
      if (response.data.users == true) {
        router.push("/home");
      } else {
        localStorage.removeItem('userData');
      }
      return response.data.users;

    } catch (error) {
      console.error('Login failed', error);

    }

  }

  useEffect(
    () => {
      const userData = localStorage.getItem('userData');
      //const user = JSON.parse(userData)
      if (userData) {
        //console.log(userData)
        const user = JSON.parse(userData);
        console.log(user);

        if (user.id && user.email) {
          const verified = userVerify(user.id, user.email);

        } else {
          localStorage.removeItem('userData');
        }
        // router.push("/home")
        console.log('UserData from local storage:', userData);
      }
    }, [login]
  )




  return (
    <>
      <Head>
        <title>DevDiaries | Sign In</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
 
        <SignIn handleSignIn={handleSignIn} message={failedMsg} />
      </main>
    </>
  );
}
