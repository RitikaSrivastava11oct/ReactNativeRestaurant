import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import ContactUs from './ContactUsComponent';
import AboutUs from './AboutUsComponent';
import { View , Platform} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';



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
	navigationOptions :{
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
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  
      ,
      headerLeft: <Icon name="menu" size={24}
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />    
    })
});

const AboutUsNavigator = createStackNavigator({
  AboutUs: { screen: AboutUs }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  
    ,
    headerLeft: <Icon name="menu" size={24}
                      color= 'white'
                      onPress={ () => navigation.toggleDrawer() } />    
  })
});

const ContactUsNavigator = createStackNavigator({
  ContactUs: { screen: ContactUs }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#fff"
    },
    headerTitleStyle: {
        color: "#512DA8"            
    },
    headerTintColor: "#fff"  
    ,
    headerLeft: <Icon name="menu" size={24}
                      color= 'white'
                      onPress={ () => navigation.toggleDrawer() } />    
    
  })
});

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon : ({ tintColor }) =>{
            <Icon 
              name = 'home' 
              type = 'font-awesome'
              size = {24}
              color = { tintColor }/>
          }
        }
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon : ({ tintColor }) =>{
            <Icon 
              name =  'list'
              type = 'font-awesome'
              size = {24}
              color = { tintColor }/>
          }
        }, 
      },
      AboutUs: 
      { screen: AboutUsNavigator,
        navigationOptions: {
          title: 'AboutUs',
          drawerLabel: 'AboutUs',
          drawerIcon : ({ tintColor }) =>{
            <Icon 
              name = 'info-circle'
              type = 'font-awesome'
              size = {24}
              color = { tintColor }/>
          }
        }, 
      },
      ContactUs: 
      { screen: ContactUsNavigator,
        navigationOptions: {
          title: 'ContactUs',
          drawerLabel: 'ContactUs',
          drawerIcon : ({ tintColor }) =>{
            <Icon 
              name = 'address-card'
              type = 'font-awesome'
              size = {22}
              color = { tintColor }/>
          }
        }, 
      }
}, {
  drawerBackgroundColor: '#D1C4E9'
});

const App = createAppContainer(MainNavigator);

class Main extends Component {

  async obtainCalendarPermission () {
    const calenderPermission = await Permissions.askAsync(Permissions.CALENDAR);
    if (calenderPermission.status === 'granted' ) {
        console.log('Permission for calender Event granted');
        return calenderPermission;
    }
    else{
        Alert.alert('Permission not granted to show notifications');
        console.log('Permission for calender Event Not granted');
    }

}

async addReservationToCalendar(date) {
    console.log('999999999999999999999');
    await this.obtainCalendarPermission();
    Calendar.createEventAsync('Calendar.DEFAULT',{
        title : 'Con Fusion Table Reservation',
        startDate :new Date(Date.parse(date)),
        endDate : new Date(Date.parse(date)+2*60*60*1000),
        timeZone : 'Asia/Hong_Kong',
        location : '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'

    });
    console.log('11111111111111111111111');
}

	render() {		
		return (
				<View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}> 
					<App/>
				</View>
			
		);
	}
}

export default Main;


<DatePicker
style={{flex: 2, marginRight: 20}}
date={this.state.date}
format=''
mode="datetime"
placeholder="select date and Time"
minDate="2017-01-01"
confirmBtnText="Confirm"
cancelBtnText="Cancel"
customStyles={{
dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0
},
dateInput: {
    marginLeft: 36
}
}}
onDateChange={(date) => {this.setState({date: date})}}
/>


