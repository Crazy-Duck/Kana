'use strict'
var question = document.getElementsByClassName('question')[0];
var answers = document.getElementsByClassName('answer');
var modes = document.getElementsByClassName('mode');
var language = languages["katakanaMonographs"];
var invert = document.getElementById('invert');

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
// Flip the key-value pairs in an associative array
function array_flip( trans ) {
    var ret = {};
    Object.keys(trans).filter((key)=>{
        return trans.hasOwnProperty(key);
    }).map((key)=>{
        ret[trans[key]] = key;
    });
    return ret;
/*
    var key, tmp_ar = {};

    for ( key in trans ) {
        if ( trans.hasOwnProperty( key ) ) {
            tmp_ar[trans[key]] = key;
        }
    }

    return tmp_ar;*/
}
// Create a new question
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
// Add answer event handlers
[].forEach.call(answers, answer => {
        answer.addEventListener('click', (event)=>{
            // Get the guess
            var guess = event.target.innerText;
            // Check if guess corresponds to correct answer
            if (guess == language[question.innerText]) {
                // Clear incorrect answers
                [].forEach.call(answers, element => element.dataset.correct = 'true');
                // Create new question
                initQuestion();
                // Update score
                var score = document.getElementById('score');
                score.innerText = (Number(score.innerText) + 1);
            } else {
                // Mark guess as incorrect
                event.target.dataset.correct = 'false';
                // Reset score
                document.getElementById("score").innerText = "0";
            }
        });
    }
);
// Add mode event handlers
[].forEach.call(modes, mode => {
    mode.addEventListener('click', event =>{
        // Reset mode selection
        [].forEach.call(modes, m => {
            if (mode != m) {
                m.dataset.select = 'false';
            }
        });
        // Select mode
        mode.dataset.select = 'true';
        // Set language
        language = invert.dataset.select=='true'?
                        array_flip(languages[mode.dataset.language]):
                        languages[mode.dataset.language];
        // Create new question
        initQuestion();
    });
});
// Add invert event handler
invert.addEventListener('click', event => {
    // Invert selection
    invert.dataset.select = invert.dataset.select == 'true' ? 'false' : 'true';
    // Change language
    language = array_flip(language);
    question.dataset.language = question.dataset.language == 'kana' ? 'romaji' : 'kana';
    // Create new question
    initQuestion();
});