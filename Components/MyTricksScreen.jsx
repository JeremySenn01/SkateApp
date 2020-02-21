import React from "react";
import {Button, View} from 'react-native';

export default class MyTricksScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: 'My Tricks'
    };

    render() {
        let {navigate} = this.props.navigation;
        return (
            <View>

            </View>
        );
    }
}