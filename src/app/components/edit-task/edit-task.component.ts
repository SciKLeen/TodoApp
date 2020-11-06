import { Component, OnInit, Inject } from '@angular/core';
import { ITask } from 'src/app/modals/todo';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  task: ITask;
  taskName = '';

  constructor(
    private dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.task = this.data.task;
    this.taskName = this.task.name;
  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.task);
  }

  close() {
    this.task.name = this.taskName;
    this.dialogRef.close();
  }
}
