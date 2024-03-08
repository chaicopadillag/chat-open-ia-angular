import { Component } from '@angular/core';
import { routes } from '@app/app.routes';
import { SidebarMenuItemComponent } from '../sidebar-menu-item/sidebar-menu-item.component';

interface MenuItem {
  icon: string;
  title: string;
  description: string;
  path: string;
}

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [SidebarMenuItemComponent],
  templateUrl: './sidebar-menu.component.html',
  styles: ``,
})
export class SidebarMenuComponent {
  menuItems: MenuItem[] = routes[0].children
    ?.filter((r) => r.data)
    .map((r) => ({ ...r.data, path: r.path })) as MenuItem[];
}
