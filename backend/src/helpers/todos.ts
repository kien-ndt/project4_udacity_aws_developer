import { getTodos, createTodo, deleteTodo } from './todosAcess'
// import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'

// TODO: Implement businessLogic

export const getTodosForUser = async (userId: string): Promise<TodoItem[]> => {    
  return getTodos(userId);
}

export const createTodoForUser = async (userId: string, item: CreateTodoRequest): Promise<TodoItem> => {
  return createTodo({
    ...item,
    userId: userId,
    todoId: uuid.v4(),
    createdAt: new Date().toISOString(),
    done: false
  });
}

export const deleteTodoForUser = async (userId: string, todoId: string): Promise<void> => {
  return deleteTodo(userId, todoId);
}