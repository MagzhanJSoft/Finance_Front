import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { TabPanel, TabView } from 'primeng/tabview';
import { AuthService } from '../services/auth.service';
import { ChildComponent } from '../child/child.component';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: true })
  viewContainerRef: ViewContainerRef;
  @ViewChild('templateRef', { read: TemplateRef, static: true })
  templateRef: TemplateRef<any>;

  items: MegaMenuItem[];
  mass_tabs: string[] = [];
  tabcount = 0;
  number = '';
  counttabs = 0;


  ngOnInit(): void {

    this.items = [
      {
        label: 'Справочники',
        icon: 'pi pi-fw pi-video',
        items: [
          [
            {
              label: 'Справочники',
              items: [{
                label: 'Организации',
                command: () => this.openTab('app-organization', 'Организации', '')
              }, {
                label: 'Дети',
                command: () => this.openTab('child-list', 'Дети', '')
              }, {
                label: 'Родители',
                command: () => this.openTab('parent-list', 'Родители', '')
              }]
            }
          ]
        ]
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout()
      }
    ];
  }

  openTab(nameselector: string, nametitle: string, id: string, data?: any) {
    let flag = 0;
    //Предварителная проверка существования вкладки
    this.mass_tabs.forEach((element, index) => {
      if (element == nametitle) {
        flag = index  //если открыта. то передаем индекс
      }
    });

    //если флаг больше 0, тогда открываем уже существующую, передав индекс
    if (flag > 0) {
      this.tabcount = flag
    }
    //иначе если = 0 тогда создаем новую вкладку
    else {
      this.mass_tabs.push(nametitle);
      this.number = id;
      this.viewContainerRef.createEmbeddedView(this.templateRef, { context: { selector: nameselector, title: nametitle, data: data } });
      this.counttabs++
      this.tabcount = this.counttabs - 1;
    }

  }

  removetab() {
    if (this.tabcount > 0) {
      this.counttabs--
      this.viewContainerRef.detach(this.tabcount)?.destroy;
      this.mass_tabs.splice(this.tabcount, 1);

    }

  }

  logout() {
    this.auth.logout().subscribe(
      () => this.router.navigate(['login']),
      error => {
        console.warn(console.error())
      }
    )
  }

}

