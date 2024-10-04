const loginForm = async(e) => {
    e.preventDefault()

    const email = document.getElementById('email-signin').value.trim();
    const password = document.getElementById('password-signin').value.trim();
   

    if(email && password){
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        })
        if(response.ok){
            document.location.replace('/dashboard')
        }else{
            alert(response.statusText)
        }
    }
}



document.getElementById('login-form').addEventListener('submit', loginForm)

