/* eslint-disable */
import Head from "next/head";
import Link from "next/link";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationValidation } from "../../validations_schemas/user_registration";
import config from "config";
import Spinner from "~/components/modal_spinner";


function SignUp({ handleSignUp, errorMessage  }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registrationValidation)
  });

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-3xl">Sign Up</h1>
          <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100 mt-10">

            <form className="card-body w-80 flex flex-col" onSubmit={handleSubmit(handleSignUp)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name")}
                  disabled={isSubmitting}
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
                {errors.name && (<div className="text-red-500">{errors.name.message}</div>)}
              </div>

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
                {errorMessage ? (
                  <div className="text-red-500 mb-4">{errorMessage}</div>
                ) : (
                  errors.email && <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>
              <div className="form-control ">
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
                {errors.password && (<div className="text-red-500">{errors.password.message}</div>)}
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Spinner />
                  )}
                  {isSubmitting ? "Creating Account" : "Create Account"}
                </button>
              </div>
              <div className="flex flex-row justify-between items-center mt-4">
                <p className="label-text mr-9">Already have an account?</p>
                <label className="label">
                  <Link href="/" className="label-text link link-hover">
                    Sign In
                  </Link>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Register() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<React.ReactNode | null>(null);


  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      router.push("/");
      console.log('UserData from local storage:', userData);
    }
  }, []);

  const handleSignUp = async (data: { email: string, password: string, name: string }) => {
    try {
      const response = await axios.post(`${config.backendApiUrl}/users`, { name: data.name, email: data.email, password: data.password }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: false,
      });
      console.log('Sign up successful', response.data);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      router.push("/home");
    } catch (error: any) {
      console.error('Sign up failed', error);

      if (error.response.data.user === null) {
        setErrorMessage(
          <>
            An account already exists with this email. Please{" "}
      <button
        className="link link-hover"
        onClick={() => router.push("/")}
      >
        sign in.
      </button>
          </>
        );
      }

      if (error.response && error.response.status === 400 && error.response.data.code === 'P2002') {
        // HTTP status 400 and Prisma error code P2002 for a unique constraint violation
        setErrorMessage('Email is already taken. Please choose another email.');
        console.log("Duplicate email block:", error.response.data);
      } else {
        // Handle other errors
        //setErrorMessage('An error occurred. Please try again.');
      }
    }
}

  return (
    <>
      <Head>
        <title>DevDiaries | Sign up</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SignUp handleSignUp={handleSignUp} errorMessage={errorMessage}/>
      </main>
    </>
  );
}
