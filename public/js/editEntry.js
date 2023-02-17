const editPost = async (event) => {
    event.preventDefault();

    const entry_title = document.getElementById(`postTitle`).value.trim()
    const entry_content = document.getElementById(`newPost`).value.trim()

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]
      
      const response = await fetch(`/api/entries/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          entry_id: id,
          entry_title,
          entry_content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      response.ok?
        document.location.replace('/dashboard'):
      
        alert(response.statusText);
      

}

document.getElementById(`editPost`).addEventListener('submit', editPost);