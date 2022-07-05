import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { UsersService } from '../../../services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Novel, Genre } from 'src/app/models/models';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { NovelsService } from '../../../services/novels.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageService } from '../../../services/page.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-novels-management',
  templateUrl: './novels-management.component.html',
  styleUrls: ['./novels-management.component.scss']
})
export class NovelsManagementComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('novelsPaginator', {static: true}) novelsPaginator: MatPaginator;
  @ViewChild('genresPaginator', {static: true}) genresPaginator: MatPaginator;
  public successSnackMessage: string;
  public errorSnackMessage: string;
  novelsDisplayedColumns: string[];
  novelsDataSource: any;
  genresDataSource: any;
  genresDisplayedColumns = ['id', 'genre_name'];
  novels: Array<Novel>;
  genres: Array<Genre>;
  genre: Genre;
  currentTab = 'novels';
  loading = true;
  uploading = false;
  mobile: boolean;
  NewGenreForm: FormGroup;

  constructor(private router: Router,
              private as: AdminService,
              private us: UsersService,
              private ns: NovelsService,
              public ps: PageService,
              public actionSheetController: ActionSheetController,
              private breakpointObserver: BreakpointObserver) {

                this.NewGenreForm = new FormGroup({
                  genre_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
                });
  }

  ngOnInit(): void {
    this.breakpointObserver
    .observe([Breakpoints.Large = '(max-width: 1151px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.mobile = true;
        this.novelsDisplayedColumns = ['id', 'nvl_title', 'nvl_status'];
      } else {
        this.mobile = false;
        this.novelsDisplayedColumns = ['id', 'user_login', 'nvl_title', 'nvl_status'];
      }
    });

    this.ns.getGenres().subscribe((data: any) => {
      this.genres = data.genres;
      this.genresDataSource = new MatTableDataSource(this.genres);
      this.genresDataSource.paginator = this.genresPaginator;
    }, error => {
      this.router.navigate(['']);
      this.ps.presentToast('danger', error.error.message);
      this.errorSnackMessage = error.error.message;
    });

    this.as.adminGetNovels(this.us.getUserLoged().token).subscribe((data: any) => {
      this.novels = data.novels;
      this.novelsDataSource = new MatTableDataSource(this.novels);
      this.novelsDataSource.sort = this.sort;
      this.novelsDataSource.paginator = this.novelsPaginator;
      this.loading = false;
    }, error => {
      this.router.navigate(['']);
      this.ps.presentToast('danger', error.error.message);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.novelsDataSource.filter = filterValue.trim().toLowerCase();
  }

  swichtTab(tab: string) {
    this.currentTab = tab;
  }

  editGenre(genre: Genre) {
    this.genre = genre;
  }

  createGenre() {
    this.uploading = true;
    this.as.adminCreateGenre(this.us.getUserLoged().token, this.NewGenreForm.value).subscribe((data: any) => {
      // this.genres.push(data.genre);
      this.genresDataSource.data.push(data.genre);
      this.genresDataSource.data = this.genresDataSource.data.slice();
      this.uploading = false;
      this.ps.dialogCloseAll();
      this.NewGenreForm.reset();
      this.ps.presentToast('success', '!Genero creado!');
      this.successSnackMessage = '!Genero creado!';
    }, error => {
      this.uploading = false;
      this.ps.presentToast('danger', error.error.message);
    });
  }

  updateGenre() {
    this.uploading = true;
    this.as.adminUpdateGenre(this.us.getUserLoged().token, this.genre).subscribe((data: any) => {
      // this.genres.push(data.genre);
      this.uploading = false;
      this.ps.dialogCloseAll();
      this.ps.presentToast('success', '!Genero actualizado!');
    }, error => {
      this.uploading = false;
      this.ps.presentToast('danger', error.error.message);
    });
  }

  deleteGenre() {
    this.uploading = true;
    this.as.adminDeleteGenre(this.us.getUserLoged().token, this.genre.id).subscribe((data: any) => {
      this.genresDataSource.data.splice(this.genresDataSource.data.findIndex(x => x.id === this.genre.id), 1);
      this.genresDataSource.data = this.genresDataSource.data.slice();
      this.uploading = false;
      this.ps.presentToast('success', '!Genero eliminado!');
    }, error => {
      this.uploading = false;
      this.ps.presentToast('danger', error.error.message);
    });
  }

  async deleteGenreConfirm() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Eliminar genero',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          this.deleteGenre();
        }
      }, {
        text: 'Cancelar',
        role: 'cancel'
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
