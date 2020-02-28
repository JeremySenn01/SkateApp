import React from "react";
import {View, StyleSheet, Text, ActivityIndicator, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import {Divider, Image} from "react-native-elements";
import Video from 'react-native-video';

export default class TrickScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {trick: {}, clips: []};
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
                    let clips = this.state.clips;
                    clips.push(r);
                    this.setState({clips})
                }
            })
        });
    };

    componentDidMount = () => {
        //request permission
        this.props.navigation.setParams({openCameraRoll: this.handleOpenImageLibrary});

        //Read trick
        const trick = {
            id: 1,
            name: "Ollie North",
            steeze: 1,
            since: "2020-02-02",
        };

        this.setState({trick: trick})
    };

    videoError = () => {
        console.log("error");
    };

    onBuffer = () => {
        console.log("buffer");
    };

    render() {
        let {navigate} = this.props.navigation;
        return (
            <View>
                <View>
                    <View style={styles.trickInfoContainer}><Text>Some info, idk...</Text></View>
                </View>
                <Divider/>
                <ScrollView>
                    {this.state.clips.map(clip => {
                        return (
                            <View key={clip.uri} style={styles.mediaContainer}>
                                {clip.type === "image" && <Image source={{uri: clip.uri}}
                                                                 style={{width: 300, height: 300, marginBottom: 5}}
                                                                 PlaceholderContent={<ActivityIndicator/>}
                                />}
                                {clip.type === "video" &&
                                <Video source={{uri: clip.uri}}
                                       ref={(ref) => {
                                           this.player = ref
                                       }}

                                       onBuffer={this.onBuffer}
                                       onError={this.videoError}
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
        marginBottom: 5
    }
});