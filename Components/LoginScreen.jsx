import React from "react";
import {Text, View, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {Input, Button} from 'react-native-elements';
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "test.test@hotmail.com",
            password: "123456",
            emailError: "",
            passwordError: "",
            loginError: ""
        }
    }

    unsubscribe = this.props.navigation.addListener('didBlur', () => {
        //Save clips by updating trick
        this.setState({loginError: "", passwordError: "", emailError: ""});
    });

    loginUser = () => {
        const {navigate} = this.props.navigation;
        const {email, password} = this.state;
        if (email !== "" && password !== "") {
            firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                console.log("logged in...");
                //Redirect
                navigate("LearnNewTricks")

            }).catch((err) => {
                this.setState({loginError: err.message})
            })
        } else {
            this.handleInvalidCredentials();
        }
    };

    createUser = () => {
        const {navigate} = this.props.navigation;
        const {email, password} = this.state;
        if (email !== "" && password !== "") {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                console.log("Created user...");
                //Redirect
                navigate("LearnNewTricks")

            }).catch((err) => {
                    this.setState({loginError: err.message})
                }
            )
        } else {
            this.handleInvalidCredentials();
        }
    };

    handleInvalidCredentials = () => {
        const {email, password} = this.state;
        let emailError = "";
        let passwordError = "";
        if (email === "") {
            emailError = "Email is invalid"
        }
        if (password === "") {
            passwordError = "Password is invalid"
        }
        this.setState({emailError, passwordError})
    };

    render() {
        return (
            <View style={styles.loginContainer}>
                <View>
                    <View>

                        <Input
                            placeholder='email@address.com'
                            label="Your email address"
                            errorMessage={this.state.emailError}
                            keyboardType={"email-address"}
                            leftIcon={
                                <Icon
                                    name='ios-mail'
                                    size={24}
                                    color='black'
                                />
                            }
                            leftIconContainerStyle={{marginRight: 15}}
                            onChangeText={(value) => this.setState({email: value})}
                        />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Input
                            placeholder='Password'
                            label="Your password"
                            textContentType={"password"}
                            errorMessage={this.state.passwordError}
                            leftIcon={
                                <Icon
                                    name='ios-lock'
                                    size={24}
                                    color='black'
                                />
                            }
                            leftIconContainerStyle={{marginRight: 15}}
                            onChangeText={(value) => this.setState({password: value})}
                        />
                    </View>
                    <Text style={styles.errorText}>{this.state.loginError}</Text>
                </View>
                <View>
                    <Button title="Log in"
                            style={{marginBottom: 5}}
                            type="solid"
                            onPress={() => this.loginUser()}/>
                    <Button title="Register account"
                            type="outline"
                            onPress={() => this.createUser()}/>
                </View>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({
        // inputContainer: {},
        loginContainer: {
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
            width: "90%",
        },
        errorText: {
            color: "red"
        }
    });