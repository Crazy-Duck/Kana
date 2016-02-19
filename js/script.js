'use strict'
var question = document.getElementsByClassName('question')[0];
var answers = document.getElementsByClassName('answer');
var modes = document.getElementsByClassName('mode');
var language = languages["katakanaMonographs"];

// Get a random key from an associative array
function getRandomKey(o) {
    return Object.keys(o)[Math.floor(Math.random()*Object.keys(o).length)];
}
// Get a random value from an associative array
function getRandomValue(o) {
    return o[getRandomKey(o)];
}
// Shuffle the elements of an array in place
function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}
function initQuestion () {
    var key = getRandomKey(language);
    question.innerText = key;
    var r = [language[key]];
    for (let i = 1; i < answers.length; i++) {
        var t;
        do t = getRandomValue(language)
        while (r.indexOf(t)>=0);
        r.push(t);
    }
    shuffle(r);
    [].forEach.call(answers, (answer, i) => answer.innerText = r[i]);
}

initQuestion();
[].forEach.call(answers, answer => {
        answer.addEventListener('click', (event)=>{
            var guess = event.target.innerText;
            if (guess == language[question.innerText]) {
                [].forEach.call(answers, element => element.dataset.correct = 'true');
                initQuestion();
                var score = document.getElementById('score');
                score.innerText = (Number(score.innerText) + 1);
            } else {
                event.target.dataset.correct = 'false';
                document.getElementById("score").innerText = 0;
            }
        });
    }
);

[].forEach.call(modes, mode => {
    mode.addEventListener('click', event =>{
        [].forEach.call(modes, m => {
            if (mode != m) {
                m.dataset.select = 'false';
            }
        });
        mode.dataset.select = 'true';
        language = languages[mode.dataset.language];
        initQuestion();
    });
});