import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';

import { gql, useMutation } from '@apollo/client';

const CLEAR_MESSAGE_HISTORY = gql`
  mutation ClearMessageHistory($input: ClearMessageHistoryInput!) {
    clearMessageHistory(input: $input) {
      character {
        id
      }
    }
  }
`;

export default function ClearMessageHistoryButton({ activeCharacterId }) {
  const [open, setOpen] = useState(false);
  const [clearMessageHistory] = useMutation(CLEAR_MESSAGE_HISTORY, { 
    refetchQueries: ['GetMessages']
  });

  if (activeCharacterId) {
    return (
      <div>
        <Button
          variant="outlined"
          color="danger"
          onClick={() => setOpen(true)}
        >
          CLEAR MESSAGE HISTORY
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>Once messages are deleted, it cannot be undone.</DialogContent>
              <form 
                onSubmit={e => {
                  e.preventDefault();
                  clearMessageHistory({
                    variables: {
                      input: {
                        characterId: activeCharacterId
                      }
                    }
                  });
                }}
              >
                <Button type="submit" color="danger">Yes, I am sure</Button>
            </form>
          </ModalDialog>
          
        </Modal>
      </div>
    )
  } else {
    return (<div></div>)
  }
};
