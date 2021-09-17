import { Todo } from './classes/todo.class.js';
import './styles.css';

import { _Todo, TodoList } from './classes'; /* Si NO especificamos un archivo el busca el index.js por defecto */
import { crearTodoHtml } from './js/componentes';
// import { TodoList } from './classes/todo-list.class.js';

export const todoList = new TodoList();

/* Comieza codigo de ejemplo */
// const tarea = new _Todo( 'Aprender JS!!' );
// const tarea2 = new _Todo( 'Comprar un unicornio' );

// todoList.nuevoTodo( tarea );
// todoList.nuevoTodo( tarea2 );

// console.log(todoList);

// tarea.completado = true;

// crearTodoHtml( tarea ); 
/* Termina codigo de ejemplo */

todoList.todos.forEach( crearTodoHtml ); /* Estas 2 declaraciones son equivalentes === todoList.todos.forEach( todo => crearTodoHtml( todo ) ); */

// todoList.todos[0].imprimirClase();

console.log( 'todos', todoList.todos );

