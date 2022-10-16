import { getTodos, createTodo, patchTodoAttachmentUrl, deleteTodo } from './todosAcess'
import { createSignedUrl, getAttachmentUrl } from './attachmentUtils'
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

export const createAttachmentPresignedUrl = async (userId: string, todoId: string): Promise<string>  => {
  const uploadUrl = createSignedUrl(todoId);
  await patchTodoAttachmentUrl(userId, todoId, getAttachmentUrl(todoId))
  return uploadUrl;
}

export const deleteTodoForUser = async (userId: string, todoId: string): Promise<void> => {
  return deleteTodo(userId, todoId);
}