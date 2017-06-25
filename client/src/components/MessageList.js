import React from 'react';

import AddMessage from './AddMessage';

const MessageList = ({ messages, views }) => {
  return (
    <div className="messagesList">
      <div className="message">{views} views</div>
      { messages.map( message =>
        (<div key={message.id} className={'message ' + (message.id < 0 ? 'optimistic' : '')}>
            {message.text}
        </div>)
      )}
      <AddMessage />
    </div>
  );
};
export default (MessageList);
