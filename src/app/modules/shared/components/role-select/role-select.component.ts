import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Page} from "../../../../interfaces/page";
import {Role} from "../../../../interfaces/role";
import {RoleService} from "../../../../services/role.service";

@Component({
  selector: 'shared-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.scss']
})
export class RoleSelectComponent implements OnInit {

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
