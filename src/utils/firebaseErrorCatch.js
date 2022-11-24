
function firebaseErrorCatch(code){
    let message = "Internal Error. Please try again"
    if(!code || typeof code !== "string"){
        message = "Internal Error. Please try again"
    }
    else  if(code.includes("network-request-failed")){
        message = "Please Check your internet connection"

    } else if (code === "auth/wrong-password") {
        message = "Your password is incorrect";

    } else if (code.includes("missing-email")) {
        message = "You are not registered, Please registration";

    } else if (code === "auth/user-not-found") {
        message = "You are not registered";
    } else if (code === "auth/email-already-in-use") {
        message = "This email is already Registered."
    }

    return message
}


export default firebaseErrorCatch