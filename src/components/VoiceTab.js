import React, { useState } from 'react';
import Voice from './Voice';
import SelectVoice from './SelectVoice';

export default function VoiceTab() {
  const [activeVoiceId, setActiveVoiceId] = useState(null);
  return (
    <div>
      <div>
        <SelectVoice activeVoiceId={activeVoiceId} setActiveVoiceId={setActiveVoiceId} />
      </div>
      <div>
        <Voice id={activeVoiceId} setActiveVoiceId={setActiveVoiceId} />
      </div>
    </div>
  );
};
