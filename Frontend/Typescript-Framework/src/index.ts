// import { User } from "./models/User";
import { UserForm } from "./models/views/UserForm";

const userForm = new UserForm(document.querySelector("#root"));

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