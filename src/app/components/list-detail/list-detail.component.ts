import { Component, OnInit } from '@angular/core';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { TaskService } from 'src/app/services/task.service';

import { ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/modals/todo';
import { TodoListService } from 'src/app/services/todo-list.service';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  listTaskLabel = 'Edit List';
  newTaskLabel = 'Add new tasks';
  listId: number;
  listName = '';
  periousListName = '';
  newTask = '';

  tasksTitle = 'Tasks';
  tasks: ITask[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private todoListService: TodoListService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.listId = +params.get('id');
      this.getTodoDetail();
      this.getTasks();
    });
  }

  getTodoDetail() {
    this.taskService.getListDetail(this.listId).subscribe( res => {
      this.listName = res.name;
      this.periousListName = this.listName;
    }, () => {
      this.snackBar.open('Get tasks name error', null, { duration: 2000, verticalPosition: 'top' });
    });
  }

  getTasks() {
    this.taskService.getTasks(this.listId).subscribe( res => {
      this.tasks = res;
    }, () => {
      this.snackBar.open('Get tasks error', null, { duration: 2000, verticalPosition: 'top' });
    });
  }

  editListName() {
    this.todoListService.updateList(this.listId, this.listName).subscribe( () => {
      this.periousListName = this.listName;
      this.snackBar.open('Update list name success', null, { duration: 2000, verticalPosition: 'top' });
    }, () => {
      this.snackBar.open('Update list name error', null, { duration: 2000, verticalPosition: 'top' });
    });
  }

  addNewTask() {
    this.taskService.createTask(this.listId, this.newTask).subscribe( res => {
      this.tasks.unshift(res);
      this.newTask = '';
    }, () => {
      this.snackBar.open('Create task error', null, { duration: 2000, verticalPosition: 'top' });
    });
  }

  onCheckbox(taskId: number) {
    this.tasks.forEach( item => {
      if ( item.id === taskId ) {
        item.completed = !item.completed;
        this.taskService.updateTask(this.listId, taskId, item).subscribe( () => {
          this.getTasks();
        }, () => {
          this.snackBar.open('Update task error', null, { duration: 2000, verticalPosition: 'top' });
        });
      }
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(this.listId, id).subscribe( () => {
      const index = this.tasks.findIndex(obj => obj.id === id);
      this.getTasks();
    }, () => {
      this.snackBar.open('Delete task error', null, { duration: 2000, verticalPosition: 'top' });
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

    dialogRef.afterClosed().subscribe( data => {
      if (data) {
        this.taskService.updateTask(data.list_id, data.id, data).subscribe( () => {

        }, () => {
          this.snackBar.open('Update task error', null, { duration: 2000, verticalPosition: 'top' });
        });
      }
    });
  }
}
