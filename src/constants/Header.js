import { Component } from "react";
import { Pressable } from "react-native";
import { SafeAreaView, View, Text } from "react-native";
import styles from "../styles/MainStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Header extends Component {
    constructor() {
        super()
        this.state={
            firstname: '',
            lastname:'',
            role:''
        }
    }

    async componentDidMount(){
        const jsonOutput = await AsyncStorage.getItem('@loginDetails');
        console.log(jsonOutput)
        if (jsonOutput && jsonOutput != 'undefined' & jsonOutput != '') {
            var details = JSON.parse(jsonOutput)

            this.setState({
                firstname: details.firstname,
                lastname: details.lastname,
                role: details.role
            })
        }
    }

    render() {
        return(
            <View style={styles.headerContainer}>
                <Pressable onPress={()=>this.props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.headerText}>Logout</Text>
                </Pressable>
            </View>)
        
    }
}

export default Header