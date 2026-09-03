import { createContext, useState, useContext } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)

  const showNotification = (message) => {
    setNotification(message)

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)

