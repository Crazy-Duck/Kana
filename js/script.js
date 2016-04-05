'use strict';

(function (){
    var kanas       = ["Katakana", "Hiragana", "Cross"];
    var polys       = ["Monographs", "Digraphs", "Trigraphs"];
    var dictionary  = languages["KatakanaMonographs"];

    var question    = document.getElementById('question');
    var answers     = document.getElementsByClassName('answer');
    var mode        = document.getElementById('mode');
    var invert      = document.getElementById('invert');

    var score = 0;
    var kana = 0;
    var poly = 0;
    var isInverted = false;

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
        var key = getRandomKey(dictionary);
        question.innerText = key;
        var r = [dictionary[key]];
        for (let i = 1; i < answers.length; i++) {
            var t;
            do t = getRandomValue(dictionary)
            while (r.indexOf(t)>=0);
            r.push(t);
        }
        shuffle(r);
        [].forEach.call(answers, (answer, i) => answer.innerText = r[i]);
    }
    // Score a point
    function scorePoint() {
        score = score + 1;
        updateScore();
    }
    // Reset score
    function resetScore(){
        score = 0;
        updateScore();
    }
    // Update the score visual
    function updateScore() {
        document.getElementById("score").innerText = score;
    }

    initQuestion();
    // Add answer event handlers
    [].forEach.call(answers, answer => {
            answer.addEventListener('click', (event)=> {
                // Get the guess
                var guess = event.target.innerText;
                // Check if guess corresponds to correct answer
                if (guess == dictionary[question.innerText]) {
                    // Clear incorrect answers
                    [].forEach.call(answers, element => element.dataset.correct = 'true');
                    // Create new question
                    initQuestion();
                    // Update score
                    scorePoint();
                } else {
                    // Mark guess as incorrect
                    event.target.dataset.correct = 'false';
                    // Reset score
                    resetScore();
                }
            });
        });
    // Add mode event handlers
    mode.addEventListener('click', event => {
        // Set language
        kana = (kana + 1) % kanas.length;
        dictionary = languages[kanas[kana]+polys[poly]];
        dictionary = isInverted ? array_flip(dictionary) : dictionary;
        mode.innerText = kanas[kana];
        // Create new question
        initQuestion();
        resetScore();
    });
    // Add invert event handler
    invert.addEventListener('click', event => {
        // Invert selection
        isInverted = !isInverted;
        // Change language
        dictionary = array_flip(dictionary);
        question.dataset.language = question.dataset.language == 'kana' ? 'romaji' : 'kana';
        // Create new question
        initQuestion();
        resetScore();
    });
})();