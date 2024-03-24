import { useParams } from "react-router-dom";

const SearchPage = () => {
    const { city } = useParams();

    return (<span>User Search For {city}</span>)
}

export default SearchPage;