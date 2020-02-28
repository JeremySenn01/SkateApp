import React from "react";
import {Button, ScrollView, Text, View} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {ListItem} from "react-native-elements";
import DateHelper from "../Helpers/DateHelper";
import {DBHelper} from "../Helpers/DBHelper";

export default class MyTricksScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tricks: []}
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'My Tricks',
            headerLeft: () => <Icon name={"ios-menu"} style={{paddingLeft: 10}} size={35} color="grey"
                                    onPress={() => navigation.openDrawer()}/>
        }
    };

    componentDidMount = async () => {
        //Read tricks
        const tricks = await DBHelper.getMyTricks();
        this.setState({tricks: tricks})
    };

    didFocusSubscription = this.props.navigation.addListener(
        'didFocus',
        payload => {
            DBHelper.getMyTricks().then((tricks) => this.setState({tricks: tricks}));

        }
    );

    getListItems = () => {
        const {navigate} = this.props.navigation;
        return this.state.tricks.map(trick => {
            return (
                <ListItem key={trick.id}
                          leftElement={<Text>(vid)</Text>}
                          rightSubtitle={"steeze: " + trick.steeze}
                          title={trick.name}
                          subtitle={DateHelper.getDurationSinceDate(trick.since)}
                          chevron
                          onPress={() => {
                              navigate("Trick", {trick})
                          }}
                />
            );
        })
    };

    render() {
        let {navigate} = this.props.navigation;
        let listItems = this.getListItems();
        return (
            <View>
                <ScrollView>
                    {listItems}
                </ScrollView>
            </View>
        );
    }
}