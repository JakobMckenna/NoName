import Head from "next/head";
import Link from "next/link";
import axios from 'axios';
import { useForm } from "react-hook-form";

function SignIn({ handleSignIn }: any) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();


  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">

          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">

            <form className="card-body" onSubmit={handleSubmit(handleSignIn)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input {...register("email")} type="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input {...register("password")} type="password" placeholder="password" className="input input-bordered" required />

              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


export default function Home() {


  const handleSignIn = async (data: any) => {
      console.log(data)
      try{
        const response = await axios.post('http://localhost:5000/users/auth', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Login successful', response.data);
      }catch(error){
        console.error('Login failed', error);
      }
  }

  return (
    <>
      <Head>
        <title>DevDiaries | Sign In</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SignIn handleSignIn={handleSignIn} />
      </main>
    </>
  );
}