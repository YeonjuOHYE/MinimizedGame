import firebase from "firebase";
import firebaseConfig from "./firebase.key";

firebase.initializeApp(firebaseConfig);

class api {
  constructor() {
    this.auth = firebase.auth();
    this.provider = {
      google: new firebase.auth.GoogleAuthProvider()
    };
    firebase.auth().languageCode = "kr_KR";

    this.db = firebase.firestore();
  }

  async getUser(email) {
    try {
      const doc = await this.db
        .collection("test")
        .doc(email)
        .get();
      if (doc.exists) {
        return doc.data();
      } else {
        throw new Error("not found user by name");
      }
    } catch (e) {
      throw e;
    }
  }
}

const instance = new api();
Object.freeze(instance);

export default instance;
