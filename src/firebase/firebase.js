import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";


const env = import.meta.env

const config = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.VITE_FIREBASE_DB_URL,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MSG_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(config);

export const auth = getAuth(app);

export const signout = () => {
  signOut(auth)

}

export const onUserStateChanged = (fn) => {
  return onAuthStateChanged(auth, fn)
}

export const firestore = getFirestore(app);

export const signIn = async (type = "EMAIL", data) => {
  switch (type) {
    case "EMAIL" : {
      const {email, password} = data
      const sign = await signInWithEmailAndPassword(auth, email, password)
      return sign.user
    }
    case "GOOGLE" : {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        return user
      }).catch(() => {
        return null
      });
    }
  }
}

export const createUserProfileDocument = async (userauth, additionalData) => {
  if (!userauth) return;

  const userRef = doc(firestore, "users", userauth.uid);

  const { displayName, email } = userauth;
  const createdAt = new Date();

  const data = {
    displayName, email, createdAt, ...additionalData
  }
  try{
    await setDoc(userRef, data)
  }catch(err) {
    console.log("something went wrong")
    return
  }

  data.id = userauth.uid

  return data
};

export const getCollectionsList = async (collectionName = "collections") => {
  const collectionRef = collection(firestore, collectionName);
  const snapShot = await getDocs(collectionRef)
  return snapShot.docs
}



export const createUser = async (data) => {
      const { email, password } = data
      try {
        const credential = await createUserWithEmailAndPassword(auth, email, password)
        return credential.user
      } catch (err) {
        // handle
      }
}


export const addCollectionAndDocument = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(firestore, collectionKey);
  const batch = firestore.batch();
  objectToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionSnapshotToMap = (docs) => {
  const transformedCollection = docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};


export default app;
