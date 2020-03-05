import React from "react";
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Button, ButtonGroup, Overlay} from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import {DeviceMotion} from 'expo-sensors';
import {DBHelper} from "../Helpers/DBHelper";

export default class SkateGameScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            letters1: 0,
            letters2: 0,
            player1: this.props.navigation.state.params.player1,
            player2: this.props.navigation.state.params.player2,
            showingAlert: null,
            allTricks: [],
            winner: undefined,
            showOverlay: false,
            showInitialOverlay: false,
            beginnerPlayerName: ""
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Game of Skate',
            headerRight: () => <Icon name={"ios-refresh"}
                                     size={30}
                                     color={"grey"}
                                     style={{paddingRight: 20}}
                                     onPress={
                                         navigation.getParam('restartGame')
                                     }
            />
        }
    };

    componentDidMount = () => {
        this.toggleSubscription();
        this.chooseBeginnerPLayer();

        this.props.navigation.setParams({restartGame: this.restartGame});

        DBHelper.getMyTricks().then(allTricks => {
            this.setState({allTricks: allTricks});
        })
    };

    componentWillUnmount() {
        this.unsubscribe()
    }

    toggleSubscription = () => {
        if (this.subscription) {
            this.unsubscribe();
        } else {
            this.subscribe();
        }
    };

    subscribe = () => {
        this.subscription = DeviceMotion.addListener(motionData => {
            if (!this.state.showingAlert && (motionData.acceleration.x > 20 ||
                motionData.acceleration.x < -20 ||
                motionData.acceleration.y > 20 ||
                motionData.acceleration.y < -20 ||
                motionData.acceleration.z > 20 ||
                motionData.acceleration.z < -20)) {
                this.setState({showingAlert: true}, () => this.getRandomTrick());
            }
        });
    };

    unsubscribe = () => {
        this.subscription && this.subscription.remove();
        this.subscription = null;
    };

    chooseBeginnerPLayer = () => {
        let number = Math.round(Math.random());
        let beginnerPlayer = "";
        if (number === 0) {
            beginnerPlayer = this.state.player1;
        } else {
            beginnerPlayer = this.state.player2;
        }
        //Close overlay after 5 seconds
        setTimeout(() => this.setState({showInitialOverlay: false}), 5000);
        this.setState({beginnerPlayer: beginnerPlayer, showInitialOverlay: true});
    };

    getRandomTrick = () => {
        const allTricks = this.state.allTricks;
        let trick = allTricks[Math.floor(Math.random() * allTricks.length)];
        Alert.alert(
            "Do a " + trick.name + "!",
            'This is a trick suggestion',
            [
                {text: 'Challenge accepted', onPress: () => this.setState({showingAlert: false})},
                {text: 'Try other trick', onPress: () => this.getRandomTrick()},
                {text: 'Nope', onPress: () => this.setState({showingAlert: false}), style: 'cancel',},
            ],
            {cancelable: true},
        );
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
            if (this.state.letters1 === 4) {
                this.setState({winner: this.state.player2, showOverlay: true})
            }
            this.setState({letters1: this.state.letters1 + 1})
        } else {

            if (this.state.letters2 === 4) {
                this.setState({winner: this.state.player1, showOverlay: true})
            }
            this.setState({letters2: this.state.letters2 + 1})
        }
    };

    restartGame = () => {
        this.chooseBeginnerPLayer();
        this.setState({letters1: 0, letters2: 0, winner: undefined, showOverlay: false});
    };

    render() {
        let buttons = [this.state.player1, this.state.player2];
        let {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Overlay
                    isVisible={this.state.showOverlay}
                    onBackdropPress={() => this.setState({showOverlay: false})}
                    onRequestClose={() => this.setState({showOverlay: false})}
                    onDismiss={() => this.setState({showOverlay: false})}
                    animated
                    animationType={"slide"}
                >
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <View>
                            <Text style={{fontSize: 30, marginBottom: 100}}>
                                {this.state.winner} Won!
                            </Text>
                            <Button title={"Revenge"} onPress={() => this.restartGame()}/>
                        </View>
                    </View>
                </Overlay>
                <Overlay isVisible={this.state.showInitialOverlay}
                         onBackdropPress={() => this.setState({showInitialOverlay: false})}
                         onRequestClose={() => this.setState({showInitialOverlay: false})}
                         onDismiss={() => this.setState({showInitialOverlay: false})}
                         animated
                         animationType={"slide"}>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <View>
                            <Text style={{fontSize: 30, marginBottom: 100}}>
                                {this.state.beginnerPlayer} shows the first trick!
                            </Text>
                            <Button title={"Start playing"} onPress={() => this.setState({showInitialOverlay: false})}/>
                        </View>
                    </View>
                </Overlay>

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
                        disabled={this.state.winner !== undefined}
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