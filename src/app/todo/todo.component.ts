import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos: { id: number, todo: string }[] = [];
  newTodo: string = '';
  editIndex: number | null = null;
  editText: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todoService.addTodo(this.newTodo.trim()).subscribe(() => {
        this.loadTodos();
        this.newTodo = '';
      });
    }
  }

  removeTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }

  editTodo(index: number) {
    this.editIndex = index;
    this.editText = this.todos[index].todo;
  }

  saveTodo() {
    if (this.editText.trim() && this.editIndex !== null) {
      const id = this.todos[this.editIndex].id;
      this.todoService.updateTodo(id, this.editText.trim()).subscribe(() => {
        this.loadTodos();
        this.cancelEdit();
      });
    }
  }

  cancelEdit() {
    this.editIndex = null;
    this.editText = '';
  }
}
