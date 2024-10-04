const addComment = async(e)=> {
    e.preventDefault()

    const content = document.getElementById('comment').value.trim()
    const postId = window.location.pathname.split('/').pop()
    if(content){
        const response= await fetch('/api/posts/comment', {
            method: 'POST',
            body: JSON.stringify({content, post_id: postId}),
            headers: {'Content-Type': 'application/json'}
        })
        if(response.ok){
            document.location.reload()
        }else{
            alert('Failed to post comment')
        }
    }
}

document.getElementById('comment-form').addEventListener('submit', addComment)