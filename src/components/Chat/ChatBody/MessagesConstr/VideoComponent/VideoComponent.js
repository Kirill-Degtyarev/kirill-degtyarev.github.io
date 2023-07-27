import React, { useState } from 'react';
import SvgGenerator from '../../../../../svgGenerator/SvgGenerator';

import styles from './VideoComponent.module.scss';
const VideoComponent = ({ id, src }) => {
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [soundMuted, setSoundMuted] = useState(true);
  const [currentVideoTime, setCurrentVideoTime] = useState('0:00');
  const [fullTime, setFullTime] = useState('');

  const playVideo = (id) => {
    const video = document.getElementById(`${id}`);
    if (video.paused) {
      setVideoPlayed(true);
      video.play();
    } else {
      setVideoPlayed(false);
      video.pause();
    }
  };

  const getTime = (time) => {
    let currentTime;
    let h = Math.floor(time / (60 * 60)),
      dm = time % (60 * 60),
      m = Math.floor(dm / 60),
      ds = dm % 60,
      s = Math.ceil(ds);
    if (s === 60) {
      s = 0;
      m = m + 1;
    }
    if (s < 10) {
      s = '0' + s;
    }
    if (m === 60) {
      m = 0;
      h = h + 1;
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (h === 0) {
      currentTime = m + ':' + s;
    } else {
      currentTime = h + ':' + m + ':' + s;
    }
    return currentTime;
  };

  return (
    <div className={styles['message-body__video']}>
      <div className={styles['message-body__video-time']}>
        {currentVideoTime + '/' + fullTime}
      </div>
      <div
        className={styles['message-body__video-sound']}
        onClick={() => {
          setSoundMuted(!soundMuted);
        }}
      >
        <SvgGenerator id={soundMuted ? 'sound-muted' : 'sound-on'} />
      </div>
      <video
        src={src}
        id={id}
        onTimeUpdate={(e) => {
          setCurrentVideoTime(getTime(e.target.currentTime));
        }}
        onLoadedMetadata={(e) => {
          setFullTime(getTime(e.target.duration));
        }}
        onEnded={(e) => {
          e.target.currentTime = 0;
          setCurrentVideoTime('0:00');
          setVideoPlayed(false);
        }}
        muted={soundMuted}
      ></video>
      <div
        className={styles['message-body__video-play']}
        onClick={() => {
          playVideo(src);
        }}
      >
        <SvgGenerator id={videoPlayed ? 'pause' : 'play'} />
      </div>
    </div>
  );
};

export default VideoComponent;
