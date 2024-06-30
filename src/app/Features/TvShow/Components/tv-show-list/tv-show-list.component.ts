import { Component } from '@angular/core';
import { TvShow } from '../../Models/tv-show';
import { TvShowService } from '../../Services/tv-show.service';

@Component({
  selector: 'app-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['./tv-show-list.component.css']
})
export class TvShowListComponent {
  tvShows: TvShow[] = [];

  constructor(private tvShowsService: TvShowService) { }

  tvShow: TvShow = {
    name: '',
    favorite: false
  };

  ngOnInit(): void {
    this.getTvShows();
  };

  onSubmit() {
    this.tvShowsService.addTvShow(this.tvShow).subscribe(response => {
      this.getTvShows();
    })

    this.tvShow = {
      name: '',
      favorite: false
    };
  }

  removeFavorite(name: string) {
    const tvShow: TvShow = {
      name: name,
      favorite: false
    }
    this.tvShowsService.isFavorite(tvShow).subscribe(reponse => {
      this.getTvShows();
    });
  }

  addToFavorite(name: string) {
    const tvShow: TvShow = {
      name: name,
      favorite: true
    }
    this.tvShowsService.isFavorite(tvShow).subscribe(reponse => {
      this.getTvShows();
    });
  }

  deleteTvShow(name: string) {
    this.tvShowsService.deleteTvShow(name).subscribe(response => {
      this.getTvShows();
    });
  }

  private getTvShows() {
    this.tvShowsService.getTvShows().subscribe(data => {
      this.tvShows = data
    });
  }
}
