const createPost = async (event) => {
    event.preventDefault()

    const entry_title = document.getElementById(`postTitle`).value
    const entry_content = document.getElementById(`newPost`).value
if(entry_content){
    const postData = await fetch(`/api/entries`, {
        method: `POST`,
        body: JSON.stringify({entry_title, entry_content}),
        headers: { 'Content-Type': 'application/json'}
    })
    postData.ok ?
    document.location.replace(`/dashboard`) :
    console.log(postData.statusText)}
}

document.getElementById(`postSubmit`).addEventListener(`submit`, createPost)