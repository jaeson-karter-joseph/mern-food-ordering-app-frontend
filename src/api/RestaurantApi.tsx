import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetRestaurant = (restaurantId?: string) => {
    const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
        const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);

        if (!response.ok) {
            throw new Error("Failed to fetch restaurant");
        }

        return response.json();
    }

    const { data: restaurant, isLoading, error } = useQuery("fetchRestaurant", getRestaurantByIdRequest, { enabled: !!restaurantId });
    return { restaurant, isLoading, error };
}


export const useSearchResraurants = (searchState: SearchState, city?: string) => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const CreateSearchRequest = async (): Promise<RestaurantSearchResponse> => {
        const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`);

        if (!response.ok) {
            throw new Error("Failed to fetch restaurants");
        }

        return response.json();
    }

    const { data: results, isLoading, error } = useQuery(["searchRestaurants", searchState], CreateSearchRequest, { enabled: !!city });

    return { results, isLoading, error };

};