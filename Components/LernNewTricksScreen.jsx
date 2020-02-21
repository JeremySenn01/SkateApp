import React from "react";
import {Button, View} from 'react-native';
import {CheckBox, ListItem} from "react-native-elements";
import {color} from "react-native-reanimated";
import DateHelper from "../Helpers/DateHelper";

export default class LearnNewTricksScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tricks: [], checkedTricks: []}
    }

    componentDidMount = () => {
        //Read Tricks here
        const tricks = [
            {
                id: 1,
                name: "Ollie North",
                steeze: 1,
                since: "2020-02-02",
            },
            {
                id: 2,
                name: "Varial Flip",
                steeze: 2,
                since: "2020-01-02"
            },
            {
                id: 3,
                name: "Tre Flip",
                steeze: 3,
                since: "2020-02-20"

            },
            {
                id: 4,
                name: "Lazer Flip",
                steeze: 3,
                since: "2019-10-13"
            },
            {
                id: 5,
                name: "Boardslide",
                steeze: 2,
                since: "2019-12-30"
            },
        ];
        this.setState({tricks: tricks})
    };

    static navigationOptions = {
        headerTitle: 'Learn new Tricks',
    };

    getListItems = () => {
        let listItems = this.state.tricks.map(trick => {
            return (
                <ListItem key={trick.id}
                          title={trick.name}
                          rightTitle={"Steeze: " + trick.steeze}
                          subtitle={DateHelper.getDurationSinceDate(trick.since)}
                          subtitleStyle={{color: "grey"}}
                          checkBox={() => {
                              return <CheckBox checked={this.state.checkedTricks.includes(trick.id)} onPress={() => {
                                  let checkedTricks = this.state.checkedTricks;
                                  checkedTricks.push(trick.id);
                                  this.setState({checkedTricks: checkedTricks});
                              }}/>
                          }}
                          bottomDivider
                />
            );
        });
        listItems.push(<ListItem key={Math.floor(Math.random() * 10000) + 1}
                                 leftIcon={
                                     <Button title={"New Trick"}
                                             onPress={() => this.addTrick()}
                                             bottomDivider
                                     />}
        />);
        return listItems;
    };

    addTrick = () => {
        let newTrick = {
            id: this.state.tricks.length + 1,
            name: "Trick " + (this.state.tricks.length + 1),
            since: new Date(),
            steeze: Math.floor(Math.random() * 3) + 1
        };
        let tricks = this.state.tricks;
        tricks.push(newTrick);
        this.setState({tricks: tricks})
    };


    render() {
        let {navigate} = this.props.navigation;
        let listItems = this.getListItems();
        return (
            <View>
                {listItems}
            </View>
        );
    }
}