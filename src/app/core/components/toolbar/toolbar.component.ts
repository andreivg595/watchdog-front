import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ToolbarModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent {}
