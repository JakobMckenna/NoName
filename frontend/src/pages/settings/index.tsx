import React, { useState, useEffect } from 'react';
import Drawer from "~/components/drawer";
import useUser from "~/hooks/use_user";
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormInput {
  newUsername: string;
  newEmail: string;
  newPassword: string;
}

export default function Settings() {
  const [user, loading] = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();

  const handleUpdateSettings: SubmitHandler<FormInput> = async (data) => {
    // Implement logic to update user settings
  };

  const handleDeleteAccount = () => {
    // Implement logic to delete the user account
  };

  useEffect(() => {
    if (!user && !loading) {
      router.push('/');
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Drawer userName={user != null && user.name != undefined ? `${user.name}#${user.id}` : ''}>
      <div className="container mx-auto">
        <div className="max-w-lg mx-auto mt-10">
          <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
          <form onSubmit={handleSubmit(handleUpdateSettings)}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name:</label>
              <input
                type="text"
                placeholder={user.name}
                {...register('newUsername')}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email:</label>
              <input
                type="email"
                placeholder={user.email}
                {...register('newEmail')}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Password:</label>
              <input
                type="password"
                {...register('newPassword')}
                className="input input-bordered w-full"
              />
            </div>
            <button type="submit" className="btn btn-primary mr-2">
              Update Account
            </button>
          </form>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="btn btn-danger mt-4"
          >
            Delete Account
          </button>
        </div>
      </div>
    </Drawer>
  );
}
