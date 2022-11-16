import { Component } from "react";
import { SafeAreaView } from "react-native";
import { View, Pressable, Text, ScrollView, FlatList } from "react-native-web";

import styles from '../styles/MainStyle';

class ReportScreen extends Component {
    constructor(){
        super();
        this.state={
            data: [],
            selectedTab: 'current'
        }
        
    }
    componentDidMount() {
        this.getCurrentOrders()
    }
    getCurrentOrders(){
        var url = 'http://localhost:57431/api/Report/getCurrentOrder'
        var headers = new Headers({                
            Authorization : 'Basic ' + btoa('test:test')
        });
        var options = {headers: headers};
        fetch(url, options)
        .then(response => response.json())
        .then((json)=>{
            this.setState({
                data: json,
                selectedTab: 'current'
            })
            console.log(json);
        })
    }
    getCompletedOrders()
    {
        var url = 'http://localhost:57431/api/Report/getCompletedOrder'
        var headers = new Headers({                
            Authorization : 'Basic ' + btoa('test:test')
        });
        var options = {headers: headers};
        fetch(url, options)
        .then(response => response.json())
        .then((json)=>{
            this.setState({
                data: json,
                selectedTab: 'complete'
            })
            console.log(json);
        })
    }
    render() {
        const renderData=({item})=>{
            return(
                <Pressable>
                    <View style={styles.listContainer}>
                        <View>
                            <Text style={styles.listHeading}>Order {item.order_id}</Text>
                            <Text style={styles.listSubHeading}>Table {item.table_id}</Text>
                        </View>
                        <View>
                            <Text style={styles.listText}>{item.status}</Text>
                        </View>
                    </View>
                </Pressable>
            )
        }
        if (this.state.selectedTab == 'current') {
            return(
                <SafeAreaView style={styles.container}>
                    <View style={styles.btnGroupContainer}>
                            <Pressable 
                                style={styles.btnMedium}  
                            >
                                <Text style={styles.btnText}>Back</Text>
                            </Pressable>
                            <Pressable 
                                style={styles.btnMedium}
                                onPress={() => this.getCurrentOrders()}    
                            >
                                <Text style={styles.btnText}>Current</Text>
                            </Pressable>
                            <Pressable 
                                style={styles.btnMedium}
                                onPress={() => this.getCompletedOrders()}    
                            >
                                <Text style={styles.btnText}>Complete</Text>
                            </Pressable>
                        </View>
                        <View style={styles.listContainer}>
                            <Text style={styles.listHeading}>Total Current</Text>
                            <Text style={styles.listSubHeading}>{this.state.data.length}</Text>
                        </View>
                    <FlatList 
                        data={this.state.data} 
                        renderItem={renderData} 
                        keyExtractor={(item)=>item.order_id} 
                    />
                </SafeAreaView>
            );
        }
        else if (this.state.selectedTab == 'complete') {
            return(
                <SafeAreaView style={styles.container}>
                    <View style={styles.btnGroupContainer}>
                            <Pressable 
                                style={styles.btnMedium}  
                            >
                                <Text style={styles.btnText}>Back</Text>
                            </Pressable>
                            <Pressable 
                                style={styles.btnMedium}
                                onPress={() => this.getCurrentOrders()}    
                            >
                                <Text style={styles.btnText}>Current</Text>
                            </Pressable>
                            <Pressable 
                                style={styles.btnMedium}
                                onPress={() => this.getCompletedOrders()}    
                            >
                                <Text style={styles.btnText}>Complete</Text>
                            </Pressable>
                        </View>
                        <View style={styles.listContainer}>
                            <Text style={styles.listHeading}>Total Completed</Text>
                            <Text style={styles.listSubHeading}>{this.state.data.length}</Text>
                        </View>
                    <FlatList 
                        data={this.state.data} 
                        renderItem={renderData} 
                        keyExtractor={(item)=>item.order_id} 
                    />
                </SafeAreaView>
            );
        }
        
    }
}

export default ReportScreen