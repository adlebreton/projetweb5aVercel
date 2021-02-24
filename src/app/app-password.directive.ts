import { Directive, ElementRef} from '@angular/core';
@Directive({
  selector: '[appPassword]'
})
export class AppPasswordDirective {
 private _shown = false;
constructor(private el: ElementRef) {
    this.setup();
  }
toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = 'Caché';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = 'Rendre visible';
    }
  }
setup() {
    const parent = this.el.nativeElement.parentNode;
    const p = document.createElement('p');
    p.innerHTML = `Rendre visible`;
    p.id = "passwordVisible";
    p.style.textAlign = "center";
    p.style.color= "#B666FC";
    p.addEventListener('click', (event) => {
      this.toggle(p);
    });
    parent.appendChild(p);
  }
}