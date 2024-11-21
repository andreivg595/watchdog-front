import { Component, input, output } from '@angular/core';
import { PointConfig } from '../../../core/models/point-config.model';
import { PointType } from '../../../core/enums/point-type.enum';

@Component({
  selector: 'app-map-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  readonly options = input<PointConfig[]>();

  readonly selectedType = output<string>();

  readonly pointType = PointType;
}
