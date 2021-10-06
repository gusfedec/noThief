import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ToastService } from './shared/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private toastService: ToastService) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      //Precarga de audios de animales
      this.toastService.preloadAudio(
        'audioIzquierda',
        'assets/audios/izquierda.mp3'
      );
      this.toastService.preloadAudio(
        'audioDerecha',
        'assets/audios/derecha.mp3'
      );
      this.toastService.preloadAudio(
        'audioVertical',
        'assets/audios/vertical.mp3'
      );
      this.toastService.preloadAudio(
        'audioHorizontal',
        'assets/audios/horizontal.mp3'
      );
    });
  }
}
