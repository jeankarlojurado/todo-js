import { _Todo } from "./todo.class";

export class TodoList {

    constructor() {

        //this.todos = [];
        this.cargarLocalStorage();

    }

    nuevoTodo( todo ) {

        this.todos.push( todo );
        this.guardarLocalStorage();

    }

    eliminarTodo( id ) {

        this.todos = this.todos.filter( todo => todo.id != id ); /* Hace un nuevo vector incluyendo todos los ids EXCEPTO el que viene por parametro */
        this.guardarLocalStorage();

    }

    marcarCompletado( id ) {

        for( const todo of this.todos ) {
           
            // console.log( id, todo.id ); /* El que viene por parametro es string y el otro # */

            if( todo.id == id ) {

                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break; /* Por que no va a haber un Todo con el mismo id */
            }

        }

    }

    eliminarCompletados() {
        
        this.todos = this.todos.filter( todo => !todo.completado ); /* Hace un nuevo vector incluyendo todos los todos que NO esten completados, por eso se trabaja con logica inversa */
        this.guardarLocalStorage();

    }

    guardarLocalStorage() {

        localStorage.setItem( 'todo', JSON.stringify( this.todos ) );

    }

    cargarLocalStorage() {

        // if( localStorage.getItem('todo') ) {

        //     this.todos = JSON.parse( localStorage.getItem('todo') );
        //     console.log( 'cargarLocal:', this.todos )

        // } else {

        //     this.todos = [];

        // }

        // Lo mismo con operador ternario
        this.todos = ( localStorage.getItem('todo') ) ? JSON.parse( localStorage.getItem('todo') ) : [];

        this.todos = this.todos.map( _Todo.fromJson ); /* Estas 2 declaraciones son equivalentes === this.todos = this.todos.map( obj => _Todo.fromJson( obj ) ); */

    }

}