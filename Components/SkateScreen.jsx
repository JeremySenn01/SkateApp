import React from "react";
import {Button, View} from 'react-native';

export default class SkateScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: 'Play S.k.a.t.e',
    };

    render() {
        let {navigate} = this.props.navigation;
        return (
            <View>

            </View>
        );
    }
}