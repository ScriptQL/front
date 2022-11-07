import {Component, OnInit} from '@angular/core';
import {mergeMap, Observable, tap} from "rxjs";
import {Query} from "../../../../interfaces/query";
import {ActivatedRoute} from "@angular/router";
import {QueryService} from "../../../../services/query.service";
import {Page} from "../../../../interfaces/page";
import {Review} from "../../../../interfaces/review";
import {ReviewService} from "../../../../services/review.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModal} from "../../modals/confirm-modal/confirm-modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-query-details',
  templateUrl: './query-details.component.html',
  styleUrls: ['./query-details.component.scss']
})
export class QueryDetailsComponent implements OnInit {

  query$: Observable<Query>;
  reviews$: Observable<Page<Review>>;

  constructor(
    private route: ActivatedRoute,
    private service: QueryService,
    private reviews: ReviewService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.query$ = this.route.paramMap.pipe(mergeMap(url => {
      const id = url.get('id');
      return this.service.findById(id).pipe(tap(query => {
        this.reviews$ = this.reviews.search(1, {
          'query': query.id
        });
      }));
    }));
  }

  onExecute(): void {
    this.dialog.open(ConfirmModal, {
      data: {
        title: 'Tem certeza?',
        content: 'Deseja executar esta query?'
      },
      width: '420px'
    }).afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      // execute
    });
  }

  onDownload(): void {

  }

  onReview(query: Query, approved: boolean): void {
    this.dialog.open(ConfirmModal, {
      data: {
        title: `${approved ? 'Aprovar' : 'Rejeitar'} query`,
        content: `Deseja ${approved ? 'aprovar' : 'rejeitar'} esta query?`
      },
      width: '420px'
    }).afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      this.reviews.create({
        query: query.id,
        comment: 'Nenhum comentário',
        accepted: approved
      }).subscribe({
        next: () => {
          location.reload();
        },
        error: (error) => {
          this._snackBar.open(error.error?.message, '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    });
  }

}
