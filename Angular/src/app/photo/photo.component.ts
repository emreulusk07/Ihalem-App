import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router'; // fotoğraf eklenecek olan mevtun şehrin alınması sağlanır.
import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  uploader: FileUploader;
  hasAnotherDropZoneOver = false;
  hasBaseDropZoneOver = false; // sürükle bırak işlemi ve normal dosya seçerek işlemler geçerli olur.
  baseUrl = 'http://localhost:5000/api/';
  photos: Photo[] = [];
  currentMain: Photo;
  currentBid: any;
  constructor(private alertifyService: AlertifyService, private authService: AuthService, private activatedRoute: ActivatedRoute) {
    this.currentMain = {
      id: 0,
      bidId: 0,
      isMain: false,
      url: ""
    } as Photo;
    this.uploader = this.initializeUploader();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.currentBid = params['bidId'];
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'bids/3' + '/photos', // upload edilecek olan api adresi verilir.
      authToken: 'Bearer ' + localStorage.getItem('token'),
      //isHTML5: true,
      allowedFileType: ['image'], // upload edilmek istenen dosya türleri belirlenir.
      autoUpload: false, // otomatik upload gerçekleşmesi belirlenir.
      removeAfterUpload: true, // yüklemeden sonra listeden kaldırma belirlenir.
      maxFileSize: 10 * 1024 * 1024 // max dosya büyüklüğü belirlenir. (10*1024*1024 = 10mb)
    })

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response); // response parse edilir.
        const photo = {
          id: res.id,
          bidId: res.bidId,
          isMain: res.isMain,
          url: res.url
        }
        this.photos.push(photo); // gelen fotoğraf, photo dizisine yollanır.
      }
    }
    return this.uploader;
  }

}
