document.addEventListener("DOMContentLoaded",()=>{
    createSquares();

    let palabrasAdivinadas = [[]];
    let espacioDisponible = 1;

    let palabra = "dairy"
    let contadorPalabrasintentadas = 0;

    const teclas = document.querySelectorAll(".keyboard-row button");
    
   
    function verArraydePalabraActual(){
        const numeroDePalabrasAdivinadas = palabrasAdivinadas.length;
        return palabrasAdivinadas[numeroDePalabrasAdivinadas - 1];
    }

    function actualizarPalabraAdivinada(letra){
        const arrayPalabraActual = verArraydePalabraActual();

        if (arrayPalabraActual && arrayPalabraActual.length < 5 ){
            arrayPalabraActual.push(letra);

            const espacioDisponibleEl = document.getElementById(String(espacioDisponible));
            espacioDisponible = espacioDisponible + 1

            espacioDisponibleEl.textContent = letra;
        }
    }
    function colorearRecuadro(letra, index){
        const esLetraCorrecta = palabra.includes(letra);

        if (!esLetraCorrecta){
            return "rgb(58,58,60)"
        }
       
        const letraEnPosicionI = palabra.charAt(index);
        const esPosicionCorrecta = letra === letraEnPosicionI;

        if (esPosicionCorrecta){
            return "rgb(83,141,78)"
        }

        return "rgb(181,159,59)"
    }

    function enviarPalabra() {
        const arrayPalabraActual = verArraydePalabraActual()
        if (arrayPalabraActual.length !== 5){
            window.alert("faltan letras");
        }

        const palabraActual = arrayPalabraActual.join("");

        const firstLetterId = contadorPalabrasintentadas * 5 +1;
        const interval = 200;
        arrayPalabraActual.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = colorearRecuadro(letter,index);
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index)
        });

        contadorPalabrasintentadas += 1;

        if (palabraActual === palabra){
            window.alert("congrats")
        }

        if (palabrasAdivinadas.length === 6){
            window.alert("the word is " + palabra)
        }

        palabrasAdivinadas.push([])

    }

    function createSquares (){
        const gameBoard = document.getElementById("board");
        for (let index = 0; index < 30;index++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated")
            square.setAttribute("id", index+1);
            gameBoard.appendChild(square);
        }
    }

    for (let i = 0; i < teclas.length; i++) {
        teclas[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if (letter === "enter" ) {
                enviarPalabra();
                return;
            }

            actualizarPalabraAdivinada(letter)
        };
    }
})