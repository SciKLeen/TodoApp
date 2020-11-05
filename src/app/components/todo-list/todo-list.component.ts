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
      console.log(this.lists);
    }, err => {
      this.snackBar.open('getLists Error', null, { duration: 2000 });
    });
  }

  addNewList() {
    this.todoListService.createList(this.newList).subscribe(res => {
      this.lists.unshift(res);
      this.newList = '';
    }, err => {
      this.snackBar.open('createList Error', null, { duration: 2000 });
    });
  }

  deleteList(id: number) {
    this.todoListService.deleteList(id).subscribe(res => {
      const index = this.lists.findIndex(obj => obj.id === id);
      this.lists.splice(index, 1);
    }, err => {
      this.snackBar.open('deleteList Error', null, { duration: 2000 });
    });
  }

}
