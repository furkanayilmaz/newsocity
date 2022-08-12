import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback, Image, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import HapticFeedback from 'react-native-haptic-feedback';
import { Divider } from "@rneui/themed";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const SavedComponent = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    const getLocalStorageData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("news_item");
            setNews(JSON.parse(jsonValue));
            setLoading(false);
            console.log(news);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getLocalStorageData();
    }, [refreshing])

    const removeHapticFeedback = () => {
        HapticFeedback.trigger(
            'impactMedium',
        )
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    })

    return (
        <ScrollView style={{ height: "90%" }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >


            {news === null ? <ActivityIndicator size={"small"} /> :
                (
                    news.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => openURLS(item.url)} key={index}>
                                <View style={styles.container}>
                                    {/* <Image source={{ uri: }} style={styles.newsThumbnailImage} /> */}

                                    {item.urlToImage == null ? null : <Image source={{ uri: item.urlToImage }} style={styles.newsThumbnailImage} onLoad={onLoad} />}

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

        </ScrollView>

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

export default SavedComponent;