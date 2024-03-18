"use client";

import { fetchUsers } from '@/services/users';
import React, { useState } from 'react';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [validInput, setValidInput] = useState<boolean>(true);

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  
    
    if (searchQuery.length > 1) {
      setValidInput(true); 
      console.log(searchQuery); 
      let users = fetchUsers(searchQuery); 
    } else {
      setValidInput(false); 
    }
  }

  return (
    <form className={`flex flex-col justify-center sm:w-80 md-[75%] focus:outline-none focus:ring focus:border-primary ${className}`} onSubmit={onSearch}>
      <input
        title="search-box"
        placeholder="Search for games or people"
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="flex flex-row bg-surface rounded-xl w-full p-2 focus:outline-none focus:ring focus:border-primary"
      />
      {!validInput && <p className="pl-2 text-red-700">Enter a valid input</p>}
    </form>
  );
}

export default SearchBar;
