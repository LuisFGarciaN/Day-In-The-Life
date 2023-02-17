const submitComment = async (event) => {
    event.preventDefault()
    const comment_content = document.getElementById(`newComment`).value
    const entry_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]
    
    if(comment_content){
        const comment = await fetch(`/api/comments`, {
            method: `POST`,
            body: JSON.stringify({entry_id, comment_content}),
            headers: {
                'Content-Type': 'application/json'
            }
    })  
    comment.ok?
        document.location.reload() :
        alert(comment.statusText)
}}

document.getElementById(`commentSubmit`).addEventListener(`click`, submitComment)