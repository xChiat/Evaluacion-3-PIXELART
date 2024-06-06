class Paleta {
    constructor(nombre, colores) {
        this._nombre = nombre;
        this._colores = colores;
    }

    get getNombre() {
        return this._nombre;
    }

    get getColores() {
        return this._colores;
    }

    setNombre(nombre) {
        this._nombre = nombre;
    }

    setColores(colores) {
        this._colores = colores;
    }
}

class Escena {
    constructor(nombre, pixeles, palette = paleta1,paletas) {
        this._nombre = nombre;
        this._pixeles = pixeles;
        this._palette = palette;
        this._paletas = paletas;
    }

    get getNombre() {
        return this._nombre;
    }

    get getPixeles() {
        return this._pixeles;
    }

    get getPalette() {
        return this._palette;
    }
    get getPaletas() {
        return this._paletas;
    }

    setNombre(nombre) {
        this._nombre = nombre;
    }

    setPixeles(pixeles) {
        this._pixeles = pixeles;
    }

    set setPalette(palette) {
        this._palette = palette;
    }
    setPaletas(paletas) {
        this._paletas = paletas;
    }
}

class Proyecto {
    constructor(id, nombre, tamaño, fechaCreacion, escena, escenas) {
        this._id = id;
        this._nombre = nombre;
        this._tamaño = tamaño;
        this._fechaCreacion = fechaCreacion;
        this._escena = escena;
        this._escenas = escenas;
    }

    get getId() {
        return this._id;
    }

    get getNombre() {
        return this._nombre;
    }

    get getTamaño() {
        return this._tamaño;
    }

    get getFechaCreacion() {
        return this._fechaCreacion;
    }

    get getEscena() {
        return this._escena;
    }
    get getEscenas() {
        return this._escenas;
    }

    setNombre(nombre) {
        this._nombre = nombre;
    }

    setTamaño(tamaño) {
        this._tamaño = tamaño;
    }

    setFechaCreacion(fechaCreacion) {
        this._fechaCreacion = fechaCreacion;
    }
}

let paleta1 = new Paleta("Paleta 1", ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF"]);
let paleta2 = new Paleta("Paleta 2", ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"]);
let paleta3 = new Paleta("Paleta 3", ["#8B4513", "#A0522D", "#228B22", "#006400", "#8FBC8F"]);
let paleta4 = new Paleta("Paleta 4", ["#000080", "#0000CD", "#1E90FF", "#87CEEB", "#E0FFFF"]);
let paleta5 = new Paleta("Paleta 5", ["#7C0A02", "#D32F2F", "#FF5722", "#FF9800", "#FFC107"]);
let paleta6 = new Paleta("Paleta 6", ["#FF4500", "#FF8C00", "#FFA500", "#FFD700", "#FFFF00"]);
let paleta7 = new Paleta("Paleta 7", ["#2E2B5F", "#4B0082", "#8A2BE2", "#DA70D6", "#EE82EE"]);

let paletasPredefinidas = [paleta1, paleta2, paleta3, paleta4, paleta5, paleta6, paleta7];
let proyectos = [];
let escenas = [];
console.log(proyectos)

document.addEventListener("DOMContentLoaded", function() {
    cargarSelectPaletasIniciales();
    cargarSelectPaletasInicialesEscena();
    if (window.location.pathname.endsWith("Escena.html")) {
        loadEscena();
    }
});

let findProyecto = function() {
    let buscar = document.getElementById("b-nom").value;
    let p = proyectos.find(item => item.getNombre === buscar);

    if (p != undefined) {
        let rp = document.createElement("span");
        rp.innerText = "Id: " + p.getId + " Nombre: " + p.getNombre + " Tamaño: "+ p.getTamaño +" Fecha Creacion: " + p.getFechaCreacion + " Escena: "+p.getEscena.getNombre + " Resolucion: " + p.getEscena.getPixeles+" x "+ p.getEscena.getPixeles+ " Pixeles"+ " Paleta:"+p.getEscena.getPalette.getNombre;
        document.getElementById("Resultado").innerHTML = "";
        document.getElementById("Resultado").appendChild(rp);
        let btn = document.createElement("button")
        btn.innerText = "Actualizar Datos";
        btn.onclick = function() {
            desplegarForm(p.getNombre);
        }
        document.getElementById("Resultado").appendChild(btn);
        let btnDlt = document.createElement("button");
        btnDlt.innerText = "Eliminar Proyecto";
        btnDlt.onclick = function() {
            deleteProyecto(p.getNombre);
        }
        document.getElementById("Resultado").appendChild(btnDlt);
    } else {
        alert("No Encontrada");
        document.getElementById("Resultado").innerHTML = "";
        document.getElementById("upd-data").innerHTML = ""; 
    } 
}

let desplegarForm = function(nombre){
    let frmUpdData = document.createElement("form")
    frmUpdData.innerHTML = "<input type='text' name='p-nom' id='new-nom' placeholder='Nombre' class='form-control mb-2'><br>"+ 
                            "<input type='number' name='p-px' id='new-px' placeholder='Tamaño' class='form-control mb-2'><br>";
    let btn = document.createElement("button");
    btn.innerText = "Actualizar";
    btn.onclick = function() {
        updateProyecto(nombre);
    }
    document.getElementById("upd-data").appendChild(frmUpdData);
    document.getElementById("upd-data").appendChild(btn);
}

let updateProyecto = function(nombre) {
    let p = proyectos.find(item => item.getNombre === nombre);

    if (p != undefined) {
        let nuevoNombre = document.getElementById("new-nom").value;
        let nuevoTamaño = parseInt(document.getElementById("new-px").value);
        if(validarNombreProyecto(nuevoNombre) && nuevoNombre !== ""){
            if (nuevoTamaño>0 && nuevoTamaño<=30){
                p.setNombre(nuevoNombre);
                p.setTamaño(nuevoTamaño);
                p.getEscena.setPixeles(nuevoTamaño);
                alert(nuevoNombre+"Datos actualizados.");
                updateTable();
                document.getElementById("upd-data").innerHTML = "";
                document.getElementById("Resultado").innerHTML = "";
            }else if(isNaN(nuevoTamaño)){
                p.setNombre(nuevoNombre);
                alert("Datos actualizados.");
                updateTable();
                document.getElementById("upd-data").innerHTML = "";
                document.getElementById("Resultado").innerHTML = "";
            }else{
                alert(" El tamaño debe ser mayor a 0 y menor o igual a 30.");
            }
        }else if(nuevoNombre === ""){
            if (nuevoTamaño>0 && nuevoTamaño<=30){
                p.setTamaño(nuevoTamaño);
                p.getEscena.setPixeles(nuevoTamaño);
                alert(nuevoNombre+"Datos actualizados.");
                updateTable();
                document.getElementById("upd-data").innerHTML = "";
                document.getElementById("Resultado").innerHTML = "";
            }else if(isNaN(nuevoTamaño)){
                alert("debe rellenar al menos uno de los campos")
            }else{
                alert("El tamaño debe ser mayor a 0 y menor o igual a 30.");
            }
        }else{
            alert("El nombre del proyecto ya existe.");
        }
    }
};
let deleteProyecto = function(nombre){
    let p = proyectos.find(item => item.getNombre === nombre);
    if (p!= undefined) {
        validar = prompt("Estas seguro de querer eliminar el proyecto "+ p.getNombre+". Escriba Si o No")
        validar.trim();
        if (validar.toLowerCase() == "si") {
            proyectos.splice(proyectos.indexOf(p), 1);
            alert("Proyecto eliminado.");
            updateTable();
            document.getElementById("Resultado").innerHTML = "";
            document.getElementById("upd-data").innerHTML = "";
        }else if(validar.toLowerCase() == "no"){
            alert("Accion cancelada.");
            return;
        }else{
            alert("Escriba SI o NO")
            deleteProyecto(nombre);
        }
    }
}

let cargarSelectPaletasIniciales = function() {
    let select = document.getElementById('select-paletas');
    paletasPredefinidas.forEach((paleta, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.innerText = paleta.getNombre;
        select.appendChild(option);
    });
    mostrarPaletaSeleccionada();
}

let mostrarPaletaSeleccionada = function() {
    let select = document.getElementById('select-paletas');
    let index = select.value;
    let paletaInicial = paletasPredefinidas[index];
    let paletaContainer = document.getElementById("paletaSeleccionadaContainer");
    paletaContainer.innerHTML='';
    paletaInicial.getColores.forEach(color => {
        paletaContainer.innerHTML += `<div class="color-picker" style="background-color:${color};"></div>`;
    });
}

let cargarSelectPaletasInicialesEscena = function() {
    let select = document.getElementById('select-paletas2');
    paletasPredefinidas.forEach((paleta, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.innerText = paleta.getNombre;
        select.appendChild(option);
    });
    mostrarPaletaSeleccionada();
}
let mostrarPaletaSeleccionadaEscena = function() {
    let select = document.getElementById('select-paletas2');
    let index = select.value;
    let paletaInicial = paletasPredefinidas[index];
    let paletaContainer = document.getElementById("paletaSeleccionadaContainer2");
    paletaContainer.innerHTML='';
    paletaInicial.getColores.forEach(color => {
        paletaContainer.innerHTML += `<div class="color-picker" style="background-color:${color};"></div>`;
    });
}

let  crearProyecto = function() {
    let nom = document.getElementById("p-nom").value;
    let tam = parseInt(document.getElementById("p-px").value);
    let paletaIndex = document.getElementById("select-paletas").value;
    let paletaInicial = paletasPredefinidas[paletaIndex];
    if(validarNombreProyecto(nom)){
        if(tam>0 && tam<=30){
            if (nom && tam) {
                let id = proyectos.length + 1;
                let fechaCreacion = new Date().toLocaleString();
                let escena = new Escena(nom, tam, paletaInicial, paletasPredefinidas);
                escenas.push(escena);
                let p = new Proyecto(id, nom, tam, fechaCreacion, escena, escenas);
                proyectos.push(p);
                updateTable();
            } else {
                alert("Por favor, complete todos los campos.");
            }
        }else{
            alert("El tamaño debe ser mayor a 0 y menor o igual a 30.");
        }   
    }else{
        alert("El nombre del proyecto ya existe.");
    }
}

let validarNombreProyecto = function(nombre) {
    let valido = true;
    proyectos.forEach(proyecto => {
        if (proyecto.getNombre == nombre) {
            valido = false;
        }
    });
    return valido;
}
let  crearEscena = function() {
    let pnom = document.getElementById("ep-nom").value;
    let nom = document.getElementById("e-nom").value;
    let tam = parseInt(document.getElementById("e-px").value);
    let paletaIndex = document.getElementById("select-paletas2").value;
    let paletaInicial = paletasPredefinidas[paletaIndex];
    if(validarNombreProyecto(pnom)==false) {
        if(validarNombreEscena(nom)){
            if(tam>0 && tam<=30){
                if (nom && tam) {
                    nuevaEscena = new Escena(nom, tam, paletaInicial, paletasPredefinidas);
                    p = proyectos.find(item => item.getNombre == pnom);
                    p.getEscenas.push(nuevaEscena);
                    escenaUpdateTable();
                } else {
                    alert("Por favor, complete todos los campos.");
                }
            }else{
                alert("El tamaño debe ser mayor a 0 y menor o igual a 30.");
            }   
        }else{
            alert("El nombre de la escena ya existe.");
        }      
    }else{
        alert("El proyecto no existe.");
    }
}
let  escenaUpdateTable = function() {
    let tableBody = document.getElementById("E-table-body");
    tableBody.innerHTML = "";
    escenas.forEach((escena, index) => {
        let paletaColores = escena.getPalette.getColores.map(color => `<div class="color-picker" style="background-color:${color};"></div>`).join('');
        tableBody.innerHTML += `
            <tr>
                <td>${escena.getNombre}</td>
                <td>${escena.getPixeles} x ${escena.getPixeles} pixeles</td>
                <td>${escena.getPalette.getNombre}</td>
                <td class="d-flex flex-wrap">${paletaColores}</td>
            </tr>
        `;
    });
}

let validarNombreEscena = function(nombre) {
    let valido = true;
    escenas.forEach(escena => {
        if (escena.getNombre == nombre) {
            valido = false;
        }
    });
    return valido;
}
let  updateTable = function() {
    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    proyectos.forEach((proyecto, index) => {
        let paletaColores = proyecto.getEscena.getPalette.getColores.map(color => `<div class="color-picker" style="background-color:${color};"></div>`).join('');
        tableBody.innerHTML += `
            <tr>
                <td>${proyecto.getId}</td>
                <td><a href="site/Escena.html" onclick="saveEscena(${index});">${proyecto.getNombre}</a></td>
                <td>${proyecto.getTamaño}</td>
                <td>${proyecto.getFechaCreacion}</td>
                <td> Escena: ${proyecto.getEscena.getNombre} Resolucion: ${proyecto.getEscena.getPixeles} x ${proyecto.getEscena.getPixeles} Pixeles Paleta de colores: ${proyecto.getEscena.getPalette.getNombre}</td>
                <td class="d-flex flex-wrap">${paletaColores}</td>
            </tr>
        `;
    });
}

let  saveEscena = function(index) {
    localStorage.setItem("currentEscena", JSON.stringify(proyectos[index].getEscena));
}

let escenaActual = null;
let paletaInicial = null;

let  loadEscena = function() {
    let escenaData = localStorage.getItem("currentEscena");
    if (escenaData) {
        let escenaObj = JSON.parse(escenaData);
        escenaActual = new Escena(escenaObj._nombre, escenaObj._pixeles, new Paleta(escenaObj._palette._nombre, escenaObj._palette._colores),escenaObj._paletas);
        paletaInicial = escenaActual.getPalette;
        document.getElementById("PROYECTO-NAME").innerHTML += escenaActual.getNombre;
        crearCuadricula(escenaActual);
        mostrarPaleta(escenaActual.getPalette);
        mostrarTodasPaletas();
        cargarSelectPaletas();
    } else {
        alert("No se pudo cargar la escena.");
    }
}

let  crearCuadricula = function(escena) {
    let container = document.getElementById("CUADRICULA");
    container.innerHTML = "";
    for (let i = 0; i < escena.getPixeles; i++) {
        let row = document.createElement("div");
        row.className = "grid-row";
        for (let j = 0; j < escena.getPixeles; j++) {
            let cell = document.createElement("div");
            cell.className = "grid-cell";
            cell.id = `cell-${i}-${j}`;
            cell.onclick = () => changeColor(i, j);
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

let  mostrarPaleta = function(paleta) {
    let paletaContainer = document.getElementById("paletaContainer");
    paletaContainer.innerHTML = `<h3>${paleta.getNombre}</h3>`;
    paleta.getColores.forEach(color => {
        paletaContainer.innerHTML += `<div class="color-picker" style="background-color:${color};" onclick="seleccionarColor('${color}')"></div>`;
    });
}

let  seleccionarColor = function(color) {
    colorSeleccionado = color;
    console.log(`Color seleccionado: ${color}`);
}

let  cargarSelectPaletas = function() {
    let selectContainer = document.getElementById('selectContainer');
    selectContainer.innerHTML = '';

    let label = document.createElement('label');
    label.setAttribute('for', 'select-paletas');
    label.classList.add('form-label');
    label.innerText = 'Seleccionar paleta';

    let select = document.createElement('select');
    select.classList.add('form-select');
    select.setAttribute('id', 'select-paletas');
    select.onchange = function() {
        let selectedIndex = select.selectedIndex;
        escenaActual.setPalette = paletasPredefinidas[selectedIndex];
        mostrarPaleta(escenaActual.getPalette);
    };

    paletasPredefinidas.forEach((paleta, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.innerText = paleta.getNombre;
        select.appendChild(option);
    });

    selectContainer.appendChild(label);
    selectContainer.appendChild(select);
}

let  mostrarTodasPaletas = function() {
    let container = document.getElementById("paletasContainer");
    container.innerHTML = "";
    paletasPredefinidas.forEach((paleta, index) => {
        let paletaHtml = `<div class="col-4 d-flex justify-content-evenly"><div class="row" onclick="asignarPaleta(${index})">`;
        let btnEditHtml = `<div class="col-4 d-flex justify-content-evenly"><div class="row">`;
        let btnDltHtml = `<div class="col-4 d-flex justify-content-evenly"><div class="row">`;
        paleta.getColores.forEach(color => {
            paletaHtml += `<div class="color-picker" style="background-color:${color};"></div>`;
        });
        btnEditHtml += `<button class="btn btn-sm btn-secondary" onclick="editarPaleta(${index})">Editar Paleta</button>`;
        btnDltHtml += `<button class="btn btn-sm btn-secondary" onclick="eliminarPaleta(${index})">Eliminar Paleta</button>`;
        paletaHtml += `</div></div>`;
        btnEditHtml += `</div></div>`;
        btnDltHtml += `</div></div>`;
        container.innerHTML += paletaHtml+btnEditHtml+btnDltHtml;
    });
    container.innerHTML += `<div class="row"><button class="btn btn-sm btn-secondary" onclick="crearNuevaPaleta()">Crear Nueva Paleta</button></div>`;
}

let  asignarPaleta = function(index) {
    escenaActual.setPalette = paletasPredefinidas[index];
    mostrarPaleta(escenaActual.getPalette);
    actualizarSelectPaletas(index);
}

let  actualizarSelectPaletas = function(index) {
    document.getElementById('select-paletas').selectedIndex = index;
}

let crearNuevaPaleta = function() {
    let nombre = prompt("Ingrese el nombre de la nueva paleta:");
    if (nombre === null) {
        return;
    }else{
        if(validarNombrePaleta(nombre)) {
            if (nombre) {
                valido = true;
                let colores = [];
                for (let i = 0; i < 5; i++) {
                    let color = prompt(`Ingrese el color ${i + 1} en formato hexadecimal (ej. #FFFFFF):`);
                    if(color === null){
                        i--;
                        valido = false;
                        break;
                    }else{
                        if (validarFormatoColores(color)){
                            colores.push(color);
                        }else{
                            alert('Ingrese un color en formato hexadecimal')
                            i--;
                        }
                    }    
                }
                if(valido){
                    let nuevaPaleta = new Paleta(nombre, colores);
                    paletasPredefinidas.push(nuevaPaleta);
                    mostrarTodasPaletas();
                }
            } else {
                alert("El nombre de la paleta no puede estar vacío.");
            }
        }else{
            alert("Ya existe una paleta con ese nombre.");
        } 
    }
}

let validarNombrePaleta = function(nombre) {
    let valido = true;
    paletasPredefinidas.forEach(paleta => {
        if (paleta.getNombre == nombre) {
            valido = false;
        }
    });
    return valido;
}
let validarFormatoColores = function(color) {
    const expresionHex = /^#[0-9a-fA-F]{6}$/;
    if (expresionHex.test(color)) {
        return true;
    } else {
        return false;
    }
}

let  editarPaleta = function(index) {
    paletaEnEdicion = paletasPredefinidas[index];
    let modalBody = document.getElementById("editPaletaBody");
    modalBody.innerHTML = "";

    paletaEnEdicion.getColores.forEach((color, i) => {
        modalBody.innerHTML += `
            <div class="row mb-2">
                <div class="col-2">
                    <div class="color-picker" style="background-color:${color};"></div>
                </div>
                <div class="form-floating mb-3 col-10">
                    <input type="text" class="form-control" id="color-input-${i}" placeholder="${color}">
                    <label for="color-input-${i}">${color}</label>
                </div>
            </div>
        `;
    });

    let modal = new bootstrap.Modal(document.getElementById("editPaletaModal"));
    modal.show();
}
let eliminarPaleta= function(index){
    paletaAEliminar = paletasPredefinidas[index];
    paletaActual = escenaActual.getPalette.getNombre
    if (paletaAEliminar.getNombre == paletaInicial.getNombre || paletaActual == paletaAEliminar.getNombre){
        alert("No se puede eliminar la paleta Actual ni la paleta inicial");
    }else{
        paletasPredefinidas.splice(index, 1);
        cargarSelectPaletas();
        mostrarTodasPaletas();  
    }
}

let  guardarCambiosPaleta = function() {
    if (paletaEnEdicion) {
        paletaEnEdicion.getColores.forEach((color, i) => {
            let nuevoColor = document.getElementById(`color-input-${i}`).value;
            if(validarFormatoColores(nuevoColor)&& nuevoColor!=="") {
                if (nuevoColor) {
                    paletaEnEdicion.getColores[i] = nuevoColor;
                }
            }else if(nuevoColor === ""){
                paletaEnEdicion.getColores[i] = paletaEnEdicion.getColores[i]
            }else{
                alert('Ingrese un color en formato hexadecimal')
            }    
        });
        mostrarTodasPaletas();
    }
    let modal = bootstrap.Modal.getInstance(document.getElementById("editPaletaModal"));
    modal.hide();
}

let  changeColor = function(i, j) {
    let cell = document.getElementById(`cell-${i}-${j}`);
    cell.style.backgroundColor = colorSeleccionado;
}

window.crearProyecto = crearProyecto;
window.crearCuadricula = crearCuadricula;
window.saveEscena = saveEscena;
window.loadEscena = loadEscena;
window.mostrarPaleta = mostrarPaleta;
window.cargarSelectPaletas = cargarSelectPaletas;
window.mostrarTodasPaletas = mostrarTodasPaletas;
window.asignarPaleta = asignarPaleta;
window.actualizarSelectPaletas = actualizarSelectPaletas;
window.crearNuevaPaleta = crearNuevaPaleta;
window.editarPaleta = editarPaleta;
window.guardarCambiosPaleta = guardarCambiosPaleta;
window.changeColor = changeColor;
window.seleccionarColor = seleccionarColor;