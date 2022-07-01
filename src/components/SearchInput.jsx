import React, {useEffect, useState} from "react";

const SearchInput = ({onSearch,loading}) => {
    let typingTimer;
    let doneTypingInterval = 500;
    const [query, setQuery] = useState('');

    const search = () => {
        onSearch(query);
    }

    return (
        <>
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyUp={() => {
                    clearTimeout(typingTimer)
                    typingTimer = setTimeout(search,doneTypingInterval)
                }}
                onKeyDown={() => {
                    clearTimeout(typingTimer)
                }}
            />
            <p>{loading && 'Aranıyor...'}</p>
        </>
    )
}

export default SearchInput