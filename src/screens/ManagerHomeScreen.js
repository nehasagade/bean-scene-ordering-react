import { Component } from "react";
import { SafeAreaView } from "react-native";
import { View, Pressable, Text } from "react-native";

import styles from '../styles/MainStyle';
import Header from "../constants/Header";

class ManagerHomeScreen extends Component {
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
                    <Pressable 
                        style={styles.btnLarge}
                        onPress={() => this.props.navigation.navigate('Category')}
                    >                        
                        <Text style={styles.btnText}>
                            Category
                        </Text>
                    </Pressable>
                    <Pressable 
                        style={styles.btnLarge}
                        onPress={() => this.props.navigation.navigate('Reports')}
                    >
                        <Text style={styles.btnText}>
                            Reports
                        </Text>
                    </Pressable>
                    <Pressable 
                        style={styles.btnLarge}
                        onPress={() => this.props.navigation.navigate('Staff')}
                    >
                        <Text style={styles.btnText}>
                            Staff
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }
}
export default ManagerHomeScreen