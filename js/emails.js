// ---------- zbieranie emaili ----------

let subscription = () => {
    let name = document.getElementById('nameInput');
    let email = document.getElementById('emailInput');

    // ----- alert w przypdaku pustych pól lub niepoprawnego emaila -----

    if (!name.value || !email.value || !validateEmail(email.value))
        alert('Write correct email and name!')

    // ----- wysłanie danych na serwer

    else {
        let data = {
            title: 'Email List',
            body: {
                email: email.value,
                name: name.value
            }

        }
        postData(data)
    }
}

// ----- funkcja sprawdzająca poprawność emaia -----
let validateEmail = (email) => {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


const postData = post => {
    const options = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(post),
        headers: new Headers({
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        })
    }
    return fetch('http://localhost:3000/', options)
        .then(res => res.json())
        .then(res => {
            // ----- wyzerowanie wartości w inputach -----

            document.getElementById('nameInput').value='';
            document.getElementById('emailInput').value='';
            console.log(res)
        })
        .catch(err => console.error('ERROR'))
}