import {useContext} from 'react';
import NotificationContext from '../../store/notification-context';
import Notification from '../ui/notification';
import MainHeader from './main-header';

function Layout({children}) {
  const { notification } = useContext(NotificationContext);
  const activeNotification = notification;

  return <>
    <MainHeader />
    <main>{children}</main>
    { activeNotification && <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} /> }

  </>
}

export default Layout;
