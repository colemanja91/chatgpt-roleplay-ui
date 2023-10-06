import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import PlayTtsButton from './PlayTtsButton';

export default function MessageCard({ id, role, content, ttsFilePath, avatarUrl }) {
  return (
    <div key={id}>
      <Divider />
      <Card 
        variant="soft" 
        color={role === "user" ? "primary" : "success"}
        sx={{ textAlign: "right" }}
      >
        <CardContent>
          {ttsFilePath ? (<PlayTtsButton ttsFilePath={ttsFilePath} />) : (null)}
          <Typography>{content}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}
