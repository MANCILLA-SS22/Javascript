import {User} from "./models/User";

const user = new User();
// user.fetch();

// setTimeout(function(){
//     console.log(user);
// }, 4000);

user.events.on("change", function(){
    console.log("change");
});

user.events.trigger("change"); 