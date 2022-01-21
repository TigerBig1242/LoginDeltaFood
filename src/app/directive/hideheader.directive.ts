import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideheader]',
  host: {
    '(ionScroll)': 'onContentScroll($event)',
  },
})
export class HideheaderDirective {
  @Input('header') header: any;
  // private lastY:number = 0;
  private headerHeight = 44;

  constructor(private renderer: Renderer2, private domCtrl: DomController) {}

  ngOnInit() {
    this.header = this.header.el;
    this.domCtrl.read(() => {
      this.headerHeight = this.header.cleintHeight;
    });
  }

  @HostListener('ionScroll', ['$event']) onContentScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    let newPosition = -(scrollTop / 5);

    if (newPosition < -this.headerHeight) {
      newPosition = -this.headerHeight;
    }

    let newOpacity = 1 - newPosition / -this.headerHeight;

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.header, 'top', `${newPosition}px`);
      this.renderer.setStyle(this.header, 'opacity', `${newOpacity}px`);
    });
  }
}
