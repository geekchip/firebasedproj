import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/Rx';
import { map } from "rxjs/operators";
// import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private http:Http) { 
    console.log("task service initiated..");
  }

  getTasks() {
    return this.http.get('http://localhost:3000/api/tasks')
    .pipe(map((res:any) => res.json()));
  }

  addTask(newTask){
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/api/task',JSON.stringify(newTask), {headers : headers})
    .pipe(map((res:any) => res.json()));
  }

  deleteTask(id) {
     return this.http.delete('http://localhost:3000/api/task/' + id)
     .pipe(map((res:any) => res.json()));
  }

  updateStatus(task){
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('http://localhost:3000/api/task/' + task._id,JSON.stringify(task), {headers : headers})
    .pipe(map((res:any) => res.json()));
  }
}
