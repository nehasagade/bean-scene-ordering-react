import { Component } from "react";
import { SafeAreaView } from "react-native";
import { View, Pressable, ScrollView, FlatList, Text, TextInput, Picker } from "react-native";

import styles from '../styles/MainStyle';
import Colours from "../constants/Colours";
import Header from "../constants/Header";

class StaffScreen extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            position: '',
            staffPassword: '',
            message: '',
            selectedTab: 'get',
        }
    }
    
    componentDidMount(){
        this.getStaff()
    }

    addStaff() {
        var url = 'http://localhost:57431/api/Staff/Create'

        const staff = {
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            position: this.state.position,
            password: this.state.staffPassword
        };

        var options = {
            method: 'POST',
            body: JSON.stringify(staff),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Basic ' + btoa('test:test')
            }
        }
       fetch(url, options)
        .then((json)=>{
            console.log(json);
            this.getStaff()
            this.setState({
                selectedTab: 'detail',
                message: 'Add successful'
            })
        })
    };

    deleteStaff() {
        var url = 'http://localhost:57431/api/Staff/Delete/' + this.state.id
        var options = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Basic ' + btoa('test:test')
            }
        }
       fetch(url, options)
        .then((json)=>{
            console.log(json);
            this.getStaff()
            this.setState({
                message: "Delete successful"
            })
        })
    }

    editStaff() {
        var url = 'http://localhost:57431/api/Staff/Edit/' + this.state.id
        const staff = {
            employee_id: this.state.id,
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            position: this.state.position,
            password: this.state.staffPassword
        };
        var options = {
            method: 'PUT',
            body: JSON.stringify(staff),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Basic ' + btoa('test:test')
            }
        }
       fetch(url, options)
       .then((json)=>{
            console.log(json);
            this.setState({
                selectedTab: 'detail'
            })
        })
    }

    getStaff() {
        var headers = new Headers({                
            Authorization : 'Basic ' + btoa('test:test')
        });
        var options = {headers: headers};
        fetch('http://localhost:57431/api/Staff', options)
            .then(response => response.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    data: json,
                    selectedTab: 'get'
                })
                
            });
    }
    
    render() {
        // Show all staff
        if (this.state.selectedTab == 'get') {
            const renderData=({item})=>{
                return(
                    <Pressable
                        onPress={() => this.setState({
                            selectedTab: 'detail',
                            id: item.employee_id,
                            firstName: item.firstname,
                            lastName: item.lastname,
                            phone: item.phone,
                            email: item.email,
                            position: item.position,
                            message: ''
                        })}
                    >
                        <View style={styles.listContainer}>
                            <Text style={styles.listHeading}>{item.firstname} {item.lastname}</Text>
                        </View>
                    </Pressable>
                )
            }
            return(
                <SafeAreaView style={styles.container}>
                    <Header navigation={this.props.navigation}></Header>
                    <View style={styles.btnLargeContainer}>
                        <Pressable 
                            style={styles.btnLarge}
                            onPress={() => this.setState({
                                selectedTab: 'add',
                                id: 0,
                                firstName: '',
                                lastName: '',
                                email: '',
                                phone: '',
                                position: '',
                                staffPassword: '',
                                message: ''
                            })}
                        >
                            <Text style={styles.btnText}>Add Staff</Text>
                        </Pressable>
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={styles.errorText}>{this.state.message}</Text>
                    </View>
                    
                    <FlatList 
                        data={this.state.data} 
                        renderItem={renderData} 
                        keyExtractor={(item)=>item._id} 
                    />
                       
                </SafeAreaView>
            );
        }
        // Show one staff
        else if (this.state.selectedTab == 'detail') {
            return(
                <SafeAreaView style={styles.container}>
                    <View style={styles.btnGroupContainer}>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.getStaff()}    
                        >
                            <Text style={styles.btnText}>Back</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.setState({
                                selectedTab: 'edit',
                            })}    
                        >
                            <Text style={styles.btnText}>Edit</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.btnMediumDanger}
                            onPress={() => this.deleteStaff()}    
                        >
                            <Text style={styles.btnText}>Delete</Text>
                        </Pressable>
                    </View>
                    <ScrollView>
                        <View style={styles.formContainer}>
                            <Text style={styles.formLabel}>Employee Id</Text>
                            <TextInput
                                placeholder='Employee Id'
                                value={this.state.id}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}  
                            />
                            <Text style={styles.formLabel}>First Name</Text>
                            <TextInput
                                placeholder='First Name'
                                value={this.state.firstName}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}  
                            />
                            <Text style={styles.formLabel}>Last Name</Text>
                            <TextInput
                                placeholder='Last Name'
                                value={this.state.lastName}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}  
                            />
                            <Text style={styles.formLabel}>Phone</Text>
                            <TextInput
                                placeholder='Phone'
                                value={this.state.phone}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}  
                            />
                            <Text style={styles.formLabel}>Email</Text>
                            <TextInput
                                placeholder='Email'
                                value={this.state.email}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}  
                            />
                            <Text style={styles.formLabel}>Position</Text>
                            <TextInput
                                placeholder='Position'
                                value={this.state.position}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}  
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
           
        }
        // Edit one staff
        else if (this.state.selectedTab == 'edit'){
            return(
                <SafeAreaView style={styles.container}>
                    <View style={styles.btnGroupContainer}>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.setState({
                                selectedTab: 'get'
                            })}    
                        >
                            <Text style={styles.btnText}>Back</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.editStaff()}    
                        >
                            <Text style={styles.btnText}>Save</Text>
                        </Pressable>
                    </View>
                    <ScrollView>
                        <View style={styles.formContainer}>
                            <Text style={styles.formLabel}>Employee Id</Text>
                            <TextInput
                                placeholder='Employee Id'
                                value={this.state.id}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}  
                            />
                            <Text style={styles.formLabel}>First Name</Text>
                            <TextInput
                                placeholder='First Name'
                                value={this.state.firstName}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState({firstName: text})}
                            />
                            <Text style={styles.formLabel}>Last Name</Text>
                            <TextInput
                                placeholder='Last Name'
                                value={this.state.lastName}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState({lastName: text})}  
                            />
                            <Text style={styles.formLabel}>Phone</Text>
                            <TextInput
                                placeholder='Phone'
                                value={this.state.phone}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState({phone: text})}  
                            />
                            <Text style={styles.formLabel}>Email</Text>
                            <TextInput
                                placeholder='Email'
                                value={this.state.email}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState({email: text})}  
                            />
                            <Text style={styles.formLabel}>Password</Text>
                            <TextInput
                                placeholder='Enter new password'
                                value={this.state.staffPassword}
                                secureTextEntry={true} 
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState({staffPassword: text})}  
                            />
                            <Text style={styles.formLabel}>Position</Text>                           
                            <Picker
                                selectedValue = {this.state.position}
                                onValueChange = {(value) => {this.setState({position: value})}}
                                style={styles.pickerStyle}
                            >
                                <Picker.Item label="Position" value="0" />
                                <Picker.Item label="Manager" value="Manager" />
                                <Picker.Item label="Staff" value="Staff" />
                            </Picker>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        }
        // Add new staff
        else if (this.state.selectedTab == 'add') {
            return(
                <SafeAreaView style={styles.container}>
                    <View style={styles.btnGroupContainer}>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.setState({
                                selectedTab: 'get'
                            })}    
                        >
                            <Text style={styles.btnText}>Back</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={()=>this.addStaff()}    
                        >
                            <Text style={styles.btnText}>Save</Text>
                        </Pressable>
                    </View>
                    <ScrollView>
                        <View style={styles.formContainer}>
                            <Text style={styles.formLabel}>First Name</Text>
                            <TextInput
                                placeholder='First Name'
                                value={this.state.firstName}
                                placeholderTextColor={Colours.beanMidBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState({firstName: text})}  
                            />
                            <Text style={styles.formLabel}>Last Name</Text>
                            <TextInput
                                placeholder='Last Name'
                                value={this.state.lastName}
                                placeholderTextColor={Colours.beanMidBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState({lastName: text})}  
                            />
                            <Text style={styles.formLabel}>Phone</Text>
                            <TextInput
                                placeholder='Phone'
                                value={this.state.phone}
                                placeholderTextColor={Colours.beanMidBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState({phone: text})}  
                            />
                            <Text style={styles.formLabel}>Email</Text>
                            <TextInput
                                placeholder='Email'
                                value={this.state.email}
                                placeholderTextColor={Colours.beanMidBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState({email: text})}  
                            />
                            <Text style={styles.formLabel}>Password</Text>
                            <TextInput
                                placeholder='Password'
                                value={this.state.staffPassword}
                                secureTextEntry={true} 
                                placeholderTextColor={Colours.beanMidBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState({staffPassword: text})}  
                            />
                            <Text style={styles.formLabel}>Position</Text>
                            <Picker
                                selectedValue = {this.state.position}
                                onValueChange = {(value) => {this.setState({position: value})}}
                                style={styles.pickerStyle}
                            >
                                <Picker.Item label="Position" value="0" />
                                <Picker.Item label="Manager" value="Manager" />
                                <Picker.Item label="Staff" value="Staff" />
                            </Picker> 
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        }
    }
}

export default StaffScreen