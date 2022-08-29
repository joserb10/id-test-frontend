import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  array_groups: any[] = [];

  constructor(private group_s: GroupService) { }

  ngOnInit(): void {
    this.group_s.getGroups().subscribe(
      (r) => {
        console.log(r);
        this.array_groups = r['groups'];
      },
      (e) => {
        console.log(e);
      },
      () => {
        console.log('Hecho');
      },
    )

  }

}
