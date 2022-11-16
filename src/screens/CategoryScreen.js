import { Component } from "react";
import { SafeAreaView } from "react-native";
import { View, Pressable, ScrollView, FlatList, Text, TextInput, Picker } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';


import styles from '../styles/MainStyle';
import Colours from "../constants/Colours";

class CategoryScreen extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            id: '',
            name: '',
            selectedTab: 'get',
            message: ''

        }
    }
    
    componentDidMount(){
        this.getCategory()
    }
    // Add new menu item
    addCategory() {
        var url = 'http://localhost:57431/api/Category/Create'
        const category = {
            name: this.state.name    
        }
        var options = {
            method: 'POST',
            body: JSON.stringify(category), // turn it into json
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Basic ' + btoa('test:test')
            }
        }
        fetch(url, options) // pass it through to the api
        .then((json)=>{
            console.log(json);
            this.getCategory()
            this.setState({
                selectedTab: 'detail',
            })
        })
    }

    // Get all categories
    getCategory() {
        var options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Basic ' + btoa('test:test')
            }
        }
        fetch('http://localhost:57431/api/Category', options)
            .then((response) => {
                if(response.ok)
                {
                    return response.json()
                }
                else {
                    this.setState({
                        message: 'Something went wrong. Try again later'
                    })
                        
                }
            })
            .then((json) => {
                console.log(json);
                this.setState({
                    data: json,
                    selectedTab: 'get'
                })
                
            });
    }

    // Delete a menu item
    deleteCategory() {
        var url = 'http://localhost:57431/api/Category/Delete/' + this.state.id
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
            this.getCategory()
        })
    }

    // Edit a category item
    editCategory() {
        var url = 'http://localhost:57431/api/Category/Edit/' + this.state._id
        const category = {
            _id: this.state.id,
            name: this.state.name,
        };
        var options = {
            method: 'PUT',
            body: JSON.stringify(category),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Basic ' + btoa('test:test')
            }
        }
       fetch(url, options)
       .then((json)=>{
            console.log(json);
            this.getCategory();
            this.setState({
                message: 'Category updated'
            })
            
            
        })
    }
    
    render() {
        // Show all menu items
        if (this.state.selectedTab == 'get') {
            const renderData=({item})=>{
                return(
                    <Pressable 
                        onPress={() => this.setState({
                            selectedTab: 'detail',
                            id: item._id,
                            name: item.name,
                            message: ''
                            
                        })}
                    >
                        <View style={styles.listContainerMenu}>
                            <Text style={styles.listHeading}>{item.name}</Text>
                        </View>
                    </Pressable>
                )
            }
            return(
                <SafeAreaView style={styles.container}>                     
                    
                    <View style={styles.btnLargeContainer}>
                        <Pressable 
                            style={styles.btnLarge}
                            onPress={() => this.setState({
                                selectedTab: 'add',
                                id: '',
                                name: '',
                                message: ''
                            })}    
                        >
                            <Text style={styles.btnText}>Add</Text>
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
        // View one menu item
        else if(this.state.selectedTab == 'detail')
        {
            return(
                <SafeAreaView style={styles.container}>
                    <View style={styles.btnGroupContainer}>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.setState({
                                selectedTab: 'get',
                                message: ''
                            })}    
                        >
                            <Text style={styles.btnText}>Back</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.setState({
                                selectedTab: 'edit',
                                message: ''
                            })}    
                        >
                            <Text style={styles.btnText}>Edit</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.deleteCategory()}    
                        >
                            <Text style={styles.btnText}>Delete</Text>
                        </Pressable>
                    </View>
                    <ScrollView>
                        <View style={styles.formContainer}>                        
                            <Text style={styles.formLabel}>Name</Text>
                            <TextInput
                                placeholder='Name'
                                value={this.state.name}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}  
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        }
        // Edit one item
        else if (this.state.selectedTab == 'edit'){
            return(
                <SafeAreaView style={styles.container}>
                    <View style={styles.btnGroupContainer}>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.setState({
                                selectedTab: 'get',
                                message: ''
                            })}    
                        >
                            <Text style={styles.btnText}>Back</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.editCategory()}    
                        >
                            <Text style={styles.btnText}>Save</Text>
                        </Pressable>
                    </View>
                    <ScrollView>
                        <View style={styles.formContainer}>
                            <Text style={styles.formLabel}>Name</Text>
                            <TextInput
                                placeholder='Name'
                                value={this.state.name}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}  
                                onChangeText={text => this.setState({name: text})}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        }
        // Add a new item
        else if (this.state.selectedTab == 'add') {
            return(
                <SafeAreaView style={styles.container}>
                    <View style={styles.btnGroupContainer}>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.setState({
                                selectedTab: 'get',
                                message: ''
                            })}    
                        >
                            <Text style={styles.btnText}>Back</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.addCategory()}    
                        >
                            <Text style={styles.btnText}>Save</Text>
                        </Pressable>
                    </View>
                    <ScrollView>
                    <View style={styles.formContainer}>
                            <Text style={styles.formLabel}>Name</Text>
                            <TextInput
                                placeholder='Name'
                                value={this.state.name}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState({name: text})}  
                            />

                        </View>                            
                    </ScrollView>
                </SafeAreaView>
            );
        } 
    }
}

export default CategoryScreen