import React from "react";

export default function PlayTtsButton({ ttsFilePath }) {
  return (
    <audio src={`shared_data/${ttsFilePath}`} type="audio/mp3" controls autoplay></audio>
  )
}
