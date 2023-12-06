/* eslint-disable */
import Head from "next/head";
import Link from "next/link";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationValidation } from "../../validations_schemas/user_registration";
import Drawer from "~/components/drawer";
import config from "config";
import Spinner from "~/components/modal_spinner";

function SignUp({ handleSignUp }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    resolver: yupResolver(registrationValidation)
  });

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md -mt-16">
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
                {errors.email && (<div className="text-red-500">{errors.email.message}</div>)}
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

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      router.push("/")
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
      console.log('Login successful', response.data);
      localStorage.setItem("userData", JSON.stringify(response.data.user))
      router.push("/home")
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  return (
    <>
      <Head>
        <title>DevDiaries | Sign up</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer userName={""}>
        <main>
          <SignUp handleSignUp={handleSignUp} />
        </main>
      </Drawer>
    </>
  );
}
