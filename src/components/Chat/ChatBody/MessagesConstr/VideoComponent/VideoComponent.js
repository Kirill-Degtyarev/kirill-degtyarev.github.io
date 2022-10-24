import React, { useState } from "react";
import SvgGenerator from "../../../../../svgGenerator/SvgGenerator";

import styles from "./VideoComponent.module.css";
const VideoComponent = ({ id, src }) => {
    const [videoPlayed, setVideoPlayed] = useState(false);
    const playVideo = (e, id) => {
        // let buttonVideo = e.currentTarget.cshildNodes[0];
        const video = document.getElementById(`${id}`);
        if (video.paused) {
            setVideoPlayed(true);
            video.play();
        } else {
            setVideoPlayed(false);
            video.pause();
        }
    };
    return (
        <>
            <video src={src} id={id}></video>
            <div
                className={styles["message-body__video-play"]}
                onClick={(e) => {
                    playVideo(e, src);
                }}
            >
                <SvgGenerator id={videoPlayed ? "pause" : "play"} />
            </div>
        </>
    );
};

export default VideoComponent;
