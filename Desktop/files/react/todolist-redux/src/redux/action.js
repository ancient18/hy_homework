import { nanoid } from "nanoid";

export const load='load';
export const add='add';
export const dele = 'delete';
export const remove =  'remove';
export const update =  'update';
export const allAdd = 'allAdd'
export const allDele = 'alldele'

export function loadTodo(title){
    return {type: add,title:title,id:nanoid(),completed:false}
}
export function addTodo(title){
    return {type: add,title:title,id:nanoid(),completed:false}
}
export function deleteTodo(id){
    return {type: dele,id:id}
}
export function removeTodo(completed){
    return {type: remove}
}
export function updateTodo(id){
    return {type: update,id:id}
}
export function allAddTodo(){
    return {type: allAdd}
}
export function allDeleTodo(){
    return {type: allDele}
}
