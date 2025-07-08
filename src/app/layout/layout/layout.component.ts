import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  sidebarIsVisible:boolean;

  constructor() {
    this.sidebarIsVisible = true; // Default value, can be changed based on your logic
  }

  toggleSidebar() {
    this.sidebarIsVisible = !this.sidebarIsVisible;
  }

}
