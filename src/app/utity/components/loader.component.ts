import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'stc-loader',
  standalone: true,
  imports: [],
  template: ` <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    style="display:block;"
    width="200px"
    height="200px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <g transform="translate(20 50)">
      <circle cx="0" cy="0" r="6" fill="#ff4081">
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.375s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          values="0;1;0"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
    </g>
    <g transform="translate(40 50)">
      <circle cx="0" cy="0" r="6" fill="#3b0764">
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.25s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          values="0;1;0"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
    </g>
    <g transform="translate(60 50)">
      <circle cx="0" cy="0" r="6" fill="#ff4081">
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.125s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          values="0;1;0"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
    </g>
    <g transform="translate(80 50)">
      <circle cx="0" cy="0" r="6" fill="#3b0764">
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="0s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          values="0;1;0"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
    </g>
  </svg>`,
  styles: [
    `
      :host {
        position: absolute;
        background-color: rgba(250, 250, 250, 0.7);
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99;
        min-width: 100%;
        min-height: 100%;
      }
      svg {
        width: 100px;
        height: 100px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {}
