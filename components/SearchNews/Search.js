import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableWithoutFeedback, Image, TouchableOpacity, ActivityIndicator, Linking, Keyboard } from 'react-native';
import HapticFeedback from 'react-native-haptic-feedback';
import { Divider } from "@rneui/themed";
import axios from 'axios';

const Input = ({ navigation }) => {
    const [search, setSearch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);

    const searchQuery = () => {
        Keyboard.dismiss();
        HapticFeedback.trigger(
            'impactMedium',
        )
        axios({
            method: "get",
            url: `https://newsapi.org/v2/everything?q=${search}&sortBy=popularity&apiKey=e79939cd05a342ff955d40bd6650420a`,
        }).then(response => {
            setNews(response.data);
            setLoading(false);
            console.log(response.data);
        })
    }

    const bookmarkHapticFeedback = () => {
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
            /* navigation.navigate("WebViewNews", {
                webUrl: url,
            }) */

            await Linking.openURL(url);
        }
    })

    return (
        <>
            <View>
                <View style={{ flexDirection: "row" }}>
                    <TextInput placeholder='Search...' style={{ alignSelf: "center", borderWidth: 1.2, borderColor: "#b7c8e1", borderRadius: 4, width: "60%", marginTop: "2%", height: 43, paddingLeft: 10, color: "#271A17", marginTop: "5%", marginLeft: "5%" }} autoCorrect={true} placeholderTextColor={"#728aae"} autoCapitalize="words" keyboardType='default' value={search} onChangeText={searchValue => setSearch(searchValue)} />

                    <TouchableOpacity style={{ borderColor: "#3742FA", borderWidth: 2, borderRadius: 4, width: "30%", marginTop: "5%", height: 45, marginLeft: "1%" }} onPress={() => searchQuery()}>
                        <Text style={{ color: "#3742FA", fontFamily: "Inter-SemiBold", alignSelf: "center", marginTop: "11%" }}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <ScrollView style={{ height: "90%" }}>
                {loading === true ? <ActivityIndicator size={"small"} /> :
                    (
                        news.articles.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback onPress={() => openURLS(item.url)} key={index}>
                                    <View style={styles.container}>
                                        {/* <Image source={{ uri: }} style={styles.newsThumbnailImage} /> */}

                                        {item.urlToImage == null ? null : <Image source={{ uri: item.urlToImage }} style={styles.newsThumbnailImage} />}

                                        <Text style={styles.newsTitle}>{item.title}</Text>

                                        <Text style={styles.newsDescription}>{item.description}</Text>

                                        <View style={styles.newsActionsContainer}>
                                            <Text style={styles.newsRelaseInfo}>{item.author == null ? <Text>{item.publishedAt}</Text> : <Text>{item.publishedAt} · {item.author}</Text>}</Text>

                                            <TouchableOpacity onPress={bookmarkHapticFeedback} style={styles.bookmarkTouchableOpacity}>
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

        </>
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

export default Input;
