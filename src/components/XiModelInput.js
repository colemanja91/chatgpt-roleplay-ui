import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Slider from '@mui/joy/Slider';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';

export default function XiModelInput({ formState, setFormState, disabled }) {
  return (
    <AccordionGroup>
      <Accordion disabled={disabled}>
        <AccordionSummary>TTS Config</AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <FormLabel>Voice ID</FormLabel>
            <Input 
              value={formState.xiVoiceId} 
              onChange={(e) =>
                setFormState({
                  ...formState,
                  xiVoiceId: e.target.value
                })} 
            />
          </FormControl>
          <FormControl>
            <FormLabel>Stability</FormLabel>
            <Slider 
              value={formState.xiStability}
              defaultValue={0}
              min={0}
              max={1}
              step={0.01}
              valueLabelDisplay="on"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  xiStability: e.target.value
                })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Similarity Boost</FormLabel>
            <Slider 
              value={formState.xiSimilarityBoost}
              defaultValue={0}
              min={0}
              max={1}
              step={0.01}
              valueLabelDisplay="on"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  xiSimilarityBoost: e.target.value
                })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Style</FormLabel>
            <Slider 
              value={formState.xiStyle}
              defaultValue={0}
              min={0}
              max={1}
              step={0.01}
              valueLabelDisplay="on"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  xiStyle: e.target.value
                })}
            />
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  )
}
