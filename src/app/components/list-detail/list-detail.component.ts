import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from 'src/app/modals/todo';
import { TodoListService } from 'src/app/services/todo-list.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  listId: number;
  listName = '';
  periousListName = '';
  newTask = '';

  tasks: ITask[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private todoListService: TodoListService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.listId = +params.get('id');
      this.listName = params.get('name');
      this.periousListName = this.listName;
      this.getTasks();
    });
  }

  getTasks() {
    this.taskService.getTasks(this.listId).subscribe(res => {
      this.tasks = res;
    }, error => {
      console.log('getTasks Error', error);
    });
  }

  editListName() {
    this.todoListService.updateList(this.listId, this.listName).subscribe(res => {
      this.periousListName = this.listName;
    }, error => {
      console.log('getTasks Error', error);
    });
  }

  addNewTask() {
    this.taskService.createTask(this.listId, this.newTask).subscribe(res => {
      this.tasks.unshift(res);
      this.newTask = '';
    }, error => {
      console.log('createTask Error', error);
    });
  }

  onCheckbox(taskId: number) {
    this.tasks.map( item => {
      if (item.id === taskId) {
        item.completed = !item.completed;
        this.taskService.updateTask(this.listId, taskId, item).subscribe(res => {
          console.log('RESS', res);
        }, error => {
          console.log('deleteList Error', error);
        });
      }
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(this.listId, id).subscribe(res => {
      const index = this.tasks.findIndex(obj => obj.id === id);
      this.tasks.splice(index, 1);
    }, error => {
      console.log('deleteList Error', error);
    });
  }

  editTask(task: ITask) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      task
    };
    const dialogRef = this.dialog.open(EditTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log('Dialog output:', data);
      this.taskService.updateTask(data.list_id, data.id, data).subscribe(res => {
        console.log('RESS', res);
      }, error => {
        console.log('deleteList Error', error);
      });
    });
  }
}
