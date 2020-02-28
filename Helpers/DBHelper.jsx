import * as firebase from "firebase";

export class DBHelper {

    static getLearnTrickList() {
        return firebase.database().ref('learnTrickList').once('value').then(snapshot => {
           console.log("[selected 'learnTrickList' values...]");
           return Object.values(snapshot.val());
        }).catch(e => {
            console.log("e: ", e);
            return []
        });
    }

    static insertNewLearnTrick(trick) {
        return firebase.database().ref("learnTrickList/"+trick.id).set(trick).then(r => {
            return this.getLearnTrickList()
        });

    }

    static deleteTrickFromLearnTrickList(trick) {
        console.log("delete trick: ", trick)
        return firebase.database().ref('learnTrickList/'+trick).remove();
    }

    static getMyTricks() {
        return this.getLearnTrickList();
    }
}