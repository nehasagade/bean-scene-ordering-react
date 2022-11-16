import { Component } from "react";
import { SafeAreaView } from "react-native";
import { View, Pressable, Text, ScrollView, FlatList, Picker, TextInput } from "react-native-web";

import Colours from "../constants/Colours";
import styles from '../styles/MainStyle';

class OrderScreen extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            menuData: [],                
            oneOrder: {},
            selectedMenuItem: {
                menu: {
                    menu_id: '',
                    name: '',
                    description: '',
                    price: 0,
                    dietaryFlag: '',
                },                
                qty: 0,
                note: ''
            },
            order: {
                table_id: '',
                order_items: [],
                is_complete: false
            },
            selectedTab: 'get',
            message: ''
        }     
    }
    
    
    componentDidMount(){
        this.getOrder()    
    }
    addItemToOrder() {
        this.setState(prevState => ({
            ...prevState.order.order_items.push(prevState.selectedMenuItem),
            selectedMenuItem: {
                menu: {
                    menu_id: '',
                    name: '',
                    description: '',
                    price: 0,
                    dietaryFlag: '',
                },                
                qty: 0,
                note: ''
            },
            selectedTab: 'menuItem'
        }))
        console.log(this.state.order.order_items)
    }
    // Mark order completed
    completeOrder() {
        var url = 'http://localhost:57431/api/Order/Complete/' + this.state.oneOrder.order_id
        var options = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Basic ' + btoa('test:test')
            } 
        }
        fetch(url, options)
       .then((json)=>{
            console.log(json);
            this.getOrder()
            this.setState({
                selectedTab: 'get'
            })
        }) 
    }
    createOrder() {
        var url = 'http://localhost:57431/api/Order/Create'
        
        var options = {
            method: 'POST',
            body: JSON.stringify(this.state.order), 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Basic ' + btoa('test:test')
            }
        }
        fetch(url, options) 
        .then((json)=>{
            console.log(json);
            this.getOrder()
            this.setState({
                selectedTab: 'detail'
            })
        })
    }

    // Get all orders
    getOrder() {
        var url = 'http://localhost:57431/api/Order'
        var headers = new Headers({                
            Authorization : 'Basic ' + btoa('test:test')
        });
        var options = {headers: headers};
        fetch(url, options)
            .then(response => response.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    data: json,
                    selectedTab: 'get'
                })
                
            });
    }

    // Get the menu
    getAvailableMenu() {
        var url = 'http://localhost:57431/api/Menu'
        var headers = new Headers({                
            Authorization : 'Basic ' + btoa('test:test')
        });
        var options = {headers: headers};
        fetch(url, options)
            .then(response => response.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    menuData: json,
                    selectedTab: 'menuItem'
                })
                
            });
    }    
    
    render() {
        // GET ALL
        if(this.state.selectedTab == 'get') {
            const renderData=({item})=>{
                return(
                    <Pressable
                        onPress={() => this.setState({
                            selectedTab: 'detail',
                            oneOrder: item
                        })}
                    >
                        <View style={styles.listContainer}>
                            <View>
                                <Text style={styles.listHeading}>Order {item.order_id}</Text>
                                <Text style={styles.listSubHeading}>Table {item.table_id}</Text>
                            </View>
                            <View>                                
                                <Text style={styles.listText}>              
                                    {item.is_complete ? "Complete" : "In Progress"}
                                </Text>                               
                            </View>
                        </View>
                    </Pressable>
                )
            }
            return(
                <SafeAreaView style={styles.container}>
                    <View style={styles.btnLargeContainer}>
                        <Pressable 
                            style={styles.btnLarge}
                            onPress={()=> this.setState({
                                selectedTab: 'add'
                            })}
                        >
                            <Text style={styles.btnText}>New</Text>
                        </Pressable>
                    </View>
                    
                        <FlatList 
                            data={this.state.data} 
                            renderItem={renderData} 
                            keyExtractor={(item)=>item.order_id}
                        /> 
                    
                </SafeAreaView>
            );
        }
        // GET ONE
        else if(this.state.selectedTab == 'detail')
        {
            const renderData=({item}) => {
                return(
                    <View style={styles.listContainerMenu}>
                        <Text style={styles.listHeading}>{item.menu.name}</Text>
                        <Text style={styles.listText}>Qty: {item.qty}</Text>
                        <Text style={styles.listText}>Note: {item.note}</Text>
                    </View>
                )
            }
            return(
                <SafeAreaView style={styles.container}>
                     <View style={styles.btnLargeContainer}>
                        <Pressable 
                            style={styles.btnLarge}
                            onPress={()=> this.setState({
                                selectedTab: 'get'
                            })}
                        >
                            <Text style={styles.btnText}>Back</Text>
                        </Pressable>
                    </View>
                    <View style={styles.listContainer}>
                        <Text style={styles.listHeading}>Order {this.state.oneOrder.order_id}</Text>
                        <Text style={styles.listSubHeading}>Table {this.state.oneOrder.table_id}</Text>
                    </View>
                    <FlatList 
                        data={this.state.oneOrder.order_items} 
                        renderItem={renderData} 
                        keyExtractor={(item)=>item.menu.menu_id} 
                    /> 
                    <View style={styles.btnLargeContainer}>
                        <Pressable 
                            style={styles.btnLarge}
                            onPress={() => this.completeOrder()}
                        >
                            <Text style={styles.btnText}>Order Completed</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            );
        }
        // ADD ORDER
        else if(this.state.selectedTab == 'add') {
            const renderData=({item}) => {
                return(
                    <View style={styles.listContainerMenu}>
                        <Text style={styles.listHeading}>{item.menu.name}</Text>
                        <Text style={styles.listText}>Qty: {item.qty}</Text>
                        <Text style={styles.listText}>Note: {item.note}</Text>
                    </View>
                )
            }
            return(
                <SafeAreaView style={styles.container}>
                    <View style={styles.listContainer}>
                        <Text style={styles.listHeading}>New Order</Text>                       
                    </View>
                    <View style={styles.btnGroupContainer}>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={()=> this.setState({
                                selectedTab: 'get'
                            })}
                        >
                            <Text style={styles.btnText}>Back</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.getAvailableMenu()}
                        >
                            <Text style={styles.btnText}>Add</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.btnMedium}
                            onPress={() => this.createOrder()}
                        >
                            <Text style={styles.btnText}>Confirm</Text>
                        </Pressable>
                    </View>
                    <View style={styles.searchContainer}>
                        <Picker
                            selectedValue = {this.state.order.table_id}
                            onValueChange = {value => this.setState((prevState) => ({
                                order: {
                                    ...prevState.order,
                                    table_id: value
                                }
                            }))}
                            style={styles.pickerStyle}
                        >
                            <Picker.Item label="Table" value="0" />
                            <Picker.Item label="M1" value="M1" />
                        </Picker> 
                    </View>
                    <FlatList 
                        data={this.state.order.order_items} 
                        renderItem={renderData} 
                        keyExtractor={(item)=>item.menu.menu_id} 
                    />
                    <View style={styles.btnLargeContainer}>
                       
                    </View>                    
                </SafeAreaView>
            )
        }
        // ADD ITEM TO NEW ORDER
        else if(this.state.selectedTab == 'menuItem') {
            const renderData=({item})=>{
                return(               
                    <View style={styles.listContainerMenu}>
                        <Pressable
                            onPress={()=> this.setState({
                                selectedTab: 'addItem',
                                selectedMenuItem: {
                                    menu: {
                                        menu_id: item.menu_id,
                                        name: item.name,
                                        description: item.description,
                                        price: item.price,
                                        dietaryFlag: item.dietaryFlag,
                                        category: item.category,
                                        availability: item.availability
                                    },                                    
                                    qty: 0,
                                    note: ''
                                },
                            })}
                        >
                            <View>
                                <Text style={styles.listHeading}>{item.name}</Text>
                                <Text style={styles.listText}>{item.description}</Text>
                                <Text style={styles.listText}>${item.price}</Text>
                                <Text style={styles.listText}>{item.dietaryFlag}</Text>
                                <Text style={styles.listText}>{item.availability}</Text>
                            </View>
                        </Pressable>
                    </View>
                )
            }
            return(
                <SafeAreaView style={styles.container}>
                    <View style={styles.btnLargeContainer}>
                        <Pressable 
                            style={styles.btnLarge}
                            onPress={() => this.setState({
                                selectedTab: 'add'
                            })}
                        >
                            <Text style={styles.btnText}>Back</Text>
                        </Pressable>
                    </View>
                    <FlatList 
                        data={this.state.menuData} 
                        renderItem={renderData} 
                        keyExtractor={(item)=>item.menu_id} 
                    />            
                </SafeAreaView>
            );
        }
        // ADD ITEM TO ORDER
        else if(this.state.selectedTab == 'addItem') {
            return(
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                         <View style={styles.btnLargeContainer}>
                            <Pressable 
                                style={styles.btnLarge}
                                onPress={() => this.setState({
                                    selectedTab: 'menuItem'
                                })}
                            >
                                <Text style={styles.btnText}>Back</Text>
                            </Pressable>
                        </View>
                       <View style={styles.listContainerMenu}>
                            <Text style={styles.listHeading}>{this.state.selectedMenuItem.menu.name}</Text>
                            <Text style={styles.listText}>{this.state.selectedMenuItem.menu.description}</Text>
                            <Text style={styles.listText}>${this.state.selectedMenuItem.menu.price}</Text>
                            <Text style={styles.listText}>{this.state.selectedMenuItem.menu.dietaryFlag}</Text>
                        </View>
                        <View style={styles.listContainerMenu}>
                            <Text style={styles.listSubHeading}>Quantity</Text>
                            <TextInput 
                                placeholder='0'
                                keyboardType='numeric'
                                maxLength={5}
                                placeholderTextColor={Colours.beanDarkBlue}
                                style={styles.inputTextbox}
                                onChangeText={text => this.setState((prevState) =>({
                                    selectedMenuItem: {
                                        ...prevState.selectedMenuItem,
                                        qty: text
                                    }
                                }))}
                                value={this.state.selectedMenuItem.qty}
                            />
                        </View>
                        <View style={styles.listContainerMenu}>
                            <Text style={styles.listSubHeading}>Note</Text>
                                <TextInput
                                    placeholder='E.g. No sauce'
                                    // value={}
                                    placeholderTextColor={Colours.beanDarkBlue}
                                    style={styles.inputTextArea}
                                    multiline = {true}
                                    numberOfLines = {3} 
                                    onChangeText={text => this.setState((prevState) =>({
                                        selectedMenuItem: {
                                            ...prevState.selectedMenuItem,
                                            note: text
                                        }
                                    }))}
                                    value={this.state.selectedMenuItem.note}
                                />
                        </View>
                        <View style={styles.btnLargeContainer}>
                            <Pressable 
                                style={styles.btnLarge}
                                onPress={() => this.addItemToOrder()}
                            >
                                <Text style={styles.btnText}>Add</Text>
                            </Pressable>
                        </View> 
                    </ScrollView>
                </SafeAreaView>
            ); 
        }
    }
}

export default OrderScreen