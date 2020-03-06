import React from "react";
import {Picker, TextInput, View} from 'react-native';
import {ListItem} from "react-native-elements";
import DateHelper from "../Helpers/DateHelper";
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {DBHelper} from "../Helpers/DBHelper";

export default class LearnNewTricksScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tricks: [], checkedTricks: [], newTrickName: "", newTrickSteeze: 1}
    }

    componentDidMount = async () => {

        //Read Tricks here
        const tricks = await DBHelper.getLearnTrickList();
        this.setState({tricks: tricks})
    };

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Learn new Tricks',
            headerLeft: () => <Icon name={"ios-menu"} style={{paddingLeft: 10}} size={35} color="grey"
                                    onPress={() => navigation.openDrawer()}/>
        }
    };

    getListItems = () => {
        return this.state.tricks.map(trick => {
            return (
                <ListItem key={trick.id}
                          title={trick.name}
                          rightTitle={"Steeze: " + trick.steeze}
                          onPress={() => this.handleTrickSelected(trick)}
                          subtitle={DateHelper.getDurationSinceDate(trick.since)}
                          subtitleStyle={{color: "grey"}}
                          checkBox={{
                              checked: this.state.checkedTricks.includes(trick.id),
                              onPress: () => this.handleTrickSelected(trick),
                              checkedColor: "green",
                              uncheckedIcon: "circle-o",
                              checkedIcon: "check-circle-o"
                          }}
                          bottomDivider
                />
            );
        });
    };

    handleTrickSelected = (trick) => {
        let checkedTricks = [...this.state.checkedTricks];

        if (!checkedTricks.includes(trick.id)) {
            checkedTricks.push(trick.id);
        } else {
            let index = checkedTricks.findIndex(t => t === trick.id);
            checkedTricks.splice(index, 1);
        }
        this.setState({checkedTricks: checkedTricks});
    };

    handleDeleteTricks = () => {
        let tricks = this.state.tricks;
        let checkedTricks = [...this.state.checkedTricks];
        let updatedTrickList = tricks.filter(trick => !checkedTricks.includes(trick.id));

        checkedTricks.forEach(t => {
            let trick = tricks.filter(trick => trick.id === t)[0];
            DBHelper.deleteTrickFromLearnTrickList(t).then(() => console.log("deleted ", t)).catch(() => console.log("fehler..."));
            // let insertTrick = {...trick, clips: [{uri: ""}]};
            // console.log("insert trick: ", insertTrick);
            DBHelper.insertIntoMyTricks(trick).then(p => console.log("inserted..."));
        });

        this.setState({tricks: updatedTrickList, checkedTricks: []});
    };

    addTrick = async (e) => {

        if (e && e.nativeEvent.text !== "") {
            let newTrick = {
                id: Math.floor(Math.random() * 100000) + 1,
                name: e.nativeEvent.text,
                since: new Date().toISOString(),
                steeze: this.state.newTrickSteeze
            };
            console.log("new Trick: ", newTrick);
            let tricks = await DBHelper.insertNewLearnTrick(newTrick);
            this.setState({tricks: tricks, newTrickSteeze: 1})
        }
    };

    getJSXSteezePicker = () => {
        return <View><Picker
            onValueChange={(value) => this.setState({newTrickSteeze: value})}
            selectedValue={this.state.newTrickSteeze}
            itemStyle={{height: 100, width: 100}}
        >
            <Picker.Item key={1} label={"1"} value={1}/>
            <Picker.Item key={2} label={"2"} value={2}/>
            <Picker.Item key={3} label={"3"} value={3}/>
        </Picker></View>
    };

    render() {
        let {navigate} = this.props.navigation;
        let listItems = this.getListItems();
        return (
            <KeyboardAwareScrollView>
                <View>
                    {this.state.tricks.length > 0 && listItems}
                    {this.state.checkedTricks.length === 0 &&
                    <ListItem key={Math.floor(Math.random() * 10000) + 1}
                              rightElement={() => this.getJSXSteezePicker()}
                              titleStyle={{color: "grey", fontSize: 25}}
                              leftIcon={<Icon name="ios-add" size={50} color={"grey"}/>}
                              onPress={() => this.addTrick()}
                              title={<TextInput onEndEditing={(e) => this.addTrick(e)}
                                                placeholder={"Add a trick..."}
                                                style={{padding: 20}}
                              />}
                    />
                    }
                    {this.state.checkedTricks.length > 0 &&
                    <ListItem leftIcon={<Icon name="ios-checkmark" size={50} color="white"/>}
                              onPress={() => this.handleDeleteTricks()}
                              title={"Trick is completed"}
                              titleStyle={{color: "white", fontSize: 25}}
                              containerStyle={{backgroundColor: "green"}}
                    />}
                </View>
            </KeyboardAwareScrollView>

        );
    }
}