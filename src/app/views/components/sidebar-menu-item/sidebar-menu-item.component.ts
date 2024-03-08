import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar-menu-item.component.html',
  styles: ``,
})
export class SidebarMenuItemComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) path!: string;
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) description!: string;
}
