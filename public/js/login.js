
//Show password code
// document.getElementById("show-password").addEventListener("change", function() {
//     var passwordInput = document.getElementById("password");
//     if (this.checked) {
//       passwordInput.setAttribute("type", "text");
//     } else {
//       passwordInput.setAttribute("type", "password");
//     }
//   });

  const loginSubmit = async(event) => {
    event.preventDefault()
    const email = document.getElementById(`UserEmail`).value.trim()
    const password = document.getElementById(`UserPassword`).value.trim()
    if(email && password){
        const response = await fetch(`/api/users/login`, {
            method: `POST`,
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' }
        })
        if(response.ok) {
        document.location.replace(`/dashboard`) 
       console.log(response.statusText)
        } else {
          window.alert('Wrong email or password. Try again.')
        }

    }
}
document.getElementById(`loginSubmit`).addEventListener(`click`, loginSubmit)