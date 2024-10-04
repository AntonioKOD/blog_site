const signUpForm  = async(e)=> {
    e.preventDefault()

    const name = document.getElementById('name-signup').value.trim()
    const email = document.getElementById('email-signup').value.trim()
    const password = document.getElementById('password-signup').value.trim()
    console.log(name, email, password)
    if(email && password && name){
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ name,email, password}),
            headers: {'Content-Type': 'application/json'},
        })
        if(response.ok){
            document.location.replace('/dashboard')
        }else{
            alert(response.statusText)
        }
    }

}

document.getElementById('signup-form').addEventListener('submit', signUpForm)