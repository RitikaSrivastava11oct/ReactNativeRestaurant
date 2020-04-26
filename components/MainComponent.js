import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import ContactUs from './ContactUsComponent';
import AboutUs from './AboutUsComponent';
import Reservation from './ReservationComponent';
import Login from './LoginComponent';
import Favorites from './FavoriteComponent';
import { View , Platform ,Image, ScrollView, Text, StyleSheet , ToastAndroid} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import NetInfo from "@react-native-community/netinfo";



const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator({
  Menu : {screen : Menu ,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name="menu" size={24} 
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } />          
  })  
 } ,
	DishDetail : {screen : DishDetail}
	},{
	initialRouteName : 'Menu',
	defaultNavigationOptions :{
		headerStyle: {
			backgroundColor: "#512DA8"
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: "#fff"            
		}
	}
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  
      ,
      headerLeft: <Icon name="menu" size={29}
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />    
    })
});

const AboutUsNavigator = createStackNavigator({
  AboutUs: { screen: AboutUs }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  
    ,
    headerLeft: <Icon name="menu" size={29}
                      color= 'white'
                      onPress={ () => navigation.toggleDrawer() } />    
  })
});

const ContactUsNavigator = createStackNavigator({
  ContactUs: { screen: ContactUs }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"           
    },
    headerTintColor: "#fff"  
    ,
    headerLeft: <Icon name="menu" size={29}
                      color= 'white'
                      onPress={ () => navigation.toggleDrawer() } />    
    
  })
});

const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={29}
                      color= 'white'
                      onPress={ () => navigation.toggleDrawer() } />    
  })
})

const FavoritesNavigator = createStackNavigator({
  Favorites: { screen: Favorites }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={29}
                      color= 'white'
                      onPress={ () => navigation.toggleDrawer() } />  
  })
})

const LoginNavigator = createStackNavigator({
  Login: { screen: Login }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
  headerStyle: {
      backgroundColor: "#512DA8"
  },
  headerTitleStyle: {
      color: "#fff"            
  },
  title: 'Login',
  headerTintColor: "#fff",
  headerLeft: <Icon name="menu" size={24}
    iconStyle={{ color: 'white' }} 
    onPress={ () => navigation.toggleDrawer() } />    
})
});

const MainNavigator = createDrawerNavigator({
  Home: 
    { screen: HomeNavigator,
      navigationOptions: ({ navigation }) => ({
        title: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='home'
            type='font-awesome'            
            size={24}
            iconStyle={{ color: tintColor }}
          />
        )
      }),
    },
    Login: 
    { screen: LoginNavigator,
      navigationOptions: {
        title: 'Login',
        drawerLabel: 'Login',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='sign-in'
            type='font-awesome'            
            size={24}
            iconStyle={{ color: tintColor }}
          />
        ),
      }
    },
  Menu: 
    { screen: MenuNavigator,
      navigationOptions: ({ navigation }) => ({
        title: 'Menu',
        drawerLabel: 'Menu',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='list'
            type='font-awesome'            
            size={24}
            iconStyle={{ color: tintColor }}
          />
        )
        
      }),
    },
    AboutUs: 
    { screen: AboutUsNavigator,
      navigationOptions: ({ navigation }) => ({
        title: 'AboutUs',
        drawerLabel: 'AboutUs',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='list'
            type='font-awesome'            
            size={24}
            iconStyle={{ color: tintColor }}
          />
        )
      }), 
    },
    Reservation:
    { screen: ReservationNavigator,
      navigationOptions: {
        title: 'Reserve Table',
        drawerLabel: 'Reserve Table',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='cutlery'
            type='font-awesome'            
            size={24}
            iconStyle={{ color: tintColor }}
          />
        ),
      }
    },
    Favorites:
    { screen: FavoritesNavigator,
      navigationOptions: {
        title: 'My Favorites',
        drawerLabel: 'My Favorites',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='heart'
            type='font-awesome'            
            size={24}
            iconStyle={{ color: tintColor }}
          />
        ),
      }
    },
    
    ContactUs: 
    { screen: ContactUsNavigator,
      navigationOptions:({ navigation }) => ({
        title: 'ContactUs',
        drawerLabel: 'ContactUs',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='list'
            type='font-awesome'            
            size={24}
            iconStyle={{ color: tintColor }}
          />
        )
      }), 
    }
}, {
drawerBackgroundColor: '#D1C4E9'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});


const App = createAppContainer(MainNavigator);

class Main extends Component {

  state = {
    connectionInfo: null,
  };

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    

    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
    unsubscribe();
    
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      ToastAndroid.show('Initial Network Connectivity Type: '
      + state.isConnected + ', effectiveType: ' + state.type,
      ToastAndroid.LONG)
    });
    
  }

	render() {		
		return (
      <SafeAreaProvider>
				<View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}> 
					<App/>
				</View>
        </SafeAreaProvider>
			
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);