import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';

import { gql, useMutation } from '@apollo/client';

const DELETE_CHARACTER = gql`
  mutation DeleteCharacter($input: DeleteCharacterInput!) {
    deleteCharacter(input: $input) {
      status
    }
  }
`;

export default function DeleteCharacterButton({ activeCharacterId, setActiveCharacterId }) {
  const [open, setOpen] = useState(false);
  const [deleteCharacter] = useMutation(DELETE_CHARACTER, { 
    onCompleted: () => {
      setActiveCharacterId(null)
    },
    refetchQueries: ['GetCharacters']
  });

  if (activeCharacterId) {
    return (
      <div>
        <Button
          variant="outlined"
          color="danger"
          onClick={() => setOpen(true)}
        >
          DELETE CHARACTER
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>Once a character is deleted, it cannot be undone.</DialogContent>
              <form 
                onSubmit={e => {
                  e.preventDefault();
                  deleteCharacter({
                    variables: {
                      input: {
                        id: activeCharacterId
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
