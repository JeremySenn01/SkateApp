import * as firebase from "firebase";

export class DBHelper {

    static getLearnTrickList() {
        return firebase.database().ref('learnTrickList').once('value').then(snapshot => {
            return Object.values(snapshot.val());
        }).catch(e => {
            return []
        });
    }

    static insertNewLearnTrick(trick) {
        return firebase.database().ref("learnTrickList/" + trick.id).set(trick).then(r => {
            return this.getLearnTrickList()
        });
    }

    static deleteTrickFromLearnTrickList(trick) {
        console.log("delete trick: ", trick);
        return firebase.database().ref('learnTrickList/' + trick).remove();
    }

    static insertIntoMyTricks(trick) {
        return firebase.database().ref("myTricks/" + trick.id).set(trick);
    }

    static updateMyTrick(trick) {
        return firebase.database().ref("myTricks/" + trick.id).update(trick)
    }

    static getMyTricks() {
        return firebase.database().ref('myTricks').once('value').then(snapshot => {
            return Object.values(snapshot.val());
        }).catch(e => {
            return []
        });
    }
}