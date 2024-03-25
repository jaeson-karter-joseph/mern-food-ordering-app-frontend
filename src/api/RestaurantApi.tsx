import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export const useSearchResraurants = (searchState: SearchState, city?: string) => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());

    const CreateSearchRequest = async (): Promise<RestaurantSearchResponse> => {
        const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`);

        if (!response.ok) {
            throw new Error("Failed to fetch restaurants");
        }

        return response.json();
    }

    const { data: results, isLoading, error } = useQuery(["searchRestaurants", searchState], CreateSearchRequest, { enabled: !!city });

    return { results, isLoading, error };

}