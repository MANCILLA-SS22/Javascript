let instance = null

class SingletonClass {
    constructor() {
        this.value = Math.random(100);
    }

    static getInstance(){       
        // instance = new SingletonClass(); // SIN SIGNLETON --> (cada vez que se instancie la clase, se generara un numero randoom distinto porque es una instancia nueva de la clase)
        // return instance;

        if (!instance) instance = new SingletonClass(); // CON SIGNLETON --> (Una vez instanciada la clase, retornara un numero randoom, pero cuando se vuelva a instanciar la clase, obtendremos ese mismo numero generado y NO uno diferente)
        return instance;
    }
}

export {SingletonClass};

//Si instanciamos la misma clase 3 veces SIN usar singleton, obtendremos valores diferentes, ya que las posiciones de memoria son distintas. Por ejemplo: 
// SingletonClass { value: 0.8642281676280921 }
// SingletonClass { value: 0.2539351328991728 }
// SingletonClass { value: 0.3429904933757204 }

//Si instanciamos la misma clase 3 veces UTILIZANDO singleton, obtendremos el mismo valor tres veces. Por ejemplo: 
// SingletonClass { value: 0.10207796671769143 }
// SingletonClass { value: 0.10207796671769143 }
// SingletonClass { value: 0.10207796671769143 }

//cd Ejercicio-47
//cd Patron_Singleton
//nodemon index.js