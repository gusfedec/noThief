import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DeviceMotion,
  DeviceMotionAccelerationData,
  DeviceMotionAccelerometerOptions,
} from '@ionic-native/device-motion/ngx';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication-service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  x: number;
  y: number;
  z: number;
  currentState: string;

  usuario: any;

  watch: Boolean = false;
  subscription;
  options: DeviceMotionAccelerometerOptions = {
    frequency: 1000,
  };

  constructor(
    private deviceMotion: DeviceMotion,
    private toastService: ToastService,
    private router: Router,
    public authService: AuthenticationService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.usuario = this.authService.getUsuario();
  }

  startWatch() {
    this.watch = true;
    this.subscription = this.deviceMotion
      .watchAcceleration(this.options)
      .subscribe((acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration);
        this.x = acceleration.x;
        this.y = acceleration.y;
        this.z = acceleration.z;
        if (this.x >= 8 && this.x <= 10) {
          if (this.currentState != 'izquierda') {
            this.toastService.playAudio('audioIzquierda');
          }
          console.log('xizquierda');
          this.currentState = 'izquierda';
        }
        if (this.x <= -8 && this.x >= -10) {
          if (this.currentState != 'derecha') {
            this.toastService.playAudio('audioDerecha');
          }
          console.log('xderecha');
          this.currentState = 'derecha';
        }
        if (this.y >= 8 && this.y <= 10) {
          if (this.currentState != 'vertical') {
            this.toastService.linternaOn();
            this.toastService.playAudio('audioVertical');
            this.toastService.loopAudio('audioVertical');
            setTimeout(() => {
              this.toastService.linternaOff();
              this.toastService.stopAudio('audioVertical');
            }, 5000);
          }
          console.log('vertica');
          this.currentState = 'vertical';
        }
        if (this.y >= 0 && this.y <= 1 && this.x >= 0 && this.x <= 1) {
          if (this.currentState != 'horizontal') {
            this.toastService.hapticsVibrateByTime(5000);
            this.toastService.playAudio('audioHorizontal');
            this.toastService.loopAudio('audioHorizontal');
            setTimeout(() => {
              this.toastService.stopAudio('audioHorizontal');
            }, 5000);
          }
          console.log('horizontal');
          this.currentState = 'horizontal';
        }
        if (this.z == 0) {
          console.log('z');
        }
      });
  }
  stopWatch() {
    this.watch = false;
    this.subscription.unsubscribe();
  }
  showPrompt() {
    let pass = this.authService.getPassword();
    console.log(pass);
    this.alertController
      .create({
        header: '',
        subHeader: '',
        message: 'Ingrese su contraseña',
        inputs: [
          {
            name: 'password',
            placeholder: 'Contraseña',
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: (data: any) => {
              console.log('Canceled', data);
            },
          },
          {
            text: 'Ingresar',
            handler: (data: any) => {
              console.log('Saved Information', data);
              console.log(data.password);
              if (pass == data.password) {
                this.stopWatch();
              }
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }
}
