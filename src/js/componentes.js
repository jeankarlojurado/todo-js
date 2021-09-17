import { TodoList, _Todo } from '../classes';
import { todoList } from '../index'

// Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo'); 
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters'); 
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }"> 
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;

}

// Eventos
txtInput.addEventListener('keyup', ( event ) => {

    // console.log(event);

    if ( (event.keyCode === 13) && (txtInput.value.length > 0) ) {

        // console.log( txtInput.value );
        const nuevoTodo = new _Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        // console.log(todoList);
        crearTodoHtml( nuevoTodo );
        txtInput.value = '';

    }

});

divTodoList.addEventListener('click', ( event ) => {

    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    // console.log( nombreElemento );

    if ( nombreElemento.includes('input') ) { // click en el check

        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    } else if ( nombreElemento.includes('button') ) { // hay que borra el Todo

        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );

    }

    // console.log(todoList);

});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length-1; i>= 0 ; i-- ) {

        const elemento = divTodoList.children[i]; 
        // console.log(elemento);

        if( elemento.classList.contains( 'completed' ) ) {
            divTodoList.removeChild( elemento );
        }


    }

})

ulFiltros.addEventListener('click', ( event ) => {

    console.log( event.target.text );
    const filtro = event.target.text;

    if( !filtro ) return; /* Estas 2 declaraciones son equivalentes === if( !filtro ) { return; } NOTA: Recordar que por defecto retorna falso */
    
    anchorFiltros.forEach( elemento => elemento.classList.remove('selected') );
    console.log( event.target ); /* Retorna el tag <a></a> */
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ) {

        elemento.classList.remove('hidden'); /* Con esto aseguro el comportamiento por defecto, osea que los muestre todos */
        const completado = elemento.classList.contains( 'completed' );

        switch( filtro ) {

            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;

        }

    }

});

