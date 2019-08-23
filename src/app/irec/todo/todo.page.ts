import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from '../../services/irec/todo.service';
import { AuthService } from '../../services/irec/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private router: Router
  ) { }

  todos: Todo[];

  ngOnInit() {
    this.getTodos();
  }

  getTodos():void{
    this.todoService.getTodos()
    .subscribe(todos => {
      console.log(todos);
      this.todos = todos;
    })

  }

}
