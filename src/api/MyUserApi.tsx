import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const GetMyUserRequest = async () : Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery("fetchCurrentUser", GetMyUserRequest);

  if (isError) {
    toast.error(isError.toString());
  }

  return { currentUser, isLoading, isError };
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    console.log(accessToken);
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Error creating user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return { createUser, isLoading, isError, isSuccess };
};

type UpdateMyUserrequest = {
  name: string;
  addressLine1: string;
  country: string;
  city: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const UpdateMyUserRequest = async (formData: UpdateMyUserrequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Error updating user");
    }
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(UpdateMyUserRequest);

  if (isSuccess) {
    toast.success("User updated successfully");
  }

  if (isError) {
    toast.error(isError.toString());
    reset();
  }

  return { updateUser, isLoading, isError, isSuccess };
};
