import React from 'react'
import AppRoutes from '../src/routes/AppRoute.jsx'
import { UserProvider } from '../src/context/user.context.jsx'
import 'remixicon/fonts/remixicon.css';


const App = () => {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}

export default App