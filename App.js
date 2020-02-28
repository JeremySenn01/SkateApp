import React, {Component} from "react";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import * as firebase from 'firebase';
import SkateScreen from "./Components/SkateScreen";
import LearnNewTricksScreen from "./Components/LernNewTricksScreen";
import MyTricksScreen from "./Components/MyTricksScreen";
import {createDrawerNavigator} from "react-navigation-drawer";
import TrickScreen from "./Components/TrickScreen";
import SkateGameScreen from "./Components/SkateGameScreen";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCH1gqPwukDqqEO6vGSco_QH5D-plEK2bw",
    authDomain: "",
    databaseURL: "https://skateapp-23fec.firebaseio.com/",
    storageBucket: ""
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const SkateStack = createStackNavigator({
    SkateHome: SkateScreen,
    SkateGame: SkateGameScreen
});

const LearnNewTricksStack = createStackNavigator({
    LearnTricks: LearnNewTricksScreen
});

const MyTricksStack = createStackNavigator({
    MyTricks: MyTricksScreen,
    Trick: TrickScreen
});

const DrawerNavigator = createDrawerNavigator({
    LearnNewTicks: {
        screen: LearnNewTricksStack,
        navigationOptions: {
            title: "Learn new tricks"
        }
    },
    MyTricks: {
        screen: MyTricksStack,
        navigationOptions: {
            title: "My Tricks"
        }
    },
    Skate: {
        screen: SkateStack,
        navigationOptions: {
            title: "S.k.a.t.e"
        },
    },
});

const AppContainer = createAppContainer(DrawerNavigator);

export default class App extends Component {

    render() {
        return (
            <AppContainer/>
        );
    }

}
