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
        this._tamaño=tamaño;
    }
    set setPalette(palette){
        this._tamaño=tamaño;
    }
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
    let fech = fecha.getDate()
    proyectos.push();
}