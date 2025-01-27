import React from 'react';
import {Text} from 'react-native';

import {Dialog} from '@rneui/themed';
import {ErrorDialogProps} from '../types';

const ErrorDialog = ({
  isVisible,
  onClose,
}: ErrorDialogProps): React.JSX.Element => {
  return (
    <Dialog isVisible={isVisible} onBackdropPress={onClose}>
      <Dialog.Title title="Search Error" />
      <Text>Please contact Customer Support to resolve issue</Text>
      <Dialog.Actions>
        <Dialog.Button title="OK" onPress={onClose} />
      </Dialog.Actions>
    </Dialog>
  );
};

export default ErrorDialog;
