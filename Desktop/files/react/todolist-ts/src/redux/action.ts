import { nanoid } from "nanoid";

export const load: string = 'load';
export const add: string = 'add';
export const dele: string = 'delete';
export const remove: string = 'remove';
export const update: string = 'update';
export const allAdd: string = 'allAdd'
export const allDele: string = 'alldele'

export function loadTodo(title:string) {
    return { type: add, title: title, id: nanoid(), completed: false }
}
export function addTodo(title:string) {
    return { type: add, title: title, id: nanoid(), completed: false }
}
export function deleteTodo(id:any) {
    return { type: dele, id: id }
}
export function removeTodo() {
    return { type: remove }
}
export function updateTodo(id:any) {
    return { type: update, id: id }
}
export function allAddTodo() {
    return { type: allAdd }
}
export function allDeleTodo() {
    return { type: allDele }
}
