import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) {}


  getAgents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/agent/all`);
  }


  getAdmins(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/amministrator/all`);
  }


  getAllUsers(): Observable<any[]> {
  return forkJoin([this.getAgents(), this.getAdmins()]).pipe(
    tap(([agents, admins]) => {
      console.log('Agenti:', agents);
      console.log('Amministratori:', admins);
    })
  );
}

deleteAgent(agentId: string): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/agent/${agentId}`);
}

deleteAdmin(adminId: string): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/amministrator/${adminId}`);
}
}
