import * as firebase from "firebase";

export class DBHelper {

    static getLearnTrickList() {
        return firebase.database().ref(firebase.auth().currentUser.uid + '/learnTrickList').once('value').then(snapshot => {
            return Object.values(snapshot.val());
        }).catch(e => {
            return []
        });
    }

    static insertNewLearnTrick(trick) {
        return firebase.database().ref(firebase.auth().currentUser.uid + "/learnTrickList/" + trick.id).set(trick).then(r => {
            return this.getLearnTrickList()
        });
    }

    static deleteTrickFromLearnTrickList(trick) {
        console.log("delete trick: ", trick);
        return firebase.database().ref(firebase.auth().currentUser.uid + '/learnTrickList/' + trick).remove();
    }

    static insertIntoMyTricks(trick) {
        return firebase.database().ref(firebase.auth().currentUser.uid + "/myTricks/" + trick.id).set(trick);
    }

    static updateMyTrick(trick) {
        return firebase.database().ref(firebase.auth().currentUser.uid + "/myTricks/" + trick.id).update(trick)
    }

    static getMyTricks() {
        return firebase.database().ref(firebase.auth().currentUser.uid + '/myTricks').once('value').then(snapshot => {
            return Object.values(snapshot.val());
        }).catch(e => {
            return []
        });
    }

    static getSettings() {
        return firebase.database().ref(firebase.auth().currentUser.uid + "/settings").once("value").then(snapshot => {
            if (snapshot !== null && snapshot.val() !== null) {
                return snapshot.val()
            }
            return null;
        }).catch(error => {
            console.log("Couldn't get Settings: ", error);
        })
    }

    static saveSettings(settings) {
        console.log("saving settings: ", settings);
        return firebase.database().ref(firebase.auth().currentUser.uid + "/settings").set(settings).then(r => console.log("saved settings.", r));
    }

    static deleteSettings() {
        return firebase.database().ref(firebase.auth().currentUser.uid + "/settings").remove();
    }
}