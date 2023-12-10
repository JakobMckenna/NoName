/* eslint-disable */
/**
 * @fileoverview this is the sign in page
 */

import Head from "next/head";
import Link from "next/link";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import config from "config";
import Spinner from "~/components/spinner";



function FoundUser() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold">Found user data & verifying data</h1>
             <Spinner />
        </div>
      </div>
    </div>
  )
}


function SignIn({ handleSignIn, message }: any) {

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();



  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md ">
          <h1 className="mb-5 text-3xl">Sign In</h1>
          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100  mt-10">

            <form className="card-body  w-80 " onSubmit={handleSubmit(handleSignIn)}>
              {message != "" && (
                <div className="flex flex-col justify-center items-center  w-64 ">
                  <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{message}</span>
                  </div>
                </div>)
              }
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email")}
                  disabled={isSubmitting}
                  type="email"
                  placeholder="Email"
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
                  placeholder="Password"
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
                <div className="flex flex-row justify-start items-center mt-4">
                  <p className="label-text mr-10">Don't have an account?</p>
                  <label className="label">
                    <Link href="/signup" className="label-text link link-hover">
                      Sign Up
                    </Link>
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
  const [foundUser, setFoundUser] = useState(false);


  /**
   * handleSignIn
   * this confirms user + user password
   * @param data 
   */
  const handleSignIn = async (data: { email: string, password: string }) => {
    try {
      const response = await axios.post(`${config.backendApiUrl}/users/auth`, { email: data.email, password: data.password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      setLogin(true);
    } catch (error) {
      console.error('Login failed', error);
      setFailedMsg("Failed to login or user does not exist,please try again");
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


  const logExistingUser = async (user: any) => {
    setFoundUser(true);
    try {
      const verified = await userVerify(user?.id, user?.email);

      if (user?.id && user?.email && verified) {
        router.push("/home");
      } else {
        localStorage.removeItem('userData');
        setFoundUser(false);
      }
    } catch (error) {
      localStorage.removeItem('userData');
      setFoundUser(false);
    }

  }

  useEffect(
    () => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        logExistingUser(user);
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
        {!foundUser && (<SignIn handleSignIn={handleSignIn} message={failedMsg} />)}
        {foundUser && (<FoundUser />)}
      </main>

    </>
  );
}
