import React from "react";

function chooseFirstLetter(name) {
    if (!name) {
        return "";
    }
    let letterOne = name[0];
    let letterTwo = "";
    let splitName = name.split(" ");
    if (splitName.length > 1) {
        letterTwo = splitName[1][0];
    }
    return letterOne + letterTwo;
}


const Avatar = ({ className = "", imgClass="", username, src }) => {
    let letter = chooseFirstLetter(username)

    function handleErrorImage(e){
        let avatarRoot = e.target.parentNode
        avatarRoot.innerHTML = `
			<span class="rounded-full bg-dark-600/50 w-9 h-9 flex items-center text-sm font-medium justify-center uppercase ${imgClass}">${chooseFirstLetter(username)}</span>
		`
    }

    return (
        <div className={className + " text-white"}>
            {src
                ? <div className="avatar-root">
                    <img onError={handleErrorImage} src={src} alt="avatar" className={`rounded-full w-full ${imgClass}`}/>
                </div>
                : <div className={`rounded-full bg-dark-600/50 w-9 h-9 flex items-center justify-center uppercase ${imgClass}`}>{letter}</div>
            }
        </div>
    );
};

export default Avatar;
