import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import HapticFeedback from 'react-native-haptic-feedback';


const WebViewNews = ({ route, navigation }) => {
    const { webUrl } = route.params;

    return (
        <SafeAreaView>
            <TouchableOpacity>
                <Text style={{ alignSelf: "center", fontFamily: "DMSans-Bold" }} onPress={() => HapticFeedback.trigger("impactLight")}>Pull Down To Close</Text>
            </TouchableOpacity>

            <WebView source={{ uri: webUrl }} onError={() => Alert.alert("Website is unable to load. Please try again")} />
        </SafeAreaView>
    )
}

export default WebViewNews;