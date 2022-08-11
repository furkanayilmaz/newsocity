import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import NewsList from '../components/Feed/NewsList';
import Header from '../components/Global/Header';

const Feed = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={"dark"}/>
            <Header />

            <NewsList navigation={navigation} />
        </SafeAreaView>
    )
}

export default Feed;