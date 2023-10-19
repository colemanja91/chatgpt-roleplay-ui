import React from "react";

export default function PlayTtsButton({ ttsFilePath, ended }) {
  return (
    <audio src={`shared_data/${ttsFilePath}`} type="audio/mp3" controls autoplay="true" ended={ended}></audio>
  )
}
