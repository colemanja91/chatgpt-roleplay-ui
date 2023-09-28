import * as React from 'react';
import Character from './Character';
import SelectCharacter from './SelectCharacter';

export default function CharacterTab({ activeCharacterId, setActiveCharacterId }) {
  return (
    <div>
      <div>
        <SelectCharacter activeCharacterId={activeCharacterId} setActiveCharacterId={setActiveCharacterId} />
      </div>
      <div>
        <Character id={activeCharacterId} />
      </div>
    </div>
  );
};
