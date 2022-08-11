import React from 'react';
import { SafeAreaView } from 'react-native';
import Input from '../components/SearchNews/Input';

const SearchNews = () => {
    return (
        <SafeAreaView style={{ flex: 1}}>
            <Input />
        </SafeAreaView>
    )
}

export default SearchNews;