import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import HapticFeedback from 'react-native-haptic-feedback';


const WebViewNews = ({ route, navigation }) => {
    const { webUrl } = route.params;

    return (
        <>
            <TouchableOpacity>
                <Text style={{ alignSelf: "center", fontFamily: "DMSans-Bold" }} onPress={() => HapticFeedback.trigger("impactLight")}>Pull Down To Close</Text>
            </TouchableOpacity>

            <WebView source={{ uri: webUrl }} />
        </>
    )
}

export default WebViewNews;