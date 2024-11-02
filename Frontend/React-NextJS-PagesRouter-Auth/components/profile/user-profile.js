import {getSession} from 'next-auth/client'
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   async function sessionLoad(){
  //     const session = await getSession();
  //     !session ? window.location.href = '/auth' : setIsLoading(false);
  //   }
  //   sessionLoad();
  // }, []);

  // if (isLoading) return <p className={classes.profile}>Loading...</p>;

  async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;