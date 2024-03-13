"use client";

import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className }: SearchBarProps) {
  const [SearchQuery, setSearchQuery] = useState("");
  const router = useRouter(); 
  let validInput: boolean = true;

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault(); 

    const encodedSearchQeury = encodeURI(SearchQuery); 
    router.push(`/search?q=${encodedSearchQeury}`); 
  }

  return (
   <form className="flex justify-center w-full" onSubmit={onSearch}>
      <input
        title="search-box"
        placeholder="Search for games or people"
        type="text"
        value={SearchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="flex flex-row bg-surface rounded-xl w-full p-2"
     />
     </form>
  );
}
