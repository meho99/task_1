// ---------- quiz ----------

// ----- tablica odpowiedzi i pytań -----
let quiz = [
    {
        question: '1 . How do you like to spend summer?',
        answers: [{ a: 'Camping in the woods', value: 1 }, { a: 'Travelling to new cities', value: 2 }, { a: 'Stay at home', value: 3 }, { a: 'On a beach', value: 4 }]
    },
    {
        question: '2 . What is your favourite season?',
        answers: [{ a: 'Winter', value: 1 }, { a: 'Summer', value: 2 }, { a: 'Spring', value: 3 }, { a: 'Autumn', value: 4 }]
    },
    {
        question: '3 . What music do prefer?',
        answers: [{ a: 'Rock', value: 1 }, { a: 'Pop', value: 2 }, { a: 'Jazz', value: 3 }, { a: 'Classical music', value: 4 }]
    },
    {
        question: '4 . How often do you exercise?',
        answers: [{ a: 'Never', value: 1 }, { a: 'Sometimes', value: 2 }, { a: 'Regulary', value: 3 }, { a: 'Often', value: 4 }]
    },
    {
        question: '5 . What is your favourite dish?',
        answers: [{ a: 'Pierogi', value: 1 }, { a: 'Pizza', value: 2 }, { a: 'Sushi', value: 3 }, { a: 'Salad', value: 4 }]
    },
]
// ----- statystyki wyników -----

let resoults = [
    { name: 'Blueberry', score: 0, color: '#1f3d69' },
    { name: 'Raspberry', score: 0, color: '#a20242' },
    { name: 'Blackberry', score: 0, color: '#3f029b' },
    { name: 'Cherry', score: 0, color: '#a10241' },
]

let actualQuestion = 0;

// ----- wybór odpowiedzi -----
chooseAnswer = (value) => {

    resoults[value - 1].score++;

    // wyświetlenie kolejnego pytania

    if (actualQuestion < 4) {
        actualQuestion++;
        showQuestion(actualQuestion)
    }

    // ----- zakonczenie gry -----

    else {

        // sortowanie tablicy, aby znaleść najwyższy wynik

        resoults.sort(dynamicSort('score'))

        document.getElementById('question').innerHTML = `! YOUR FLAVOUR IS ${resoults[resoults.length - 1].name.toUpperCase()} !`;
        document.getElementById('question').style.color= 'white';
        document.getElementById('quizContainer').style.backgroundColor= resoults[resoults.length - 1].color
        document.getElementById('choices').innerHTML = '';
    }
}

// ----- tworzenie pytań i odpowiedzi z tablicy -----

let showQuestion = (number) => {
    document.getElementById('choices').innerHTML = '';
    // tworzenie pytania

    document.getElementById('question').innerHTML = quiz[number].question

    // tworzenie odpowiedzi

    quiz[number].answers.map((item, index) => {
        let answer = document.createElement('div');
        answer.className = 'answer'
        answer.innerHTML = item.a;

        // kliknięcie na odpowiedź 
        answer.addEventListener('click', (e) => {
            chooseAnswer(item.value, number)
        })
        document.getElementById('choices').appendChild(answer);

    })
}

// -- po załadowaniu strony --

window.addEventListener('DOMContentLoaded', (event) => {
    showQuestion(actualQuestion)
});

// ---------- sortowanie  ----------

let dynamicSort = (property) => {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (Number(a[property]) < Number(b[property])) ? -1 : (Number(a[property]) > Number(b[property])) ? 1 : 0;
        return result * sortOrder;
    }
}