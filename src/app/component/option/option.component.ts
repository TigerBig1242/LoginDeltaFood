import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  AlertController,
  IonSlides,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent implements OnInit {
  @Input() option: any;
  public slideOpts = {
    slidesPerView: 3,
  };
  selectedSegment: any;
  segmentList = [];
  segClass = [];
  max:number;
  @ViewChild('slide') slide: IonSlides;

  constructor(
    public modalCtrl: ModalController,
    public api: ApiServiceService,
    public alertController: AlertController,
    public toastController: ToastController,
    public fb: FormBuilder,
    public ref: ChangeDetectorRef
  ) {
    this.selectedSegment = this.segmentList[0];
  }

  ngOnInit() {
    if (this.option) {
      this.option.forEach((element) => {
        this.segClass.push('');
      });
      this.segmentList = this.option;
    }
  }

  delForm(indexTitle: number, indexForm: number) {
    this.segmentList[indexTitle].option.splice(indexForm, 1);
  }

  delTitle(index: number) {
    this.segmentList.splice(index, 1);
    this.segClass.splice(index, 1);
    this.selectedSegment = this.segmentList[index - 1];
    //ขยับตำแหน่ง segment เมื่อลบ
    this.slide.slideTo(index);
    this.segClass.forEach((element, i) => {
      this.segClass[i] = '';
      if (i == index) {
        this.segClass[i] = 'clickActive';
      }
    });
  }

  getNewForm(indexTitle: number) {
    let newForm = {
      optionD: {
        count: 0,
        price: 0,
        default: false,
      },
    };
    this.segmentList[indexTitle].option.push(newForm);
  }

  getNewTitle() {
    if (this.segmentList.length == 0) {
      this.segClass.push('clickActive');
      this.ref.detectChanges();
    }
    let newTitle = {
      title: 'หัวข้อใหม่',
      select_option: 0,
      option: [
        {
          title: '',
          optionD: {
            count: 0,
            price: 0,
            default: true,
          },
        },
      ],
    };
    this.segmentList.push(newTitle);
    if (this.segmentList.length > 1) {
      this.segClass.push('');
    }
    this.selectedSegment = this.segmentList[0];
  }

  _segmentSelected(item: string, index: number) {
    this.slide.slideTo(index);
    this.segClass.forEach((element, i) => {
      this.segClass[i] = '';
      if (i == index) {
        this.segClass[i] = 'clickActive';
      }
    });
  }
  // slide
  _ionSlideDidChange(event: any) {
    this.slide.getActiveIndex().then((index) => {
      this.selectedSegment = this.segmentList[index];

      this.segClass.forEach((element, i) => {
        this.segClass[i] = '';
        if (i == index) {
          this.segClass[i] = 'clickActive';
        }
      });
    });
  }

  onSubmit() {
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'บันทึกข้อมูลเรียบร้อย',
      duration: 1000,
      cssClass: 'customToastClass',
      color: 'dark',
    });
    toast.present();
    setTimeout(async () => {
      await this.modalCtrl.dismiss(this.segmentList);
    }, 1000);
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  detectCount(index: number) {
    let option = this.segmentList[index].select_option;
    let optLength = this.segmentList[index].option.length;
    this.max= optLength;
    if (option < 1) {
      this.segmentList[index].select_option = 0;
    } else if (option > optLength) {
      this.segmentList[index].select_option = optLength
    }
  }
}

//close modal return data to func()
// await this.modalCtrl.dismiss(this.croppedImage);
