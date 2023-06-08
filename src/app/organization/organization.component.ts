import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { listOrg } from '../interfaces';
import { OrganizationsService } from '../services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  constructor(private orgService: OrganizationsService) { }

  organizations$: Observable<listOrg>
  first = 0
  rows = 3
  last = 3

  ngOnInit() {
    this.fetchOrg()
  }

  fetchOrg() {

    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }

    this.organizations$ = this.orgService.fetch(params)

  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchOrg()
  }

}
