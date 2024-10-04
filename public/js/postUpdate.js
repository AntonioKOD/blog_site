const updatePost = async(e)=> {
    e.preventDefault()

    const title = document.getElementById('title').value.trim()
    const content = document.getElementById('content').value.trim()
    const postId = document.location.pathname.split('/').pop();

    if(title && content){
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({title, text_post: content}),
            headers: {'Content-Type': 'application/json'}
        })
        
        if(response.ok){
            document.location.replace('/dashboard')
        }else{
            alert(response.statusText)
        }
    }
}

const deletePost = async(e)=> {
    e.preventDefault();
    const postId = document.location.pathname.split('/').pop()

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if(response.ok){
        document.location.replace('/dashboard')
    }else{
        alert('Could not delete post')
    }
}

document.getElementById('delete').addEventListener('click', deletePost)

document.getElementById('post-form').addEventListener('submit', updatePost)