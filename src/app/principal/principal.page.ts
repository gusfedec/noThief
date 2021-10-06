import { Component, OnInit } from '@angular/core';
import {
  DeviceMotion,
  DeviceMotionAccelerationData,
  DeviceMotionAccelerometerOptions,
} from '@ionic-native/device-motion/ngx';
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

  options: DeviceMotionAccelerometerOptions = {
    frequency: 1000,
  };

  constructor(
    private deviceMotion: DeviceMotion,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.deviceMotion
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
}
