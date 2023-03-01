import { Component } from "react";
import { SafeAreaView } from "react-native";
import { View, Pressable, ScrollView, FlatList, Text, TextInput, Picker } from "react-native";

import styles from '../styles/MainStyle';
import Colours from "../constants/Colours";
import Header from "../constants/Header";

class StaffHomeScreen extends Component {
    
    render() {
        return(
            <SafeAreaView style={styles.container}>
                <Header navigation={this.props.navigation}></Header>
                <View style={styles.btnLargeContainer}>
                    <Pressable 
                        style={styles.btnLarge}
                        onPress={() => this.props.navigation.navigate('Orders')}
                    >
                        <Text style={styles.btnText}>
                            Current Orders
                        </Text>
                    </Pressable>
                    <Pressable 
                        style={styles.btnLarge}
                        onPress={() => this.props.navigation.navigate('Menu')}
                    >
                        <Text style={styles.btnText}>
                            Menu
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        )
    }
}

export default StaffHomeScreen