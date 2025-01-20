import { User } from "./models/User";

// const user = new User({ name: 'new record', age: 0 });
const user = new User({ id: '2c5d', name: 'Daniel', age: 27 });
// const res = user.get("name");
// console.log(res);




// setTimeout(function(){
//     console.log(user);
// }, 4000);

user.on("save", function () {
    console.log("User", user);
});

user.save();

// user.set({name: 'New name'});