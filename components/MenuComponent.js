import React , { Component } from 'react';
import { FlatList ,StyleSheet, View, Image,Text, Button,Modal,TextInput,Alert} from 'react-native';
import { Tile ,Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';
import { postDish ,deleteDishDB } from '../redux/ActionCreators';

const mapStateToProps =state => {
	return{
		dishes : state.dishes
	}
}

const mapDispatchToProps = (dispatch) =>({
    postDish : (name,category,label,price,description) => dispatch(postDish(name,category,label,price,description)),
    deleteDishDB : (dishId) => dispatch(deleteDishDB(dishId))
});

class Menu extends Component {
    constructor( props ){
        super( props );
        this.state = {
            name : null,
            category : null,
            label : null,
            price : null,
            description : null,
            showModal : false,
            showModal1 : false,
            name1 : null,
            category1 : null,
            label1 : null,
            price1 : null,
            description1 : null

        }
    }
	static navigationOptions = {
		title : 'Menu'	
    }
    toggleModal(){
        this.setState({ showModal : !this.state.showModal})
    }
    toggleModal1(){
        this.setState({ showModal1 : !this.state.showModal1})
    }
    resetForm() {
        this.setState({
            showModal: false
        });
    }
    resetForm1() {
        this.setState({
            showModal1: false
        });
    }
	render(){
		const renderMenuItem= ({item , index}) => {
            console.log('index '+index);
			return(	
                <Animatable.View animation="fadeInRightBig" duration={2000}>
                <Tile
                    key={index}
                    title={item.name}
                    caption={item.description}
                    icon = {{ name : 'minus' ,color : 'white',size : 50 ,type : 'font-awesome' , onPress : () =>
                        {
                            Alert.alert(
                                'Delete dish ?',
                                'Are you sure you want to delete the dish ?',
                                [
                                    {
                                        text : 'Confirm',
                                        onPress : ()=> {this.props.deleteDishDB(index)}
                                    },{
                                        text : 'Cancel',
                                        style : 'cancel'
                                    }
                                ]
                            );
                        }
                    }}                    
                    featured
                    onPress={() => navigate('DishDetail', { dishId: item.id })}
                    imageSrc={{ uri: baseUrl + item.image}}
                    />
                </Animatable.View>

			);
		}
		const { navigate } = this.props.navigation;

		if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <View>

                    <Icon
                        raised  
                        reverse
                        name='heart'
                        type='font-awesome'
                        color='#f50'
                        onPress= {() => this.toggleModal()}
                        />

                        <Modal animationType = {"slide"} transparent = {false}
                            visible = {this.state.showModal}
                            onDismiss = {() => this.toggleModal() }
                            onRequestClose = {() => this.toggleModal() }>
                            <View style = {styles.modal}>
                            <View style={{flexDirection :'row', marginTop : 20}}>
                            <TextInput
                                style={styles.formElements}
                                placeholder="Name"
                                onChangeText={(text) => this.setState({name: text})}
                            />
                            </View>
                            <View style={{flexDirection :'row', marginTop : 20}}>
                            <TextInput
                                style={styles.formElements}
                                placeholder="Category"
                                onChangeText={(text) => this.setState({category: text})}
                            />
                            </View>
                            <View style={{flexDirection :'row', marginTop : 20}}>
                            <TextInput
                                style={styles.formElements}
                                placeholder="Label"
                                onChangeText={(text) => this.setState({label: text})}
                            />
                            </View>
                            <View style={{flexDirection :'row', marginTop : 20}}>
                            <TextInput
                                style={styles.formElements}
                                placeholder="price"
                                onChangeText={(text) => this.setState({price: text})}
                            />
                            </View>
                            <View style={{flexDirection :'row', marginTop : 20}}>
                            <TextInput
                                style={styles.formElements}
                                placeholder="Description"
                                onChangeText={(text) => this.setState({description: text})}
                            />
                            </View>
                            <View style={{ marginTop : 20,marginLeft : 20,marginRight: 20}}>
                            <Button 
                                onPress = {() =>{this.props.postDish(this.state.name,this.state.category,this.state.label,this.state.price,this.state.description);this.toggleModal(); this.resetForm();}}
                                color="#512DA8"
                                title="Close" 
                                />
                            </View>
                        </View>
                        </Modal>

                        <View>
                        <Modal animationType = {"slide"} transparent = {false}
                            visible = {this.state.showModal1}
                            onDismiss = {() => this.toggleModal1() }
                            onRequestClose = {() => this.toggleModal1() }>
                            <View style = {styles.modal}>

  
                            <View style={{flexDirection :'row', marginTop : 20}}>
                            <TextInput
                                style={styles.formElements}
                                placeholder="price"
                                onChangeText={(text) => this.setState({price1: text})}
                            />
                            </View>
                            <View style={{flexDirection :'row', marginTop : 20}}>

                            </View>
                            <View style={{ marginTop : 20,marginLeft : 20,marginRight: 20}}>
                            <Button 
                                onPress = {() =>{this.props.updateDish(this.state.price1);this.toggleModal1(); this.resetForm1();}}
                                color="#512DA8"
                                title="Close" 
                                />
                            </View>
                        </View>
                        </Modal>
                        </View>
                    <FlatList 
                        data={this.props.dishes.dishes}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id? item.id.toString(): ""}
                        />
                </View>
            );
        }
	}
}

const styles = StyleSheet.create({
 
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : '#F5F5F5'
  },
 
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
},
modalText: {
    fontSize: 18,
    margin: 10
},
formElements : {
   marginLeft: 40 
},
formButtons : {
   height: 40,
   marginTop : 20
}
});

export default connect(mapStateToProps , mapDispatchToProps)(Menu);