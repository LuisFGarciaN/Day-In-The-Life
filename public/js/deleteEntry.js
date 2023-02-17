const deletePost = async (event) => {
    event.preventDefault();
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]
      
      const response = await fetch(`/api/entries/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      response.ok?
        document.location.replace('/dashboard'):
      
        alert(response.statusText);
      

}

document.getElementById(`deletePost`).addEventListener('click', deletePost);