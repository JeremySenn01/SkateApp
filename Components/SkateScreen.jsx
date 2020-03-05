import React from "react";
import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

export default class SkateScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            player1: "",
            player2: "",
            error1: "",
            error2: ""
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Game of Skate',
            headerLeft: () => <Icon name={"ios-menu"}
                                    style={{paddingLeft: 10}}
                                    size={35} color="grey"
                                    onPress={() => navigation.openDrawer()}
            />
        }
    };

    startGame = () => {
        const {navigate} = this.props.navigation;
        if (this.state.player1 !== "" && this.state.player2 !== "") {

            navigate("SkateGame", {
                player1: this.state.player1,
                player2: this.state.player2
            })
        } else {
            let error1 = "";
            let error2 = "";
            if (this.state.player1 === "") {
                error1 = "Please enter a name";
            }
            if (this.state.player2 === "") {
                error2 = "Please enter a name";
            }
            this.setState({error1, error2})
        }
    };

    render() {
        let {navigate} = this.props.navigation;
        return (
            <KeyboardAvoidingView style={styles.inputContainer}>
                <View>
                    <View style={styles.input}>
                        <Input placeholder={"Name of player 1"}
                               label={"Player 1"}
                               onChangeText={(value) => this.setState({player1: value, error1: ""})}
                               keyboardAppearance={"dark"}
                               value={this.state.player1}
                               errorMessage={this.state.error1}
                        />
                    </View>
                    <View style={styles.input}>
                        <Input placeholder={"Name of player 2"}
                               label={"Player 2"}
                               onChangeText={(value) => this.setState({player2: value, error2: ""})}
                               keyboardAppearance={"dark"}
                               value={this.state.player2}
                               errorMessage={this.state.error2}
                        />
                    </View>
                    {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
                    <View>
                        <Button style={styles.button} title={"Start Game"} onPress={() => this.startGame()}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
    },
    input: {
        marginBottom: 50,
        marginLeft: 20,
        marginRight: 20
    },
    button: {
        marginLeft: 20,
        marginRight: 20
    }
});