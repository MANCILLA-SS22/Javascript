import { createContext, useState, useEffect } from 'react'

const NotificationContext = createContext({
    notification: null,
    showNotification: function (notificationData) { },
    hideNotification: function () { },
});

export function NotificationContextProvider(props) {
    const [activeNotification, setActiveNotification] = useState();

    useEffect(function () {
        if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
            const timer = setTimeout(function () {
                setActiveNotification(null);
            }, 3000);

            //I'll return that cleanup function to clear that timer if useEffect reruns before the timer went off, so that we don't have multiple ongoing timers at the same time.
            //All that code here is still in this IF block, though. If we're not making it in there, useEffect does nothing.
            return function () {
                clearTimeout(timer);
            }
        }
    }, [activeNotification]);

    function showNotificationHandler(notificationData) {
        setActiveNotification(notificationData);
    }

    function hideNotificationHandler() {
        setActiveNotification(null);
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
    };

    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext;