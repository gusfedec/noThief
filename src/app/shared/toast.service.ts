import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  loading: any;

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    private nativeAudio: NativeAudio,
    private flashlight: Flashlight
  ) {}

  async presentToast(msg) {
    let toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'top',
    });

    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor...',
      duration: 2000,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: 'circular',
      duration: 0,
      message: 'Espere por favor...',
      translucent: true,
      cssClass: 'ion-loading-class',
      backdropDismiss: true,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

  cancelLoading() {
    this.loading.dismiss();
  }

  async preloadAudio(audioId, pathAudio) {
    try {
      const a = await this.nativeAudio.preloadComplex(
        audioId,
        pathAudio, //'assets/audios/animales/bird.mp3',
        1,
        1,
        0
      );
      console.log(a);
    } catch (e) {
      console.log('error preload', e);
    }
  }

  async loopAudio(audioId) {
    try {
      const a = await this.nativeAudio.loop(audioId);
      console.log(a);
    } catch (e) {
      console.log('error loop', e);
    }
  }

  async playAudio(audioId) {
    try {
      const a = await this.nativeAudio.play(audioId);
      console.log(a);
    } catch (e) {
      console.log('error play', e);
    }
  }

  async stopAudio(audioId) {
    try {
      const a = await this.nativeAudio.stop(audioId);
      console.log(a);
    } catch (e) {
      console.log('error stop', e);
    }
  }

  async hapticsImpactHight() {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  }

  async hapticsImpactMedium() {
    await Haptics.impact({ style: ImpactStyle.Medium });
  }

  async hapticsImpactLight() {
    await Haptics.impact({ style: ImpactStyle.Light });
  }

  async hapticsVibrate() {
    await Haptics.vibrate();
    await Haptics.vibrate({ duration: 2000 });
  }

  async hapticsVibrateByTime(time) {
    await Haptics.vibrate({ duration: time });
  }

  async linterna() {
    await this.flashlight.toggle();
    //await this.flashlight.switchOff();
    //await this.flashlight.switchOn();
  }

  async linternaOn() {
    await this.flashlight.switchOn();
  }

  async linternaOff() {
    await this.flashlight.switchOff();
  }
}
