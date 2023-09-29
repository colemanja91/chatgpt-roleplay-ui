import {React} from 'react';

export default function PlayTtsButton({ ttsFilePath }) {
  return (
    <audio src={`file://${ttsFilePath}`} type="audio/mpeg" controls autoplay></audio>
  )
}
