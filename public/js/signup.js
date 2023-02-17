const signupForm = document.getElementById(`signupForm`)

const submitForm = async (event) => {
    event.preventDefault()
    const name = document.getElementById(`newName`).value.trim()
    const user_name = document.getElementById(`newUserName`).value.trim()
    const email = document.getElementById(`newUserEmail`).value.trim()
    const password = document.getElementById(`newUserPassword`).value.trim()
    const location = document.getElementById(`userLocation`).value.trim()
    const bio = document.getElementById(`userBio`).value

    if( user_name && email && password) {
        const newUser = await fetch(`/api/users`, {
            method: `POST`,
            body: JSON.stringify({name, user_name, email, password, location, bio}),
            headers: { 'Content-Type': 'application/json' }
        })
    newUser.ok?
        document.location.replace(`/dashboard`) :
        console.log(newUser.statusText)
    }
}
 signupForm.addEventListener(`submit`, submitForm)

//Show password code
// document.getElementById("show-password").addEventListener("change", function() {
//     var passwordInput = document.getElementById("password");
//     if (this.checked) {
//       passwordInput.setAttribute("type", "text");
//     } else {
//       passwordInput.setAttribute("type", "password");
//     }
//   });