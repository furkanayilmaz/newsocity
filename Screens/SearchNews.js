import React from 'react';
import { SafeAreaView, Text  } from 'react-native';
import Input from '../components/SearchNews/Search';

const SearchNews = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Input navigation={navigation}/>

        </SafeAreaView>
    )
}

export default SearchNews;