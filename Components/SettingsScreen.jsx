import React from "react";
import {Picker, StyleSheet, Switch, View} from 'react-native';
import {Button, ListItem, Slider} from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import {DBHelper} from "../Helpers/DBHelper";
import SettingsHelper from "../Helpers/SettingsHelper";

const options = SettingsHelper.getOrderOptions();
const defaultSettings = SettingsHelper.getDefaultSettings();

export default class SettingsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: defaultSettings
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "Settings"
        }
    };

    subscribe = this.props.navigation.addListener('didFocus', () => {
        this.receiveSettings();
    });

    receiveSettings = () => {
        let settings = this.props.navigation.state.params.settings;
        this.setState({settings: settings})
    };

    handleApplySettings = async () => {
        await DBHelper.saveSettings(this.state.settings);
        this.props.navigation.navigate("Youtube");
    };

    handleOrderChange = (value) => {
        let settings = {...this.state.settings};
        settings.order = options.find(o => o.key === value);
        this.setState({settings});
    };

    render() {
        return (
            <View>
                <View>
                    <ListItem title={"Order by"}
                              rightElement={<Picker
                                  onValueChange={(value) => this.handleOrderChange(value)}
                                  selectedValue={this.state.settings.order.key}
                                  itemStyle={{height: 100, width: 150}}
                              >
                                  {options.map(item => <Picker.Item key={item.key}
                                                                                      label={item.label}
                                                                                      value={item.key}/>)}
                              </Picker>}
                              leftIcon={<Icon name={"ios-funnel"} size={30}/>}
                              bottomDivider
                    />

                </View>
                <View>
                    <ListItem title={"Safe Search"}
                              subtitle={"hide restricted content"}
                              rightElement={<Switch value={this.state.settings.safeSearch}
                                                    onValueChange={(val) => this.setState({safeSearch: val})}
                              />}
                              leftIcon={<Icon name={"ios-search"} size={30}/>}
                              bottomDivider
                    />
                </View>
                <View>
                    <ListItem title={"Max Search Results"}
                              style={{backgroundColor: "grey"}}
                              leftIcon={null}
                              rightElement={<View
                                  style={{flex: 1, alignItems: "stretch"}}><Slider
                                  value={this.state.settings.maxResults}
                                  onValueChange={(value) => {
                                      this.setState({...this.state.settings.maxResults = value})
                                  }}
                                  minimumValue={5}
                                  maximumValue={30}
                                  step={5}/>
                              </View>}
                              rightSubtitle={this.state.settings.maxResults.toString()}
                    />
                </View>
                <View style={{marginTop: 10}}>
                    <Button onPress={() => this.handleApplySettings()}
                            type={"solid"}
                            title={"Apply settings"}
                            style={{marginTop: 10}}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    settingsContainer: {
        width: "100%",
        flex: 1,
        alignItems: "center"
    },
    label: {
        color: "grey",
        fontWeight: "bold",
    },

});