export function AddTodo(name) {
    return {
        type: 'AddTodo',
        name
    }
}

export function editTodo(id, name) {
    return {
        type: 'editTodo',
        id,
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

export function GetData(data) {
    return {
        type: 'GetData',
        data
    }
}

export function DeleteAll() {
    return {
        type: 'DeleteAll'
    }
}

export function DoneAll() {
    return {
        type: 'DoneAll'
    }
}