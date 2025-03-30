
import React from 'react';

type MessageType = 'success' | 'error' | 'info';

interface FlashMessageProps {
  type: MessageType;
  message: string;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ type, message }) => {
  return (
    <div className={`flash-message flash-${type}`}>
      {message}
    </div>
  );
};

export default FlashMessage;
