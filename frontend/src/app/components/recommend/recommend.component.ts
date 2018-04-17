import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { FavoriteService } from '../../services/favorite.service';
import { AlertService } from '../../services/alert.service';

@Component({
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css'],
  inputs:['activeColor','baseColor','overlayColor'],
})

export class RecommendComponent implements OnInit {

  posts: Post[] = [];
  model: any = {};
  comment: any = [];

  postedContent = false;


  constructor
  (private postService: PostService, private router: Router, private http: Http, private alertService: AlertService, private commentService: CommentService, private favoriteService: FavoriteService ) {}

  ngOnInit() {
    this.loadAllPosts();
  }


  // select favorite

  selectFavorite(choosePost) {
    this.model.post = choosePost
    this.favoriteService.create(this.model)
      .subscribe(
        data => {
          alert('choosen!')
        },
        error => {
          alert('already choose!')
        });
  }


  // Create Comment
  createComment() {
    if (localStorage.getItem('currentUser')) {
    } else {
      alert('Please login');
      this.router.navigateByUrl('/login');
    }
  }
  commentRegister(req) {
    this.model.post = req
    this.commentService.create(this.model)
      .subscribe(
        data => {
        },
        error => {
        });
  }

  // Refresh page
  refresh(): void {
    window.location.reload();
  }

  // Create Post
  createPost() {
    if (localStorage.getItem('currentUser')) {
      this.postedContent = true;
    } else {
      alert('Please login');
      this.router.navigateByUrl('/login');
    }
  }

  // http Post post model
  post() {
    this.postService.create(this.model)
      .subscribe(
        data => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          this.alertService.success('Your Post Uploaded!', true);
          this.postedContent = false;
        },
        error => {
          this.alertService.error('Permission Error!');
        });
  }

  // Load all Posts
  private loadAllPosts() {
    this.postService.getAll().subscribe(posts => { this.posts = posts; });
  }



  //  File Uploader
  borderColor: string = '';
  iconColor: string = '';


  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
    this.iconColor = this.overlayColor;
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.loaded = false;
    reader.onload = this._handleReaderLoaded.bind(this);
    console.log(reader.onload)
    reader.readAsDataURL(file);

  }

  _handleReaderLoaded(e) {
    var reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
    this.loaded = true;

    this.model.mainImage = this.imageSrc;
  }

  _setActive() {
    this.borderColor = this.activeColor;
    if (this.imageSrc.length === 0) {
      this.iconColor = this.activeColor;
    }
  }

  _setInactive() {
    this.borderColor = this.baseColor;
    if (this.imageSrc.length === 0) {
      this.iconColor = this.baseColor;
    }
  }
}

