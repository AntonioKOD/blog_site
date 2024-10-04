const addPost = async(e)=> {
    e.preventDefault();

    const title = document.getElementById('title').value.trim()
    const content = document.getElementById('content').value.trim()

    if(title && content){
        const response = await fetch('/api/posts/add', {
            method: 'POST',
            body: JSON.stringify({ title, text_post: content}),
            headers: {'Content-Type': 'application/json'}
        })
        if(response.ok){
            document.location.replace('/dashboard')
        }else{
            alert(response.statusText)
        }
    }
}

document.getElementById('post-form').addEventListener('submit', addPost)