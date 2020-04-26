import React, { Component } from 'react';
import { Text ,View,ScrollView ,Share, StyleSheet, Button ,Modal,TextInput,PanResponder} from 'react-native';
import { Card , Icon} from 'react-native-elements';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite,postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';
import StarRating from 'react-native-star-rating';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId , rating ,author, comment) => dispatch(postComment(dishId , rating ,author, comment))
})

const shareDish = (title, message, url) => {
    Share.share({
        title: title,
        message: title + ': ' + message + ' ' + url,
        url: url
    },{
        dialogTitle: 'Share ' + title
    })
}

const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if ( dx < -200 )
        return true;
    else
        return false;
}

const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
        return true;
    },
    onPanResponderEnd: (e, gestureState) => {
        console.log("pan responder end", gestureState);
        if (recognizeDrag(gestureState))
            Alert.alert(
                'Add Favorite',
                'Are you sure you wish to add ' + dish.name + ' to favorite?',
                [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                ],
                { cancelable: false }
            );

        return true;
    }
})

function RenderDish( props ){
    const dish =props.dish;

    if(dish != null){
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            {...panResponder.panHandlers}>
                <Card 
                featuredTitle ={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style ={{margin : 10}}>
                        {dish.description}
                    </Text>
                    <View style={{flex:3,flexDirection:"row"}}>
                    <View style={{flex:1}}>
                    <Icon
                        raised  
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                    </View>
                    <View style={{flex:1}}>
                    <Icon
                        raised
                        reverse
                        name='share'
                        type='font-awesome'
                        color='#51D2A8'
                        onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} />
                    </View>
                    <View style={{flex:1}}>
                    <Icon
                        raised  
                        reverse
                        name='pencil-square-o'
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.openModal()}
                        />
                    </View>
                    </View>
                </Card>
            </Animatable.View>

        );
    }
    else{
        return(
                <View></View>   
        );
    }
}

function RenderComments(props) {

    const comments = props.comments;
    const renderCommentItem = ({item, index}) => {
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments' >
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            starCount: 3.5,
            commentText : '',
            author : ''
             
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    };
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    resetForm() {
        this.setState({
            showModal: false
        });
    }
    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        return(
            <ScrollView >
            <RenderDish dish={this.props.dishes.dishes[+dishId]}
                        favorite={this.props.favorites.some(el => el === dishId)}
                        onPress = {()=>this.markFavorite(dishId)}
                        openModal={() =>this.toggleModal()}/>
                        
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

            <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                <View style={{flexDirection :'row', marginTop : 20}}>
                    <StarRating
                        marginLeft={40}
                        animation="rotate"
                        fullStarColor={'yellow'}
                        halfStarEnabled = {true}
                        disabled={false}
                        maxStars={5}
                        rating={this.state.starCount}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                </View>

                <View style = {styles.modal}>
                    <View style={{flexDirection :'row', marginTop : 20}}>
                        <Icon
                            name='user-o'
                            type='font-awesome'
                            color='#000000'
                            />
                        
                        <TextInput
                            style={styles.formElements}
                            placeholder="Name"
                            onChangeText={(text) => this.setState({author: text})}
                        />
                    </View>
                    <View style={{flexDirection :'row', marginTop : 20}}>
                        <Icon
                            name='comment-o'
                            type='font-awesome'
                            color='#000000'
                            />
                        
                        <TextInput
                            style={styles.formElements}
                            placeholder="Your Comment"
                            onChangeText={(text) => this.setState({commentText: text})}
                            
                        />
                    </View>
                    <View style={styles.formButtons}>
                        <Button 
                            onPress = {() =>{this.props.postComment(dishId,this.state.starCount,this.state.author,this.state.commentText);
                                            this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Submit" 
                            />
                    </View>
                    <View style={styles.formButtons}>

                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#D3D3D3"
                            title="Cancel" 
                            />
                    </View>
                </View>
            </Modal>
        </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
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

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);