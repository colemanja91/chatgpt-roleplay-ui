import * as React from 'react';
import { useState } from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

import CharacterTab from './CharacterTab';
import MessagesTab from './MessagesTab';
import VoiceTab from './VoiceTab';
import SessionTab from './SessionTab';

export default function TabSet() {
  const [activeCharacterId, setActiveCharacterId] = useState(null);

  return (
    <Tabs aria-label="Basic tabs" orientation="horizontal" defaultValue={0} size="lg">
      <TabList size="lg" variant="solid" sticky="top">
        <Tab variant="solid">Voices</Tab>
        <Tab variant="solid">Character</Tab>
        <Tab variant="solid">Messages</Tab>
        <Tab variant="solid">Insults</Tab>
      </TabList>
      <TabPanel value={0} size="lg" sx={{width: 600}}>
        <VoiceTab />
      </TabPanel>
      <TabPanel value={1} size="lg" sx={{width: 600}}>
        <CharacterTab activeCharacterId={activeCharacterId} setActiveCharacterId={setActiveCharacterId} />
      </TabPanel>
      <TabPanel value={2} size="lg" sx={{width: 600}}>
       <MessagesTab activeCharacterId={activeCharacterId} />
      </TabPanel>
      <TabPanel value={3} size="lg" sx={{width: 600}}>
       <SessionTab />
      </TabPanel>
    </Tabs>
  )
};