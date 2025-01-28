import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { UserProps, User } from './models/User';

const users = new Collection('http://localhost:3000/users', (json: UserProps) => {
        return User.buildUser(json);
    }
);

users.on('change', () => {
    const root = document.getElementById('root');

    if (root) {
        new UserList(root, users).render();
    }
});

users.fetch();



// const user = User.buildUser({ name: "NAME", age: 20 });
// const root = document.querySelector("#root");

// if(root){
//     const userEdit = new UserForm(root, user);
//     userEdit.render();
//     console.log("userEdit, ", userEdit);
// }else{
//     throw new Error("Root element not found");
// }

// const collection = User.buildUserCollection();

// collection.on("change", function(){
//     console.log('collection', collection);
// });

// collection.fetch();

// import { User } from "./models/User";


// const user = User.buildUser({ id: 1 });//Using "static" in the User.ts file
// // const user = new User({ }); //Using "constructor and the "super" class in the User.ts file

// user.on("change", function () {
//     console.log("User", user);
// });

// user.fetch();