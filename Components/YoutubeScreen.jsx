import React from "react";
import {ActivityIndicator, ScrollView, Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DBHelper} from "../Helpers/DBHelper";
import SettingsHelper from "../Helpers/SettingsHelper";
import YoutubeAPIHelper from "../Helpers/YoutubeAPIHelper";
import WebView from "react-native-webview";
import {Button} from "react-native-elements";

const defaultSettings = SettingsHelper.getDefaultSettings();

export default class YoutubeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: defaultSettings,
            videoIds: [],
            isLoading: true,
            error: ""
        }
    }

    static navigationOptions = ({navigation}) => {
        let trick = navigation.state.params.trick;
        return {
            headerTitle: trick.name,
            headerRight: () => <Icon name={"ios-settings"}
                                     size={30}
                                     style={{paddingRight: 10}}
                                     onPress={() => {
                                         navigation.navigate("Settings", {settings: navigation.getParam('settings')})
                                     }}
            />
        }
    };

    subscribe = this.props.navigation.addListener('didFocus', () => {
            this.setState({isLoading: true});
            //Get Settings From DB
            this.getSettingsFromDB()
                //Trigger Youtube search
                .then(() => {
                    this.handleSearchVideos()
                })
    });

    getSettingsFromDB = async () => {
        let settings = await DBHelper.getSettings();
        if (settings) {
            this.setState({settings});
            this.props.navigation.setParams({settings});
        } else {
            DBHelper.saveSettings(defaultSettings).then(() => {
                this.props.navigation.setParams({settings: defaultSettings});
            })
        }
    };

    handleSearchVideos = () => {
        let keyword = this.props.navigation.state.params.trick.name;
        let settings = this.state.settings;

        YoutubeAPIHelper.executeSearchByKeyword(keyword, settings).then((data) => {
            //Found results
            if (data.items && data.items.length > 0) {
                let videoIds = data.items.map(item => item.id.videoId);
                this.setState({videoIds, isLoading: false, error: ""});
            }
            //No results found
            else {
                this.setState({error: `Oops! Couldn't find any videos for this trick: '${keyword}'`, isLoading: false})
            }
        }).catch(e => {
            console.log("error: ", e)
        })
    };

    render() {
        const hasError = this.state.error !== "";
        const showVideos = !hasError && !this.state.isLoading;
        const showActivityIndicator = !hasError && this.state.isLoading;
        return (
            <View style={styles.container}>
                {hasError && <View style={styles.errorContainer}>
                    <Text style={styles.error}>{this.state.error}</Text>
                    <Button title={"try again"} onPress={() => this.handleSearchVideos()}/>
                </View>}
                <ActivityIndicator style={styles.activityIndicator} animating={showActivityIndicator} size="large"
                                   color="grey"/>
                {showVideos &&
                <ScrollView style={styles.videoContainer}>
                    {this.state.videoIds.map(videoId => <View key={videoId} style={{height: 200, marginTop: 20}}>
                        <WebView source={{uri: `https://www.youtube.com/embed/${videoId}`}}/>
                    </View>)}
                </ScrollView>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center"
    },
    activityIndicator: {
        flex: 1,
        alignSelf: "center"
    },
    error: {
        color: "white",
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 20
    },
    errorContainer: {
        alignSelf: "stretch",
        backgroundColor: "red",
    },
    videoContainer: {
        alignContent: "center"
    }
});