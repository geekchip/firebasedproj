import { Component, OnInit } from '@angular/core';
import { TaskService} from '../../services/task.service';
import { Task } from '../../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks : Task[];
  notes_title : string;

  constructor(private taskService:TaskService) {
    this.taskService.getTasks()
    .subscribe(tasks => {
      console.log(tasks);
      this.tasks = tasks;
    });

   }
   addTask(event){
     event.preventDefault();
     console.log(this.notes_title);
     var newTask = {
       notes_title : this.notes_title
     }
     this.taskService.addTask(newTask)
     .subscribe(task => {
       this.tasks.push(task);
       this.notes_title = '';

     });

   }

   deleteTask(id){
     var tasks = this.tasks;
     this.taskService.deleteTask(id).subscribe(data => {
       if(data.n == 1){
         for(var i = 0;i < tasks.length;i++){
           if(tasks[i]._id == id){
             tasks.splice(i,1);
           }
         }
       }

     });
   }

   updateStatus(task){
     var _task = {
       _id : task._id,
       notes_title : task.notes_title,
       notes_views : !task.notes_views
     };
     this.taskService.updateStatus(_task).subscribe(data =>{
      // notes_views : !task.notes_views;

     });
   }

  ngOnInit() {
  }

}
