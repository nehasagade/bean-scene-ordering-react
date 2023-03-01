import { Component } from "react";
import { SafeAreaView } from "react-native";
import { View, Pressable, ScrollView, FlatList, Text, TextInput, Picker } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


import styles from '../styles/MainStyle';
import Colours from "../constants/Colours";
import Header from "../constants/Header";

class MenuScreen extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            _id: 0,
            name: '',
            price: 0,
            description: '',
            dietaryFlag: '',
            availability: ' ',
            category: '',
            selectedTab: 'get',
            position: '',
            allCategories: []

        }
    }
    
    async componentDidMount(){
        this.getMenu()
        this.getCategory()
        const jsonOutput = await AsyncStorage.getItem('@loginDetails');
        console.log(jsonOutput)
        if (jsonOutput && jsonOutput != 'undefined' & jsonOutput != '') {
            var details = JSON.parse(jsonOutput)

            this.setState({
                position: details.position
            })
        }
    }

    // Get categories for pickers
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
                    allCategories: json,
                    selectedTab: 'get'
                })
                
            });
    }
    // Add new menu item
    addMenu() {
        var url = 'http://localhost:57431/api/Menu/Create'
        // Create an object that is one menu item
        const menu = {
            name: this.state.name,
            description: this.state.description,
            category: this.state.category,
            price: this.state.price,
            dietaryFlag: this.state.dietaryFlag,
            availability: this.state.availability
        }
        var options = {
            method: 'POST',
            body: JSON.stringify(menu), // turn it into json
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Basic ' + btoa('test:test')
            }
        }
        fetch(url, options) // pass it through to the api
        .then((json)=>{
            console.log(json);
            this.getMenu()
            this.setState({
                selectedTab: 'detail'
            })
        })
    }

    // Get all menu items
    getMenu() {
        var options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Basic ' + btoa('test:test')
            }
        }
        fetch('http://localhost:57431/api/Menu', options)
            .then(response => response.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    data: json,
                    selectedTab: 'get'
                })
                
            });
    }

    // Delete a menu item
    deleteMenu() {
        var url = 'http://localhost:57431/api/Menu/Delete/' + this.state._id
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
            this.getMenu()
        })
    }

    // Edit a menu item
    editMenu() {
        var url = 'http://localhost:57431/api/Menu/Edit/' + this.state._id
        const staff = {
            name: this.state.name,
            price: this.state.price,
            description: this.state.description,
            dietaryFlag: this.state.dietaryFlag,
            availability: this.state.availability,
            category: this.state.category
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
            this.getMenu();
            this.setState({
                selectedTab: 'detail'
            })
        })
    }
    
    search=(text)=>{
        var url = 'http://localhost:57431/api/Menu/Search/' + text
        var options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Basic ' + btoa('test:test')
            }
        }
        fetch(url, options)
        .then(response =>response.json())
        .then((json)=>{
            console.log(json);

            this.setState({
                data:json
            })
        })

    }

    searchCategory=(category)=>{
        var url = 'http://localhost:57431/api/Menu/SearchCategory/' + category._id
        var options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Basic ' + btoa('test:test')
            }
        }
        fetch(url, options)
        .then(response =>response.json())
        .then((json)=>{
            console.log(json);

            this.setState({
                data:json
            })
        })
    }

    render() {
        let categoryPicker = this.state.allCategories.map((category) =>{
            return <Picker.Item key={category._id} value={category._id} label={category.name} />
        })
        let categorySearchBtns = this.state.allCategories.map((category) => {
            return <Pressable
                        key={category._id} 
                        style={styles.categorySearchBtn}
                        onPress={() => this.searchCategory(category)}
                    >
            <Text style={styles.categorySearchBtnText}>{category.name}</Text>
        </Pressable>
        })
        

        // Show all menu items
        if (this.state.selectedTab == 'get') {
            const renderData=({item})=>{
                let categoryName = this.state.allCategories.find(obj => obj._id === item.category)
                return(
                    <Pressable 
                        onPress={() => this.setState({
                            selectedTab: 'detail',
                            _id: item._id,
                            name: item.name,
                            description: item.description,
                            price: item.price,
                            dietaryFlag: item.dietaryFlag,
                            availability: item.availability,
                            category: categoryName.name
                        })}
                    >
                        <View style={styles.listContainerMenu}>
                            <Text style={styles.listHeading}>{item.name}</Text>
                            <Text style={styles.listText}>{item.description}</Text>
                            <Text style={styles.listText}>${item.price}</Text>
                            <Text style={styles.listText}>{item.dietaryFlag}</Text>
                            <Text style={styles.listText}>{item.availability == true ? "Available" : "Unavailable"}</Text>
                        </View>
                    </Pressable>
                )
            }
            return(
                <SafeAreaView style={styles.container}>
                    <Header navigation={this.props.navigation}></Header>
                    <View style={styles.searchContainer}>
                        <TextInput
                            placeholder='Search'
                            value={this.state.searchText}
                            placeholderTextColor={Colours.beanDarkBlue}
                            style={styles.inputTextbox} 
                            onChangeText={text => this.search(text)} 
                        />
                        {this.state.position == 'Manager' ?                          <Pressable 
                                style={styles.btnSmallSearch}
                                onPress={() => this.setState({
                                    selectedTab: 'add',
                                    _id: 0,
                                    name: '',
                                    price: 0,
                                    description: '',
                                    availability: true,
                                    category: '',
                                    dietaryFlag: ''
                                })}    
                            >
                                <Text style={styles.btnText}>Add</Text>
                            </Pressable> : null}
                    </View>
                    <View style={styles.searchContainer}>
                        <ScrollView 
                                horizontal={true} 
                                showsHorizontalScrollIndicator={false} 
                            >
                                <Pressable 
                                    style={styles.categorySearchBtn}
                                    onPress={() => this.getMenu()}
                                >
                                    <Text style={styles.categorySearchBtnText}>All</Text>
                                </Pressable>
                                {categorySearchBtns}
                        </ScrollView>    
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
            let categoryId = this.state.allCategories.find(obj => obj.name === this.state.category)
            return(
                <SafeAreaView style={styles.container}>
                    <View style={styles.btnGroupContainer}>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.setState({
                                selectedTab: 'get',
                               
                            })}    
                        >
                            <Text style={styles.btnText}>Back</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.setState({
                                selectedTab: 'edit',
                                category: categoryId._id
                            })}    
                        >
                            <Text style={styles.btnText}>Edit</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.btnMediumDanger}
                            onPress={() => this.deleteMenu()}    
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
                            <Text style={styles.formLabel}>Description</Text>
                            <TextInput
                                placeholder='Description'
                                value={this.state.description}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextArea}
                                multiline = {true}
                                numberOfLines = {4}  
                            />
                            <Text style={styles.formLabel}>Category</Text>
                            <TextInput
                                placeholder='Category'
                                value={this.state.category}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}  
                            />
                            <Text style={styles.formLabel}>Price</Text>
                            <TextInput
                                placeholder='Price'
                                value={this.state.price}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}  
                            />
                            <Text style={styles.formLabel}>Dietary Flags</Text>
                            <TextInput
                                placeholder='Dietary Flags'
                                value={this.state.dietaryFlag}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}  
                            />
                            <Text style={styles.formLabel}>Status</Text>
                            <TextInput
                                placeholder='Availablity'
                                value={this.state.availability == true ? "Available" : "Unavailable"}
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
                                selectedTab: 'get'
                            })}    
                        >
                            <Text style={styles.btnText}>Back</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.editMenu()}    
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
                            <Text style={styles.formLabel}>Description</Text>
                            <TextInput
                                placeholder='Description'
                                value={this.state.description}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextArea}
                                multiline = {true}
                                numberOfLines = {4}
                                onChangeText={text => this.setState({description: text})}  
                            />
                            <Text style={styles.formLabel}>Category</Text>
                            <Picker
                                selectedValue = {this.state.category}
                                onValueChange = {(value) => {this.setState({category: value})}}
                                style={styles.pickerStyle}
                            >
                                {/* <Picker.Item value={0} label="Select" /> */}
                                {categoryPicker}
                            </Picker>
                            <Text style={styles.formLabel}>Price</Text>
                            <TextInput
                                placeholder='Price'
                                value={this.state.price}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}  
                                onChangeText={text => this.setState({price: text})}
                            />
                            <Text style={styles.formLabel}>Dietary Flags</Text>
                            <TextInput
                                placeholder='Dietary Flags'
                                value={this.state.dietaryFlag}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState({dietaryFlag: text})}  
                            />
                            <Text style={styles.formLabel}>Status</Text>
                            <Picker
                                selectedValue = {this.state.availability}
                                onValueChange = {(value) => {this.setState({availability: value})}}
                                style={styles.pickerStyle}
                            >
                                <Picker.Item label="Available" value={true} />
                                <Picker.Item label="Unavailable" value={false} />
                            </Picker>
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
                                selectedTab: 'get'
                            })}    
                        >
                            <Text style={styles.btnText}>Back</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.addMenu()}    
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
                            <Text style={styles.formLabel}>Description</Text>
                            <TextInput
                                placeholder='Description'
                                value={this.state.description}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextArea}
                                multiline = {true}
                                numberOfLines = {3}
                                onChangeText={text => this.setState({description: text})}  
                            />
                            <Text style={styles.formLabel}>Category</Text>
                            <Picker
                                selectedValue = {this.state.category}
                                onValueChange = {(value) => {this.setState({category: value})
                                    
                            }}
                                style={styles.pickerStyle}
                            >
                                {categoryPicker}
                            </Picker>
                            <Text style={styles.formLabel}>Price</Text>
                            <TextInput
                                placeholder='Price'
                                value={this.state.price}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState({price: text})}  
                            />
                            <Text style={styles.formLabel}>Dietary Flags</Text>
                            <TextInput
                                placeholder='Dietary Flags'
                                value={this.state.dietaryFlag}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState({dietaryFlag: text})}  
                            />
                            <Text style={styles.formLabel}>Status</Text>
                            <Picker
                                selectedValue = {this.state.availability}
                                onValueChange = {(value) => {this.setState({availability: value})}}
                                style={styles.pickerStyle}
                            >

                                <Picker.Item label="Available" value={true} />
                                <Picker.Item label="Unavailable" value={false} />
                            </Picker>
                        </View>                            
                    </ScrollView>
                </SafeAreaView>
            );
        } 
    }
}

export default MenuScreen