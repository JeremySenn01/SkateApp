import React from "react";
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import {Divider, Image} from "react-native-elements";
import {Video} from "expo-av";
import {DBHelper} from "../Helpers/DBHelper";

export default class TrickScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            trick: {
                clips: []
            }
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: navigation.state.params.trick.name,
            headerRight: () => <Icon name={"ios-albums"}
                                     size={30}
                                     color={"grey"}
                                     style={{paddingRight: 10}}
                                     onPress={
                                         navigation.getParam('openCameraRoll')
                                     }
            />
        }
    };

    handleOpenImageLibrary = () => {
        ImagePicker.requestCameraRollPermissionsAsync().then(r => {
            ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsMultipleSelection: true
            }).then(r => {
                if (!r.cancelled) {
                    let trick = this.state.trick;
                    let clips = trick.clips || [];
                    clips.push(r);
                    this.setState({trick})
                }
            })
        });
    };

    updateTrick = (trick) => {
        DBHelper.updateMyTrick(trick).then(() => console.log("updated the trick..."));
    };

    unsubscribe = this.props.navigation.addListener('didBlur', () => {
        //Save clips by updating trick
        this.updateTrick(this.state.trick);
    });

    componentDidMount = () => {
        //request permission
        this.props.navigation.setParams({openCameraRoll: this.handleOpenImageLibrary});

        //Read trick
        let trick;
        if (!this.props.navigation.state.params.trick.clips) {
            trick = {...this.props.navigation.state.params.trick, clips: []}
        } else {
            trick = this.props.navigation.state.params.trick;
        }

        this.setState({trick: trick})
    };

    render() {
        let {navigate} = this.props.navigation;
        return (
            <View>
                <ScrollView>
                    {this.state.trick.clips && this.state.trick.clips.map(clip => {
                        return (
                            <View key={clip.uri} style={styles.mediaContainer}>
                                {clip.type === "image" &&
                                <Image source={{uri: clip.uri}}
                                       style={{width: 350, height: 350}}
                                       PlaceholderContent={<ActivityIndicator/>}

                                />}
                                {clip.type === "video" &&
                                <Video
                                    source={{uri: clip.uri}}
                                    rate={1.0}
                                    volume={1.0}
                                    muted={false}
                                    resizeMode="contain"
                                    useNativeControls
                                    style={{width: 350, height: 350}}
                                />}
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    trickInfoContainer: {
        height: 100,
        width: "90%",
        borderWidth: 3,
        borderColor: "grey",
        marginLeft: 20,
        marginTop: 10
    },
    mediaContainer: {
        marginBottom: 5,
        width: "100%",
        flex: 1,
        alignItems: "center"
    }
});