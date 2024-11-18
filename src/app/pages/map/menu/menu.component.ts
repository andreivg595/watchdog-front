import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PointConfig } from '../../../core/models/point-config.model';

@Component({
  selector: 'app-map-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() options: PointConfig[] = [];

  @Output() selectedType = new EventEmitter<string>();
}
