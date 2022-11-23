import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CatData } from 'src/app/interfaces/cat-data';

@Component({
  standalone: true,
  imports: [CommonModule, MatTableModule],
  selector: 'app-cat-table',
  templateUrl: './cat-table.component.html',
  styleUrls: ['./cat-table.component.scss'],
})
export class CatTableComponent {
  @Input() datas!: CatData[];
  displayedColumns: string[] = ['id', 'name', 'url'];

  trackByItem(_: number, value: CatData): string | null {
    return value ? value.id : null;
  }

  // 以下intersectionObserver用
  @Output() reachBottomEvent = new EventEmitter();
  @ViewChild('bottomArea') private bottomAreaRef:
    | ElementRef<HTMLElement>
    | undefined;
  private intersectionObserver: IntersectionObserver | undefined;

  ngAfterViewInit(): void {
    if (this.bottomAreaRef) {
      const options = {
        root: null,
        rootMargin: '50% 0px',
        threshold: 0,
      };
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry: any) => {
          if (!entry.isIntersecting) return;
          this.reachBottomEvent.emit();
        });
      }, options);
      this.intersectionObserver.observe(this.bottomAreaRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver && this.bottomAreaRef) {
      this.intersectionObserver.unobserve(this.bottomAreaRef.nativeElement);
    }
  }
}
