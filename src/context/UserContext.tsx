import React from 'react';

const UserContext = React.createContext<UserContextValue>({
  user: undefined,
});

export { UserContext };
