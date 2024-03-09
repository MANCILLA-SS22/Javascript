// const { async } = require("regenerator-runtime");
// const recipeContainer = document.querySelector('.recipe');
// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const showRecipe = async function() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        console.log(res, data);
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    } catch (err) {
        alert(err);
    }
};
showRecipe();

//# sourceMappingURL=index.66c7d151.js.map
