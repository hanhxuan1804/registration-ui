export const registerUser = async (data) => {
    const response = await fetch('https://registration-api.onrender.com/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if(response.ok) {
        return result;
    }
    let error = '';
    for (var key of Object.keys(result)) {
        error += result[key].message + '. ';
    }
    throw new Error(error);
}