import {signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";


export function googleSignInAction(auth) {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user)

        })
        .catch((error) => {

        });
}


export function signOutAction(auth) {
        return new Promise(async (resolve, _) => {
            try {
                // await signOut(auth);
                // localStorage.removeItem("token")
                resolve(true);
            } catch (ex) {
                resolve(false)
            }
        });

}



