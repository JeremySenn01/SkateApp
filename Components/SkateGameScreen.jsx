import React from "react";
import {Button, StyleSheet, Text, View} from 'react-native';
import {ButtonGroup} from "react-native-elements";

export default class SkateGameScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            letters1: 0,
            letters2: 0,
            player1: this.props.navigation.state.params.player1,
            player2: this.props.navigation.state.params.player2,
            nextTrick: null
        }
    }

    static navigationOptions = {
        headerTitle: 'Game of Skate',
    };

    getLetters = (playerNr) => {
        const word = "SKATE";
        let letters = word.split("");
        let playerScore;
        if (playerNr === 1) {
            playerScore = this.state.letters1;
        } else {
            playerScore = this.state.letters2;
        }

        console.log(playerScore);

        return <View style={styles.playerContainer}>
            {letters.map((letter, index) => {
                    const playerHasLetter = playerScore - 1 >= index;
                    return (
                        <Text key={letter + playerNr} style={{
                            padding: 20,
                            fontSize: 30,
                            backgroundColor: playerHasLetter ? "rgba(255, 0, 0, 0.8)" : "white",
                            color: playerHasLetter ? "white" : "grey",
                            borderColor: playerHasLetter ? "black" : "grey",
                            borderWidth: 3,
                            borderRadius: 23,
                            lineHeight: 15,
                            overflow: "hidden",
                            opacity: playerHasLetter ? 1 : 0.4
                        }}>{letter}</Text>
                    )
                }
            )}
        </View>
    };

    handleButtonClicked = (player) => {
        if (player === 0) {
            console.log("player: ", player);
            this.setState({letters1: this.state.letters1+1})
        } else {
            console.log("player: ", player);
            this.setState({letters2: this.state.letters2+1

            })
        }
    };

    render() {
        let buttons = [this.state.player1, this.state.player2];
        let {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View>
                    <View>
                        <Text style={styles.playerLabel}>{this.state.player1}</Text>
                        {this.getLetters(1)}
                    </View>
                    <View>
                        <Text style={styles.playerLabel}>{this.state.player2}</Text>
                        {this.getLetters(2)}
                    </View>
                </View>
                <View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>Who fucked up?</Text>
                    </View>
                    <ButtonGroup
                        onPress={(player) => this.handleButtonClicked(player)}
                        selectedIndex={-1}
                        buttons={buttons}
                        containerStyle={{height: 100, borderRadius: 50}}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    playerContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 80
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15
    },
    playerLabel: {
        fontSize: 30,
        marginBottom: 35,
    },
    labelContainer: {
        alignSelf: "center"
    },
    labelText: {
        fontSize: 30
    }
});