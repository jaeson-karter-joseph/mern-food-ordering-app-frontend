import { useSearchResraurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;

}

const SearchPage = () => {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({ searchQuery: "", page: 1, selectedCuisines: [], sortOption: "bestMatch" });
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const { results, isLoading } = useSearchResraurants(searchState, city);

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption
        }));
    }

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1
        }));
    }

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
                <CuisineFilter
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() =>
                        setIsExpanded((prevIsExpanded: boolean) => !prevIsExpanded)
                    }
                />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar onSubmit={setSearchQuery} placeHolder="Search By Cuisine or Restaurant Name" onReset={resetSearch} searchQuery={searchState.searchQuery} />
                <div className="flex justify-between flex-col gap-3 lg:flex-row" >
                    <SearchResultsInfo total={results?.pagination.total} city={city} />
                    <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
                </div>

                {results.data.map((restaurant) => (
                    <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
                ))}
                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
            </div>
        </div>
    )
}

export default SearchPage;