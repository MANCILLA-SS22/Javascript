import { Component } from 'react';
import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';
import ErrorBoundary from './ErrorBoundary';

class UserFinder extends Component{
  //With use context, you can listen to multiple context in one of the same component by calling use context multiple times and pointing at different contexts. This will not be possible with class 
  //based components, because there you can only connect a class based component to one context. And you do that by adding a static property, by adding the static keyword and then adding the "contextType"
  //property. And then you assign a value (UsersContext).
  //With that you're telling React that this component should have access to the user's context context, but you can only set the static context type property once so if there are two contexts which 
  //should be connected to one at the same component, this would simply not be an option, you would have to find some other work around like wrapping it in a number component or anything like that.
  static contextType = UsersContext;

  constructor(){
    super();
    this.state = { filteredUsers: [], searchTerm: "" };
  };

  componentDidMount() {
    this.setState({ filteredUsers: this.context.users });
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.searchTerm !== this.state.searchTerm){
      this.setState({ 
        filteredUsers: this.context.users.filter((user) => user.name.includes(this.state.searchTerm)) 
      })
    }
  }

  searchChangeHandler(event){
    this.setState({searchTerm: event.target.value});
  }

  render(){
    return (
      <>
        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </>
    );
  }
}

export default UserFinder;

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

// export default UserFinder;