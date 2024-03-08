import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { SidebarMenuComponent } from '@components/sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    SidebarMenuComponent,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {}
