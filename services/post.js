export const getAllPosts = (accessToken) => {
    return new Promise((resolve, reject) => {
        fetch('/api/posts', {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": accessToken
            },
        })
        .then(res => res.json().then(json => resolve({
            ...json,
            status: res.status
        })).catch(err => reject(err)))
        .catch(err => reject(err))
    })
}