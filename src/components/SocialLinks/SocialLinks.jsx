import React from 'react';
import {FaFacebookF, FaGithub, FaInstagram, FaYoutube} from "react-icons/fa";

const SocialLinks = () => {
    return (
        <div>
            <ul className="flex gap-4 mt-4">
                <a
                    className="hover:bg-primary-400 hover:text-white w-10 h-10 md:w-8 md:h-8 flex justify-center items-center border  border-neutral/30  rounded-box"
                    href="https://www.facebook.com/rasel-mahmud-dev"
                >
                    <FaFacebookF className="text-2xl md:text-lg" />
                </a>
                <a
                    className="hover:bg-primary-400 hover:text-white w-10 h-10 md:w-8 md:h-8 flex justify-center items-center border  border-neutral/30  rounded-box"
                    href="https://github.com/rasel-mahmud-dev"
                    target="_blank"
                >
                    <FaGithub className="text-2xl md:text-lg" />
                </a>{" "}
                <a
                    className="hover:bg-primary-400 hover:text-white w-10 h-10 md:w-8 md:h-8 flex justify-center items-center border  border-neutral/30  rounded-box"
                    href="/client/src/pages"
                >
                    <FaYoutube className="text-xl md:text-lg" />
                </a>
                <a
                    className="hover:bg-primary-400 hover:text-white w-10 h-10 md:w-8 md:h-8 flex justify-center items-center border  border-neutral/30  rounded-box"
                    href="https://www.instagram.com/raselmraju"
                    target="_blank"
                >
                    <FaInstagram className="text-2xl md:text-lg" />
                </a>
            </ul>
        </div>
    );
};

export default SocialLinks;