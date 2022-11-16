import { Component } from "react";
import { SafeAreaView, Image, Text, TextInput, Pressable } from "react-native";
import { View } from "react-native-web";

import Colours from "../constants/Colours";
import styles from "../styles/MainStyle";
import logo from '../images/BeanSceneLogo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            data: {},
            username: '',
            password: '',
            validation: '',
            error: ''
        }
    }

    onUsernameChange=(e)=>{
        this.setState({
            username: e
        })
    }
    onPasswordChange=(e)=>{
        this.setState({
            password: e
        })
    }
    login=async(loginDetails)=> {
        if (this.state.username.length == 0 || this.state.password.length == 0) {
            this.setState({
                error: 'Please enter your employee id and password'
            })
            console.log(this.state.error);
        }
        else {
            this.setState({
                error: ''
            })
            var url = 'http://localhost:57431/api/Staff/' + this.state.username + '/' + this.state.password
            var headers = new Headers({                
                Authorization : 'Basic ' + btoa('test:test')
            });
            var options = {headers: headers};

            fetch(url, options)
                .then(response => response.json())
                .then((json) => {
                    console.log({json})
                    if(json == null){
                        this.setState({
                            error: 'Invalid username and password'
                        })
                    }
                    else {
                        this.setState({
                            data: json
                        })
                        const jsonValue = JSON.stringify(this.state.data)
                        AsyncStorage.setItem('@loginDetails', jsonValue)
                        if (this.state.data.position == 'Manager') {
                            this.props.navigation.navigate('ManagerHomeScreen')
                        }
                        else {
                            this.props.navigation.navigate('StaffHomeScreen')
                        }    
                        
                    }
                })
        }
    }
    render() {
        return(
            <SafeAreaView>
                <View style={styles.logoContainer}>
                    <Image
                        source={logo}
                        style={styles.logoImage} 
                    />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.errorText}>
                        {this.state.error}
                    </Text>
                    <TextInput 
                        placeholder="Employee Id"
                        placeholderTextColor={Colours.beanMidBlue}
                        style={styles.inputTextbox} 
                        value={this.state.username}
                        onChangeText={this.onUsernameChange}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={Colours.beanMidBlue}
                        secureTextEntry={true} 
                        style={styles.inputTextbox}
                        value={this.state.password}
                        onChangeText={this.onPasswordChange} 
                    />
                </View>
                <View style={styles.btnLargeContainer}>
                    <Pressable 
                        style={styles.btnLarge}
                        // onPress={() => this.props.navigation.navigate('ManagerHomeScreen')}
                        onPress={this.login}
                        >
                        <Text style={styles.btnText}>
                            Login
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }
}

export default LoginScreen