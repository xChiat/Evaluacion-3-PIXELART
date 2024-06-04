class Escena{
    constructor(nombre,pixeles,palette){
        this._nombre = nombre;
        this._pixeles = pixeles;
        this._palette = palette;
    }
    //Getters
    get getNombre(){
        return this._nombre;
    }
    get getPixeles(){
        return this._pixeles;
    }
    get getPalette(){
        return this._palette;
    }
    //Setters
    set setNombre(nombre){
        this._nombre=nombre;
    }
    set setPixeles(pixeles){
        this._pixeles=pixeles;
    }
    set setPalette(palette){
        this._tamaño=tamaño;
    }
}
let crearEscena = function(pixeles){
    let cuadricula = document.createElement('table');
    cuadricula.id = 'cuadricula';
    let cBody = document.createElement('tbody');
    cBody.id = "table-body";
    document.getElementById('cuadricula').appendChild(cBody);
    for(let i=0; i<pixeles;i++){
        let cRow = document.createElement('tr');
        for(let j=0; j<pixeles; j++){
            let cCell = document.createElement('td');
            cRow.appendChild(cCell);
        }
        cBody.appendChild(cRow);
    }
    document.getElementById('CUADRICULA').appendChild(cuadricula);
}
class Proyecto{
    constructor(id,nombre,tamaño,fechaCreacion,escena){
        this._id=id;
        this._nombre=nombre;
        this._tamaño=tamaño;
        this._fechaCreacion=fechaCreacion;
        this._escena=escena;
    }
    //Getters
    get getId(){
        return this._id;
    }
    get nombre(){
        return this._nombre;
    }
    get tamaño(){
        return this._tamaño;
    }
    get fechaCreacion(){
        return this._fechaCreacion;
    }
    get escena(){
        return this._escena;
    }
    //Setters
    set nombre(nombre){
        this._nombre=nombre;
    }
    set tamaño(tamaño){
        this._tamaño=tamaño;
    }
    set fechaCreacion(fechaCreacion){
        this._fechaCreacion=fechaCreacion;
    }
}
let proyectos = [];

let crearProyecto = function(){
    let nom = document.getElementById("p-nom").value;
    let tam = document.getElementById("p-pix").value; 
    crearEscena(tam);
    p = new Proyecto(nom, tam);
    proyectos.push(p);
}