import { useSearchResraurants } from "@/api/RestaurantApi";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
    page: number;

}

const SearchPage = () => {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({ searchQuery: "", page: 1 });
    const { results, isLoading } = useSearchResraurants(searchState, city);
    
    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page
        }));
    }

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery
        }));
    };

    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: ""
        }));
    };

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (!results?.data || !city) {
        return <span>No Results Found</span>
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                Insert Cuisines Here
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar onSubmit={setSearchQuery} placeHolder="Search By Cuisine or Restaurant Name" onReset={resetSearch} searchQuery={searchState.searchQuery} />
                <SearchResultsInfo total={results?.pagination.total} city={city} />
                {results.data.map((restaurant) => (
                    <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
                ))}
                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
            </div>
        </div>
    )
}

export default SearchPage;