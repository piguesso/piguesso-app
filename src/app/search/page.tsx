"use client"; 

import { useSearchParams } from "next/navigation";


const SearchPage = () => {
    const search = useSearchParams(); 
    const searchQuery = search ? search?.get('q') : null;

    const encodedSearchQeury = encodeURI(searchQuery || ""); 

    console.log("SEARCH PARAMS", encodedSearchQeury); 



    return (
        <div>Search Page</div>
    )
}

export default SearchPage; 