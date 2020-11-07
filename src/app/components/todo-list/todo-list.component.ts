import { Component, OnInit } from '@angular/core';
import { IList } from 'src/app/modals/todo';
import { TodoListService } from 'src/app/services/todo-list.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  label = 'Todo lists';
  newList = '';
  lists: IList[] = [];

  constructor(
    private todoListService: TodoListService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.todoListService.getLists().subscribe(res => {
      this.lists = res;
    }, () => {
      this.snackBar.open('Get lists Error', null, { duration: 2000, verticalPosition: 'top' });
    });
  }

  addNewList() {
    this.todoListService.createList(this.newList).subscribe(res => {
      this.lists.unshift(res);
      this.newList = '';
    }, () => {
      this.snackBar.open('Create list error', null, { duration: 2000, verticalPosition: 'top' });
    });
  }

  deleteList(id: number) {
    this.todoListService.deleteList(id).subscribe( () => {
      const index = this.lists.findIndex(obj => obj.id === id);
      this.lists.splice(index, 1);
    }, () => {
      this.snackBar.open('deleteList Error', null, { duration: 2000, verticalPosition: 'top' });
    });
  }

}
