export function AddTodo(name) {
    return {
        type: 'AddTodo',
        name
    }
}

export function editTodo(name) {
    return {
        type: 'editTodo',
        name
    }
}

export function deleteTodo(id) {
    return {
        type: 'deleteTodo',
        id
    }
}

export function doneTdodo(id) {
    return {
        type: 'doneTdodo',
        id
    }
}

export function getData() {
    return {
        type:'getData'
    }
}