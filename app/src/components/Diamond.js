import React, { Component } from 'react';

export default class Diamond extends Component {
  render() {
    return (
      <svg className="mainSVG" width="150px" height="150px" viewBox="0 0 600 600">
        <defs>
          <filter id="glow" y="-50%" height="180%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="neon" y="-50%" height="180%">
            <feOffset result="offOut" in="SourceGraphic" dx="0" dy="6"/>
            <feGaussianBlur stdDeviation="6 6" result="coloredBlur"/>
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.41"/>
              <feFuncG type="table" tableValues="0.71"/>
              <feFuncB type="table" tableValues="1"/>
              <feFuncA id="dropFlicker" type="linear" slope="0.6"/>

            </feComponentTransfer>
            <feComposite in="SourceGraphic" operator="over"/>
          </filter>

          <filter id="drop" x="-150%" y="-150%" width="280%" height="280%">
            <feGaussianBlur id="gblur" in="offOut" stdDeviation="23" result="blur"/>
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.21"/>
              <feFuncG type="table" tableValues="0.31"/>
              <feFuncB type="table" tableValues="1"/>
              <feFuncA id="dropFlicker" type="linear" slope="1"/>
            </feComponentTransfer>
            <feComposite in="SourceGraphic" operator="over"/>
          </filter>
        </defs>

        <g className="wholeDiamondGroup">
          <g className="revGroup" opacity="0.05" stroke="#2ffcce" stroke-linecap="round" stroke-width="6" fill="none">
            <polyline id="lineMoveLRev0" points="202,165.5 140,244.5 300,435 "/>
            <polyline id="lineMoveLRev1" points="202,165.5 140,244.5 300,435 "/>
            <polyline id="lineMoveRRev0" stroke-miterlimit="10" points="299,166 299,244.9 299,435"/>
            <polyline id="lineMoveRRev1" stroke-miterlimit="10" points="299,166 299,244.9 299,435"/>
          </g>
          <g className="neonGroup" filter="url(#neon)">
            <g className="frontGroup" stroke="#2ffcce" stroke-linecap="round" stroke-width="6" fill="none"
               filter="url(#drop)">
              <line id="facetTop" stroke-miterlimit="10" x1="202" y1="165" x2="398" y2="165"/>
              <polyline id="facetM" stroke="none" stroke-miterlimit="10" points="299,166 299,244.9 299,435"/>
              <polyline id="facetR" points="300,435 460,244.5 398,165.5 "/>
              <polyline id="facetRShrink" stroke="none" stroke-miterlimit="10" points="300,435 450,244.5 388,165.5 "/>
              <polyline id="facetL" points="202,165.5 140,244.5 300,435 "/>
              <polyline id="facetLShrink" stroke="none" stroke-miterlimit="10" points="212,165.5 150,244.5 300,435 "/>
              <polyline id="lineMoveL0" points="299,166 299,244.9 299,435"/>
              <polyline id="lineMoveL1" points="299,166 299,244.9 299,435"/>
              <polyline id="lineMoveR0" points="300,435 460,244.5 398,165.5 "/>
              <polyline id="lineMoveR1" points="300,435 460,244.5 398,165.5 "/>
              <line id="horizontalFacet" x1="140" y1="245" x2="460" y2="245"/>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}
