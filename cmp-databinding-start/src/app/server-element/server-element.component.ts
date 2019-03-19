import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input('srvElement') element: {type: string, name: string, content: string};
  @ViewChild('heading') header: ElementRef;
  @ContentChild('contentParagraph') paragraph: ElementRef; //content sotred in another component but then passed on via ngContent

  constructor() {
    console.log('construcotr called!');
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('ngOnChanges called!');
    console.log(changes);
  }

  ngOnInit() {
    console.log('ngOnInit called!');
    console.log('Test content: ' + this.header.nativeElement.textContent);
    console.log('Paragraph Content: '+ this.paragraph.nativeElement.textContent);
  }

  ngDoCheck(){
    console.log('ngDoCheck called!');
  }

  ngAfterContentInit(){
    console.log('ngAfterContentInit called!');
    console.log('Paragraph Content: '+ this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked(){
    console.log('ngAfterContentChecked called!');
  }

  ngAfterViewInit(){
    console.log('ngAfterViewInit called!');
    console.log('Test content: ' + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked(){
    console.log('ngAfterViewChecked called!');
  }

  ngOnDestroy(){
    console.log('ngOnDestroy called!');
  }
}
