import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const GetMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch restaurant");
        }

        return response.json();
    }

    const {
        data: restaurant,
        isLoading,
        isSuccess,
        isError,
    } = useQuery("fetchMyRestaurant", GetMyRestaurantRequest);

    if (isError) {
        toast.error(isError.toString());
    }

    return { restaurant, isLoading, isSuccess, isError };

}

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const CreateMyrestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        });

        if (!response.ok) {
            throw new Error("Failed to create restaurant");
        }

        return response.json();
    }

    const {
        mutate: createRestaurant,
        isLoading,
        isSuccess,
        isError,
    } = useMutation(CreateMyrestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant created successfully");
    }

    if (isError) {
        toast.error(isError.toString());
    }

    return { createRestaurant, isLoading, isSuccess, isError };
}

export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const UpdateMyrestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        });

        if (!response.ok) {
            throw new Error("Failed to Update restaurant");
        }

        return response.json();
    }

    const {
        mutate: updateRestaurant,
        isLoading,
        isSuccess,
        isError,
    } = useMutation(UpdateMyrestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant Updated successfully");
    }

    if (isError) {
        toast.error(isError.toString());
    }

    return { updateRestaurant, isLoading, isSuccess, isError };
}

export const useGetMyRestaurantOrders = () => {
    const { getAccessTokenSilently } = useAuth0();

    const GetMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch restaurant orders");
        }

        return response.json();
    }

    const {
        data: orders,
        isLoading,
        isSuccess,
        isError,
    } = useQuery("fetchMyRestaurantOrders", GetMyRestaurantOrdersRequest);

    if (isError) {
        toast.error(isError.toString());
    }

    return { orders, isLoading, isSuccess, isError };
}

type UpdateOrderStatusrequest = {
    orderId: string;
    status: string;
}

export const useUpdateMyRestaurantOrder = () => {
    const { getAccessTokenSilently } = useAuth0();

    const UpdateMyRestaurantOrderRequest = async (updateStatusOrderRequest: UpdateOrderStatusrequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateStatusOrderRequest),
        });

        if (!response.ok) {
            throw new Error("Failed to update order status");
        }

        return response.json();
    }

    const {
        mutate: updateRestaurantStatus,
        isLoading,
        isSuccess,
        isError,
    } = useMutation(UpdateMyRestaurantOrderRequest);

    if (isSuccess) {
        toast.success("Order status updated successfully");
    }

    if (isError) {
        toast.error(isError.toString());
    }

    return { updateRestaurantStatus, isLoading, isSuccess, isError };
}
