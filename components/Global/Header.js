import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HapticFeedback from 'react-native-haptic-feedback';
import { Divider } from "@rneui/themed";

const Header = () => {

    const date = new Date();
    const hour = date.getHours();

    const profileHapticFeedback = () => {
        HapticFeedback.trigger(
            'impactMedium'
        )
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.greetingMessage}>{hour >= 12 ? hour>= 16 ? <Text>Good Evening</Text> : <Text>Good Afternoon</Text> : <Text>Good Morning</Text>}</Text>

                {/* <TouchableOpacity style={{ marginTop: "4%"}} onPress={profileHapticFeedback}>
                <Image source={require("../../assets/images/demo_picture.jpeg")} style={styles.profilePicture} />
            </TouchableOpacity> */}

            </View>

            <Divider style={{ marginTop: "3%"}}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    greetingMessage: {
        fontFamily: "DMSans-Bold",
        fontSize: 20,
        marginTop: "5%",
        marginLeft: "8%",
        color: "#000"
    },
    profilePicture: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: "5%"
    }
})

export default Header;