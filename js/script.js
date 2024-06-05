class Paleta {
    constructor(nombre, colores) {
        this._nombre = nombre;
        this._colores = colores;
    }

    // Getters
    get getNombre() {
        return this._nombre;
    }

    get getColores() {
        return this._colores;
    }

    // Setters
    set setNombre(nombre) {
        this._nombre = nombre;
    }

    set setColores(colores) {
        this._colores = colores;
    }
}

let paletaInicial = new Paleta("Paleta Inicial", ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF"]);
let paleta2 = new Paleta("Paleta 2", ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"]);
let paleta3 = new Paleta("Paleta 3", ["#8B4513", "#A0522D", "#228B22", "#006400", "#8FBC8F"]);
let paleta4 = new Paleta("Paleta 4", ["#000080", "#0000CD", "#1E90FF", "#87CEEB", "#E0FFFF"]);
let paleta5 = new Paleta("Paleta 5", ["#7C0A02", "#D32F2F", "#FF5722", "#FF9800", "#FFC107"]);
let paleta6 = new Paleta("Paleta 6", ["#FF4500", "#FF8C00", "#FFA500", "#FFD700", "#FFFF00"]);
let paleta7 = new Paleta("Paleta 7", ["#2E2B5F", "#4B0082", "#8A2BE2", "#DA70D6", "#EE82EE"]);

let paletasPredefinidas = [paletaInicial, paleta2, paleta3, paleta4, paleta5, paleta6, paleta7];

document.addEventListener("DOMContentLoaded", function() {
    cargarSelectPaletasIniciales();
});

function cargarSelectPaletasIniciales() {
    let select = document.getElementById('select-paletas');
    paletasPredefinidas.forEach((paleta, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.innerText = paleta.getNombre;
        select.appendChild(option);
    });

    // Mostrar la primera paleta por defecto
    mostrarPaletaSeleccionada();
}

function mostrarPaletaSeleccionada() {
    let select = document.getElementById('select-paletas');
    let index = select.value;
    let paleta = paletasPredefinidas[index];
    let paletaContainer = document.getElementById("paletaSeleccionadaContainer");
    paletaContainer.innerHTML = `<h3>${paleta.getNombre}</h3>`;
    paleta.getColores.forEach(color => {
        paletaContainer.innerHTML += `<div class="color-picker" style="background-color:${color}; width:20px; height:20px; display:inline-block; margin:2px;"></div>`;
    });
}

class Escena {
    constructor(nombre, pixeles, palette = paletaInicial) {
        this._nombre = nombre;
        this._pixeles = pixeles;
        this._palette = palette;
    }

    // Getters
    get getNombre() {
        return this._nombre;
    }

    get getPixeles() {
        return this._pixeles;
    }

    get getPalette() {
        return this._palette;
    }

    // Setters
    set setNombre(nombre) {
        this._nombre = nombre;
    }

    set setPixeles(pixeles) {
        this._pixeles = pixeles;
    }

    set setPalette(palette) {
        this._palette = palette;
    }
}

class Proyecto {
    constructor(id, nombre, tamaño, fechaCreacion, escena) {
        this._id = id;
        this._nombre = nombre;
        this._tamaño = tamaño;
        this._fechaCreacion = fechaCreacion;
        this._escena = escena;
    }

    // Getters
    get getId() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get tamaño() {
        return this._tamaño;
    }

    get fechaCreacion() {
        return this._fechaCreacion;
    }

    get getEscena() {
        return this._escena;
    }

    // Setters
    set nombre(nombre) {
        this._nombre = nombre;
    }

    set tamaño(tamaño) {
        this._tamaño = tamaño;
    }

    set fechaCreacion(fechaCreacion) {
        this._fechaCreacion = fechaCreacion;
    }
}

let proyectos = [];

function crearProyecto() {
    let nom = document.getElementById("p-nom").value;
    let tam = document.getElementById("p-px").value;
    let paletaIndex = document.getElementById("select-paletas").value;
    let paletaInicial = paletasPredefinidas[paletaIndex];

    if (nom && tam) {
        let id = proyectos.length + 1;
        let fechaCreacion = new Date().toLocaleString();
        let escena = new Escena(nom, tam, paletaInicial);
        let p = new Proyecto(id, nom, tam, fechaCreacion, escena);
        proyectos.push(p);
        updateTable();
    } else {
        alert("Por favor, complete todos los campos.");
    }
}

function updateTable() {
    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    
    proyectos.forEach((proyecto, index) => {
        let paletaColores = proyecto.getEscena.getPalette.getColores.map(color => `<div class="color-picker" style="background-color:${color}; width:20px; height:20px; display:inline-block; margin:2px;"></div>`).join('');
        let row = `<tr>
            <td>${proyecto.getId}</td>
            <td><a href="site/Escena.html" onclick="saveEscena(${index})">${proyecto.nombre}</a></td>
            <td>${proyecto.tamaño}</td>
            <td>${proyecto.fechaCreacion}</td>
            <td>${proyecto.getEscena}</td>
            <td>${paletaColores}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function saveEscena(index) {
    localStorage.setItem("currentEscena", JSON.stringify(proyectos[index].getEscena));
}

function mostrarPaleta(paleta) {
    let paletaContainer = document.getElementById("paletaContainer");
    paletaContainer.innerHTML = `<h3>${paleta.getNombre}</h3>`;
    paleta.getColores.forEach(color => {
        paletaContainer.innerHTML += `<div class="color-picker" style="background-color:${color};" onclick="seleccionarColor('${color}')"></div>`;
    });
}

function seleccionarColor(color) {
    colorSeleccionado = color;
    console.log(`Color seleccionado: ${colorSeleccionado}`);
}

let escenaActual = null;

function loadEscena() {
    let escenaData = localStorage.getItem("currentEscena");
    if (escenaData) {
        let escenaObj = JSON.parse(escenaData);
        escenaActual = new Escena(escenaObj._nombre, escenaObj._pixeles, new Paleta(escenaObj._palette._nombre, escenaObj._palette._colores));
        crearCuadricula(escenaActual);
        mostrarPaleta(escenaActual.getPalette);
        mostrarTodasPaletas();
        cargarSelectPaletas();
    } else {
        alert("No se pudo cargar la escena.");
    }
}

function cargarSelectPaletas() {
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

function mostrarTodasPaletas() {
    let container = document.getElementById("paletasContainer");
    container.innerHTML = "";
    paletasPredefinidas.forEach((paleta, index) => {
        let paletaHtml = `<div class="col"><div class="row mb-2" onclick="asignarPaleta(${index})">`;
        paleta.getColores.forEach(color => {
            paletaHtml += `<div class="color-picker" style="background-color:${color};"></div>`;
        });
        paletaHtml += `</div></div><div class="col">`;
        paletaHtml += `<button class="btn btn-sm btn-secondary" onclick="editarPaleta(${index})">Editar Paleta</button></div>`;
        container.innerHTML += paletaHtml;
    });
    container.innerHTML += `<div class="row"><button class="btn btn-sm btn-secondary" onclick="crearNuevaPaleta()">Crear Nueva Paleta</button></div>`;
}

function asignarPaleta(index) {
    escenaActual.setPalette = paletasPredefinidas[index];
    mostrarPaleta(escenaActual.getPalette);
    actualizarSelectPaletas(index);
}

function actualizarSelectPaletas(index) {
    document.getElementById('select-paletas').selectedIndex = index;
}

function crearNuevaPaleta() {
    let nombre = prompt("Ingrese el nombre de la nueva paleta:");
    if (nombre) {
        let colores = [];
        for (let i = 0; i < 5; i++) {
            let color = prompt(`Ingrese el color ${i + 1} en formato hexadecimal (ej. #FFFFFF):`);
            if (color) colores.push(color);
        }
        let nuevaPaleta = new Paleta(nombre, colores);
        paletasPredefinidas.push(nuevaPaleta);
        mostrarTodasPaletas();
    } else {
        alert("El nombre de la paleta no puede estar vacío.");
    }
}

function editarPaleta(index) {
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

function guardarCambiosPaleta() {
    if (paletaEnEdicion) {
        paletaEnEdicion.getColores.forEach((color, i) => {
            let nuevoColor = document.getElementById(`color-input-${i}`).value;
            if (nuevoColor) {
                paletaEnEdicion.getColores[i] = nuevoColor;
            }
        });
        mostrarTodasPaletas();
    }
    let modal = bootstrap.Modal.getInstance(document.getElementById("editPaletaModal"));
    modal.hide();
}

function changeColor(i, j) {
    let cell = document.getElementById(`cell-${i}-${j}`);
    cell.style.backgroundColor = colorSeleccionado;
}

window.crearProyecto = crearProyecto;
window.crearCuadricula = crearCuadricula;