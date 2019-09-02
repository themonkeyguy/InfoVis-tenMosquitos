//http://localhost:8080/Documents/Universita/InfoVis/tenMosquitos/


var idConf = 0
var config = readFileJson().config

//Change the position of the mosquitos
function changePosition(config) {
    for (let index = 0; index < 10; index++) {
        if(d3.select("#mosquito" + index).attr("locked")!=1)
            d3.select("#mosquito" + index).attr("transform", "translate(" + setPosition(index, idConf).x + "," + setPosition(index, idConf).y + ")")
    }
};

//L'unica zanzare buona e' una zanzara morta
function killIt(coordinate) {
    d3.select("#mosquito"+coordinate)
    .attr("locked",1)
    .attr("xlink:href","images/deadMosquito.svg")
};

//catch the 'x' in the keyboard
let worldArea = document.getElementById('world-area');
worldArea.addEventListener('keydown',(e) => {
    if (e.key==='x') {
        if (idConf===9) {
            idConf = 0
        } else {
            idConf +=1
        }
        changePosition(idConf)
    }
});

//catturare il click
// worldArea.addEventListener('click', (e) => {
//     console.log(e)
// });

function init() {
    removeDummy();
	drawMosquitos(idConf)
}

//Draw the first configuration of mosquitos
function drawMosquitos(idConf){
    var svg= d3.select("svg")
    for (let i = 0; i < 10; i++) {
        svg.append("svg:image")
        .attr("xlink:href", "images/mosquito.svg")
        .attr("id", "mosquito"+i)
        .attr("locked", 0)
		.attr("width", 100)
		.attr("height", 100)
		.attr("orientation", 0)
        .attr("transform", "translate("+setPosition(i, idConf).x+","+setPosition(i, idConf).y+") rotate(0)")
        .on("click", function(){killIt(i)}) 
    }
}

//Remove the Start button
function removeDummy() {
    var elem = document.getElementById('dummy');
    elem.parentNode.removeChild(elem);
    return false;
}

function readFileJson(){
    return $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/configuration.json',
    async: false,
    dataType: 'json',
    data: { action : 'getList' },
    done: function(results) {
        // Uhm, maybe I don't even need this?
        JSON.parse(results);
        return results;
    },
    fail: function( jqXHR, textStatus, errorThrown ) {
        console.log( 'Could not get posts, server response: ' + textStatus + ': ' + errorThrown );
    }
   }).responseJSON;
}

function setPosition(i, idConf) {
    var shortcut = config[idConf]
    switch (idConf) {
        case 0: //linearetta
            return { x: eval(shortcut.x)*(i+1), y: eval(shortcut.y)}
        case 1: //lineaverticale
            return { x: eval(shortcut.x), y: eval(shortcut.y)*(i+1)}    
        case 2: //slash
            return { x: eval(shortcut.x)*(i+1), y: eval(shortcut.y)*(i+1)}
        case 3: //backslash
                return {x: eval(shortcut.x)*(i+1), y: eval(shortcut.y)*(10-i)}
            //return { x: eval(shortcut.x)*i/10, y: (eval(shortcut.y)-63-eval(shortcut.y)*i/10)}
        case 4: 
            if (i%2===0){
                yPari = eval(shortcut.yPari)
                return { x: eval(shortcut.x)*i, y: yPari}
            }
            else{
                yDisp = eval(shortcut.yDisp)
                return { x: eval(shortcut.x)*i, y: yDisp}
            }
        case 5:
            if (i%2===0){
                yPari = eval(shortcut.yPari)
                return { x: eval(shortcut.x)*i, y: yPari}
            }
            else{
                yDisp = eval(shortcut.yDisp)
                return { x: eval(shortcut.x)*i, y: yDisp}
            }
        case 6:
            if (i%2===0){
                xPari = eval(shortcut.xPari)
                return { x: xPari, y: eval(shortcut.y)*i}
            }
            else{
                xDisp = eval(shortcut.xDisp)
                return { x: xDisp, y: eval(shortcut.y)*i}
            }
        case 7:
            if (i%2===0){
                xPari = eval(shortcut.xPari)
                return { x: xPari, y: eval(shortcut.y)*i}
            }
            else{
                xDisp = eval(shortcut.xDisp)
                return { x: xDisp, y: eval(shortcut.y)*i}
            }
        case 8: //rect
            if (i<4) {
                return { x: eval(shortcut.x)*(i*2+1), y: eval(shortcut.y)}
            }
            else if (i===4 || i===5) {
                return {x: eval(shortcut.x)*(i*6-23), y: eval(shortcut.y)*2}
            } else {
                return { x: eval(shortcut.x)*(i*(-2)+19), y:eval(shortcut.y)*3}
            }
        case 9: //labellezza
            if(i===0)
                return { x: eval(shortcut.x)*4, y: 0}
            else if(i>0&&i<3)
                return { x: eval(shortcut.x)*(i*2+1), y: eval(shortcut.y)}
            else if(i>2&&i<6)
                return{x: eval(shortcut.x)*(i*2-4), y: eval(shortcut.y)*2}
            else
                return{x: eval(shortcut.x)*(i*2-11), y: eval(shortcut.y)*3}
        }
}