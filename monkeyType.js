const wordsInput = document.getElementById("wordsInput");

wordsInput.addEventListener("keypress", function (event) {
    if (event.which === 32) {
        let wordElement = document.querySelector(".word.active");
        let letters = wordElement.querySelectorAll("letter");
        let word = "";

        letters.forEach(function (letter) {
            word += letter.textContent;
        });
        console.log(word);
        wordsInput.value = " " + word;
    }
});
