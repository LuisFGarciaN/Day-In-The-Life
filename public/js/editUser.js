const editUser = async (event) => {
    event.preventDefault()
    const name = document.getElementById(`newName`).value.trim()
    const user_name = document.getElementById(`newUserName`).value.trim()
    const email = document.getElementById(`newUserEmail`).value.trim()
    const location = document.getElementById(`userLocation`).value.trim()
    const bio = document.getElementById(`bio`).value
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]
     

    const postData = await fetch(`/api/users/${id}`, {
        method: `PUT`,
        body: JSON.stringify({ id, name, user_name, email, location, bio}),
        headers: { 'Content-Type': 'application/json'}
    })
    postData.ok ?
    document.location.replace(`/dashboard`) :
    console.log(postData.statusText)}

document.getElementById(`editUserSubmit`).addEventListener(`click`, editUser)