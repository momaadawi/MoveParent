import { Component, Input } from '@angular/core';
import { range, Observable, generate, of } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  fakeArray: Observable<number[]> = of(Array.from({length: 15}, () => Math.floor(Math.random() * 15)))
  @Input() loader: boolean = false
  @Input() ImageSize: string = '4rem';
  @Input() withImage: boolean = true;
}
