import React, { ChangeEvent } from 'react';
import { Input } from 'antd';

interface Props {
    onSearch: (query: string) => void;
}

const SearchArtists: React.FC<Props> = ({ onSearch }) => {
    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.trim().toLowerCase();
        onSearch(query);
    };

    return (
        <Input onChange={onSearchChange} placeholder="Поиск артиста" size="large" />
    );
};

export default SearchArtists;
