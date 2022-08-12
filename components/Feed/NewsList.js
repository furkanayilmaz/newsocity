import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl, TouchableWithoutFeedback, ActivityIndicator, Linking, Alert } from 'react-native';
import HapticFeedback from 'react-native-haptic-feedback';
import { Divider } from "@rneui/themed";
import axios from 'axios';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const NewsList = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);
    const [imageLoading, setImageLoading] = useState(true);

    const bookmarkHapticFeedback = async (item) => {
        HapticFeedback.trigger(
            'impactMedium',
        )

    
    }

    const openURLS = useCallback(async (url) => {
        HapticFeedback.trigger(
            'impactMedium',
        )
       const supported = await Linking.canOpenURL(url);

        if (supported) {
            /*navigation.navigate('WebViewNews', {
                webUrl: url,
            }); */ 
            await Linking.openURL(url);
        } 
        
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, [])

    useEffect(() => {
        axios({
            method: 'get',
            url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=e79939cd05a342ff955d40bd6650420a",

        }).then(response => {
            setNews(response.data);
            setLoading(false);
        }).catch(err => {
            Alert.alert(err);
        })
    }, [refreshing])


    const onLoad = () => {
        setImageLoading(false);
    }

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <Text style={{ fontFamily: "DMSans-Bold", marginLeft: "8%", marginTop: "7%", fontSize: 16, color: "#000" }}>Today's Headline</Text>

            {loading === true ? <ActivityIndicator size={"small"} /> :
                (
                    news.articles.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => openURLS(item.url)} key={index}>
                                <View style={styles.container}>
                                    {/* <Image source={{ uri: }} style={styles.newsThumbnailImage} /> */}

                                    {item.urlToImage == null ? null : <Image source={{ uri: item.urlToImage }} style={styles.newsThumbnailImage} onLoad={onLoad}/>}

                                    {imageLoading === true ? <ActivityIndicator size={"small"} /> : null}



                                    <Text style={styles.newsTitle}>{item.title}</Text>

                                    <Text style={styles.newsDescription}>{item.description}</Text>

                                    <View style={styles.newsActionsContainer}>
                                        <Text style={styles.newsRelaseInfo}>{item.author == null ? <Text>{item.publishedAt}</Text> : <Text>{item.publishedAt} · {item.author}</Text>}</Text>

                                        <TouchableOpacity onPress={() => bookmarkHapticFeedback(item)} style={styles.bookmarkTouchableOpacity}>
                                            <Image source={require("../../assets/images/bookmark.png")} style={styles.bookmarkImage} />
                                        </TouchableOpacity>
                                    </View>

                                    <Divider style={styles.newsDivider} />
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                )
            }
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        marginTop: "1%"
    },
    newsThumbnailImage: {
        width: "95%",
        height: 230,
        borderRadius: 5,
        alignSelf: "center",
        marginTop: "5%"
    },
    newsTitle: {
        marginLeft: "3%",
        marginTop: "5%",
        width: "85%",
        fontFamily: "DMSans-Medium",
        fontSize: 17,
        fontWeight: '700',
        color: "#232426"
    },
    newsDescription: {
        marginLeft: "3%",
        width: "95%",
        marginTop: "3%",
        color: "#8a8a8a",
        fontFamily: "OpenSans-Medium",
        fontSize: 14,
    },
    newsRelaseInfo: {
        marginLeft: "3%",
        color: "#8a8a8a",
        marginTop: "3%",
        fontFamily: "DMSans-Medium",
        width: "70%"
    },
    newsActionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bookmarkImage: {
        width: 20,
        height: 20,
        marginTop: "3%",
        marginRight: "4%"
    },
    newsDivider: {
        width: "95%",
        alignSelf: "center",
        marginTop: "4%"
    },
    bookmarkTouchableOpacity: {
        marginTop: "3%"
    }
})

export default NewsList;