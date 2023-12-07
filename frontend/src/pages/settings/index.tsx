import React, { useState, useEffect } from 'react';
import Drawer from "~/components/drawer";
import useUser from "~/hooks/use_user";
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import DeleteUserModal from "~/components/delete_user_modal";
import Spinner from "~/components/modal_spinner"; // Import the Spinner component

interface FormInput {
  newUsername: string;
  newEmail: string;
  newPassword: string;
}

function LoadingTile() {
  return (
    <div className="card flex flex-col mb-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <div className="input ">
          <div className="skeleton h-8"></div>
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <div className="input">
          <div className="skeleton h-8"></div>
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <div className="input">
          <div className="skeleton h-8"></div>
        </div>
      </div>
    </div>
  );
}


export default function Settings() {
  const [user, loading] = useUser();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormInput>();

  const handleUpdateSettings: SubmitHandler<FormInput> = async (data) => {
    // Implement logic to update user settings
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  useEffect(() => {
    if (!user && !loading) {
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    console.log('showDeleteModal', showDeleteModal);
  }, [showDeleteModal]);

  return (
    <Drawer userName={`${user?.name}#${user?.id}`}>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl">Account Settings</h1>
            <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100 mt-10">
              <form onSubmit={handleSubmit(handleUpdateSettings)} className="card-body w-80 flex flex-col">
                {user ? (
                  <>
                    <div className="mb-4">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder={user.name}
                        {...register('newUsername')}
                        className="input input-bordered"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder={user.email}
                        {...register('newEmail')}
                        className="input input-bordered"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input
                        type="password"
                        {...register('newPassword')}
                        className="input input-bordered"
                      />
                    </div>
                    
                  </>
                ) : (
                  <LoadingTile />
                )}
               <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || !user}
                >
                  {isSubmitting && <Spinner />}
                  {isSubmitting ? 'Updating Account' : 'Update Account'}
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="btn btn-danger mt-4"
                  disabled={isSubmitting || !user}
                >
                  Delete Account
                </button>
                {showDeleteModal && (
                  <DeleteUserModal
                    userID={user.id}
                    home={() => {
                      router.push('/');
                    }}
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
