var textIn = document.getElementById("STDIN")
var textOut = document.getElementById("STDOUT")
var boton0 = document.getElementById('paso0')
var boton1 = document.getElementById('paso1')
var boton2 = document.getElementById('paso2')
var boton3 = document.getElementById('paso3')
var boton4 = document.getElementById('paso4')
var boton5 = document.getElementById('paso5')
var numLines = 0
var arrayChainNumerated = []


boton0.addEventListener('click', function(){
    textOut.value = ''
    console.clear()
}, false)

boton1.addEventListener('click', function(){
    textOut.value = ''
    let arrayOut = unsignerText(spanishOnly(textIn.value))
    console.log(arrayOut)
    textOut.value = '[' + arrayOut  + ' ]'
}, false)

boton2.addEventListener('click', function(){
    textOut.value = ''
    
    textOut.value = chainNumerator(spanishOnly(textIn.value))
}, false)

boton3.addEventListener('click', function(){
    textOut.value = ''
    let stdout = palabraFrecuencia(arrayContador(spanishOnly(textIn.value)))
    console.log(stdout)
    textOut.value = stdout
}, false)

boton4.addEventListener('click', function(){
    textOut.value = ''
    let stdout = lexicOrder(palabraFrecuencia(arrayContador(spanishOnly(textIn.value))))
    let imprimir = ""
    stdout.forEach(element => {
        imprimir += element + '\n'
    }); 
    console.log(imprimir)
    textOut.value = imprimir
}, false)

boton5.addEventListener('click', function(){
    textOut.value = ''
    let imprimir = ""
    let stdout = numberOrder(spanishOnly(textIn.value))
    stdout.forEach(element => {
        imprimir += element + '\n'
    }); 
    console.log(imprimir)
    textOut.value = imprimir
}, false)



/* Aquí se filtran que los caracteres pertenezcan al español. Incluyendo 
algunos caracteres especiales como (. , '' "" <> + / - * y letras acentuadas). 
Como salida se tendrá el texto en la variable "spanish" */
function spanishOnly(textIn) {
    let spanish = ""
    textIn = textIn.trim()
    for (let i = 0; i < textIn.length; i++) {
        if(((textIn.charCodeAt(i) >= 32) && (textIn.charCodeAt(i) <= 126))  ||
            textIn.charCodeAt(i) == 225 || textIn.charCodeAt(i) == 233      ||
            textIn.charCodeAt(i) == 237 || textIn.charCodeAt(i) == 243      ||
            textIn.charCodeAt(i) == 250 || textIn.charCodeAt(i) == 193      ||
            textIn.charCodeAt(i) == 201 || textIn.charCodeAt(i) == 205      ||
            textIn.charCodeAt(i) == 211 || textIn.charCodeAt(i) == 218      ||
            textIn.charCodeAt(i) == 191 || textIn.charCodeAt(i) == 161      ||
            textIn.charCodeAt(i) == 241 || textIn.charCodeAt(i) == 209) {

            spanish+=textIn[i] 
        }

        if(textIn[i] === ('\n')){
            numLines+=1
            spanish+=('\n')
        }
    }
    return spanish
}
/////////////////////////////////////////////////////////////////////////////



/* Funciones del paso 1:
    La 1era es convertMinusculas, coloca el texto en minúsculas y luego devuelve
un array con todas las palabras, pero incluyen signos y no lee los 
saltos de líneas. 
    La 2da es unsignerText, coloca el texto en minúsculas y devuelve un array
sin algunos signos ortográficos, además lee los saltos de línea. */
function convertMinusculas(texto) {
    texto = texto.toLowerCase().split(' ')
    return texto
}

function unsignerText(texto) {
    let flatText = ""
    let unsignedText = []
    texto = texto.toLowerCase()
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] != '\n' && texto[i] != ',' && texto[i] != '.' && texto[i] != ':' && texto[i] != '"' ) {
            flatText +=  texto[i]
        }else{
            flatText += ' '
        }
    }
    flatText = flatText.split(' ')
    unsignedText = flatText.filter((i) => i !== "")
    return unsignedText
}
//////////////////////////////////////////////////////////////////////////////////



/* Función para el paso 2: 
    La función chainNumerator, teniendo como entrada la variable "spanish" */
function chainNumerator(flatText) {
    let arrayChain = (flatText).split('\n')
    arrayChainNumerated = []
    for (let i = 0; i < arrayChain.length; i++) {
        if (arrayChain[i] == "") {
            arrayChainNumerated += '\n' + (i+1) + '.-'
        }else{
            arrayChainNumerated += '\n' + (i+1).toString() + '.-' + arrayChain[i]
        }
    }
    return arrayChainNumerated.trim()
}
/////////////////////////////////////////////////////////////////////////////



/* Función del paso 3: 
    Recibe un archivo escrito en español y devuelve un array con las palabras 
y su número de repeticiones */
function arrayContador(texto) {
    let unsignedText = unsignerText(texto)
    const contador = unsignedText.reduce((contNombre,nombre) => {
        contNombre[nombre] = (contNombre[nombre] || 0) + 1
        return contNombre
    }, [])
    return contador
}
/* Recibe un array con sus numeros de repeticiones y devuelve una lista de 
las palabras con su frecuencia de repetición */
function palabraFrecuencia(arrayText){
    let textContador = ""
    for (const i in arrayText) {
        if (i != undefined) {
            textContador += (`${i} ${arrayText[i]} \n`);
        }
    }
    return textContador.trim()
}
////////////////////////////////////////////////////////////////



/* Función del paso 4:
    Recibe un texto en español y devolviendo un array ordenado lexicográficamente.
Haciendo uso de a función "unsignerText"*/
function lexicOrder(arrayText) { 
    arrayText = arrayText.split('\n')
    let textContador = []
    for (let i = 0; i < arrayText.length; i++) {
        if (i != undefined) {
            textContador[i] = (`${arrayText[i]}`);
        }
    }
    return textContador.sort((a, b) => a.localeCompare(b));
}
/////////////////////////////////////////////////////////////////////////////////



/* Función del paso 5:
    Recibe un texto y ordena de mayor a menor frecuencia */
function numberOrder(arrayText) { 
    arrayText = arrayContador(arrayText)
    let textContador = ""
    for (const i in arrayText) {
        if (i != undefined) {
            textContador += (`${arrayText[i]} ${i}\n`);
        }
    }
    textContador = textContador.trim()
    arrayText = textContador.split('\n')

    arrayText = arrayText.sort((b, a) => a.localeCompare(b));
    
    return arrayText
}
//////////////////////////////////////////////////////////////////////////




