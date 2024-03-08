import { Component } from '@angular/core';

@Component({
  selector: 'app-typing',
  standalone: true,
  imports: [],
  template: `<div class="flex space-x-1.5 typing">
    <div class="w-1.5 h-1.5 bg-gray-500 rounded-full circle scaling"></div>
    <div class="w-1.5 h-1.5 bg-gray-500 rounded-full circle scaling"></div>
    <div class="w-1.5 h-1.5 bg-gray-500 rounded-full circle scaling"></div>
  </div>`,
  styles: `
  .circle.scaling {
  animation: typing 1000ms ease-in-out infinite;
  animation-delay: 3600ms;
}
.circle.bouncing {
  animation: bounce 1000ms ease-in-out infinite;
  animation-delay: 3600ms;
}

.circle:nth-child(1) {
  animation-delay: 0ms;
}

.circle:nth-child(2) {
  animation-delay: 333ms;
}

.circle:nth-child(3) {
  animation-delay: 666ms;
}
  @keyframes typing {
  0% {    transform: scale(1);  }
  33% {    transform: scale(1);  }
  50% {    transform: scale(1.4);  }
  100% {    transform: scale(1);  }}
@keyframes bounce {
  0% {    transform: translateY(0);  }
  33% {    transform: translateY(0);  }
  50% {    transform: translateY(-10px);  }
  100% {    transform: translateY(0);  }}
  `,
})
export class TypingComponent {}
