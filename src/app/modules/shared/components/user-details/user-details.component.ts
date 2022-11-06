import {Component, Input} from '@angular/core';
import {User} from "../../../../interfaces/user";

@Component({
  selector: 'shared-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  @Input()
  user: User;

}
