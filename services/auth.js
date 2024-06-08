export const RegisterUser = (email, password) => {
    return new Promise((resolve, reject) => {
        fetch('/api/register', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json().then(json => resolve({
            ...json,
            status: res.status
        })).catch(err => reject(err)))
        .catch(err => reject(err))
    })
}