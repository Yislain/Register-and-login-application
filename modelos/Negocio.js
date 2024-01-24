class Negocio{
    constructor(id,data){
        this.bandera=0;
        this.id=id;
        this.titulo=data.titulo;   
        this.identificacion=data.identificacion;   
        this.correo=data.correo;  
        this.metodopago=data.metodopago; 
        //this.userid=data.userid;
    }
    set id(id){
        if(id!=null)
        id.length>0?this._id=id:bandera=1;
    }

    set titulo(titulo){
        titulo.length>0?this._titulo=titulo:this.bandera=1;
    }
    
    set identificacion(identificacion){
        identificacion.length>0?this._identificacion=identificacion:this.bandera=1;
    }

    set correo(correo){
        correo.length>0?this._correo=correo:this.bandera=1;
    }

    set metodopago(metodopago){
        metodopago.length>0?this._metodopago=metodopago:this.bandera=1;
    }

   /*set userid(userid){
        userid.length>0?this._userid=userid:this.bandera=1;
    }*/

    get id(){
        return this._id;
    }

    get titulo(){
        return this._titulo;
    }

    get identificacion(){
        return this._identificacion;
    }

    get correo(){
        return this._correo;
    }

    get metodopago(){
        return this._metodopago;
    }
    /*get userid(){
        return this._userid;
    }*/

    
    get obtenerDatos(){
        if(this._id==null){
            return {
                titulo:this.titulo,
                identificacion:this.identificacion,
                correo:this.correo,
                metodopago:this.metodopago,
                //userid:this.userid,
            }
        }else{
            return{
                id:this.id,
                titulo:this.titulo,
                identificacion:this.identificacion,
                correo:this.correo,
                metodopago:this.metodopago,
                //userid:this.userid,
            }
        }

    }
}

module.exports=Negocio;