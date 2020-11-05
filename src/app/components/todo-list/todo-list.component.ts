import { Component, OnInit } from '@angular/core';
import { IList } from 'src/app/modals/todo';
import { TodoListService } from 'src/app/services/todo-list.service';

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
    private todoListService: TodoListService
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.todoListService.getLists().subscribe(res => {
      this.lists = res;
      console.log(this.lists);
    }, error => {
      console.log('getLists Error', error);
    });
  }

  addNewList() {
    this.todoListService.createList(this.newList).subscribe(res => {
      this.lists.unshift(res);
      this.newList = '';
    }, error => {
      console.log('createList Error', error);
    });
  }

  deleteList(id: number) {
    this.todoListService.deleteList(id).subscribe(res => {
      const index = this.lists.findIndex(obj => obj.id === id);
      this.lists.splice(index, 1);
    }, error => {
      console.log('deleteList Error', error);
    });
  }

}
