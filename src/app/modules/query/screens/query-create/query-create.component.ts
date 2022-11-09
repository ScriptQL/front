import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {FormService} from "../../../../services/form.service";
import {Role} from "../../../../interfaces/role";
import {MatSnackBar} from "@angular/material/snack-bar";
import {QueryService} from "../../../../services/query.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddReviewerRoleModal} from "../../modals/add-reviewer-role-modal/add-reviewer-role-modal.component";
import {DataSource} from "../../../../interfaces/data-source";
import {DataSourceService} from "../../../../services/data-source.service";

@Component({
  selector: 'app-query-create',
  templateUrl: './query-create.component.html',
  styleUrls: ['./query-create.component.scss']
})
export class QueryCreateComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  reviewers: Role[] = [];

  constructor(
    private forms: FormService,
    private _snackBar: MatSnackBar,
    private service: QueryService,
    private router: Router,
    private dialog: MatDialog,
    private connections: DataSourceService,
  ) {
    this.form = this.forms.group({
      title: ['', [
        Validators.required
      ]],
      query: ['', [
        Validators.required,
        Validators.maxLength(4000)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(4000)
      ]],
      connection: [undefined, [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.dialog.open(AddReviewerRoleModal, {}).afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      this.reviewers.push(data);
    });
  }

  onKick(role: Role): void {
    this.reviewers = this.reviewers.filter(r => r != role);
  }

  onSave(): void {
    if (!this.forms.check(this.form)) {
      return;
    } else if (this.reviewers.length == 0) {
      this.showError('Nenhum reviewer adicionado');
      return;
    }
    this.forms.setLoading(this.form, (this.loading = true));
    // -- Save
    const request = this.form.getRawValue();
    request['reviewers'] = this.reviewers.map(r => r.id);
    this.service.create(request).subscribe({
      next: (data) => {
        this.router.navigate(['/queries', data.id]).finally();
      },
      error: (error) => {
        this.showError(error.error?.message);
        this.forms.setLoading(this.form, (this.loading = false));
      }
    });
  }

  showError(message: string): void {
    this._snackBar.open(message, undefined, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  onDataSource($event: DataSource): void {
    const control = this.form.controls['connection'];
    control.patchValue($event.id);

    this.connections.fetchReviewers($event.id).subscribe({
      next: (data) => {
        data.forEach(role => this.reviewers.push(role));
      },
      error: (error) => {
        this.showError(error.error?.message);
      }
    });
  }

}
