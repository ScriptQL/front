import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Page} from "../../../../interfaces/page";
import {Role} from "../../../../interfaces/role";
import {RoleService} from "../../../../services/role.service";

@Component({
  selector: 'shared-multiple-role-select',
  templateUrl: './multiple-role-select.component.html',
  styleUrls: ['./multiple-role-select.component.scss']
})
export class MultipleRoleSelectComponent implements OnInit {
  
  roles$: Observable<Page<Role>>;

  @Input()
  selected: Role;

  @Output()
  onUpdated = new EventEmitter<Role>();

  constructor(
    private service: RoleService
  ) {
  }

  ngOnInit(): void {
    this.roles$ = this.service.search(1);
  }

  onUpdate($event: Role) {
    this.onUpdated.emit($event);
  }
}
