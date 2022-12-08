// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export const graphStyle = [
  {
    selector: '.image',
    style: {
      label: 'data(label)',
      'font-family': 'Amazon Ember, Helvetica, Arial, sans-serif',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'font-size': '5rem',
      'text-margin-y': '3px',
      'background-color': '#fff',
      'background-image': 'data(image)',
      'background-fit': 'cover cover',
      'background-opacity': '1',
      shape: 'square',
      color: '#000',
      'background-width-relative-to': 'inner',
      'background-height-relative-to': 'inner',
      'background-width': '50%',
      'background-height': '50%',
      padding: '5px',
      'border-style': 'data(borderStyle)',
      'border-width': 'data(borderSize)',
      'border-color': 'data(borderColour)',
    },
  },
  {
    selector: '.vpc',
    style: {
      label: 'data(label)',
      'font-size': '7rem',
      'font-family': 'Amazon Ember, Helvetica, Arial, sans-serif',
      'text-valign': 'top',
      'text-halign': 'center',
      'background-color': '#683dc2',
      'background-opacity': '0.05',
      'text-margin-y': '-4.5%',
      'border-style': 'solid',
      'border-width': 1,
      'border-color': '#683dc2',
      'text-border-width': '2px',
      'text-background-opacity': '1',
      'text-border-color': '#683dc2',
      'text-background-color': '#683dc2',
      'text-background-shape': 'rectangle',
      'text-background-padding': '5px',
      // 'padding': '200px',
      shape: 'roundrectangle',
      color: '#fafafa',
    },
  },
  {
    selector: '.vpc:active',
    style: {
      label: 'data(label)',
      'overlay-color': '#683dc2',
      'overlay-opacity': '0.45',
      // 'padding': '200px',
      shape: 'roundrectangle',
      color: '#fafafa',
    },
  },
  {
    selector: '.vpc:selected',
    style: {
      label: 'data(label)',
      'overlay-color': '#683dc2',
      'overlay-opacity': '0.25',
      // 'padding': '200px',
      shape: 'roundrectangle',
      color: '#fafafa',
    },
  },
  {
    selector: '.subnet:active',
    style: {
      label: 'data(label)',
      'overlay-color': 'data(subnetColour)',
      'overlay-opacity': '0.45',
      shape: 'roundrectangle',
      color: '#fafafa',
    },
  },
  {
    selector: '.subnet:selected',
    style: {
      label: 'data(label)',
      'overlay-color': 'data(subnetColour)',
      'overlay-opacity': '0.25',
      shape: 'roundrectangle',
      color: '#fafafa',
    },
  },
  {
    selector: '.subnet',
    style: {
      label: 'data(label)',
      'font-size': '7rem',
      'font-family': 'Amazon Ember, Helvetica, Arial, sans-serif',
      'text-valign': 'top',
      'text-halign': 'center',
      'background-color': 'data(subnetColour)',
      'background-opacity': '0.05',
      'border-style': 'dashed',
      'border-width': 1,
      'border-color': 'data(subnetColour)',
      'text-background-opacity': '1',
      'text-border-color': 'data(subnetColour)',
      'text-background-color': 'data(subnetColour)',
      'text-background-shape': 'rectangle',
      'text-background-padding': '5px',
      'text-margin-y': '-4.5%',
      'text-border-width': '2px',
      shape: 'roundrectangle',
      color: '#fafafa',
    },
  },
  {
    selector: '.type:selected',
    style: {
      label: 'data(label)',
      'overlay-color': '#545B64',
      'overlay-opacity': '0.25',
      shape: 'roundrectangle',
      color: '#fafafa',
    },
  },
  {
    selector: '.type',
    style: {
      label: 'data(label)',
      'font-size': '6rem',
      'font-family': 'Amazon Ember, Helvetica, Arial, sans-serif',
      'text-valign': 'top',
      'text-halign': 'center',
      'background-color': '#545B64',
      'background-opacity': '0.05',
      'border-style': 'solid',
      'border-width': 1,
      'border-color': '#545B64',
      'text-margin-y': '-3%',
      'text-border-width': '1px',
      'text-background-opacity': '1',
      'text-border-color': '#545B64',
      'text-background-color': '#545B64',
      'text-background-shape': 'rectangle',
      'text-background-padding': '3px',
      shape: 'roundrectangle',
      color: '#FAFAFA',
    },
  },
  {
    selector: '.region:active',
    style: {
      label: 'data(label)',
      'overlay-color': 'data(regionColour)',
      'overlay-opacity': '0.45',
      // 'padding': '200px',
      shape: 'roundrectangle',
      color: '#fafafa',
    },
  },
  {
    selector: '.region:selected',
    style: {
      label: 'data(label)',
      'overlay-color': 'data(regionColour)',
      'overlay-opacity': '0.25',
      // 'padding': '200px',
      shape: 'roundrectangle',
      color: '#fafafa',
    },
  },
  {
    selector: '.region',
    style: {
      label: 'data(label)',
      'font-family': 'Amazon Ember, Helvetica, Arial, sans-serif',
      'font-size': '7rem',
      'text-valign': 'top',
      'text-halign': 'center',
      'background-color': 'data(color)',
      'background-opacity': 'data(opacity)',
      'border-style': 'dashed',
      'border-width': 1,
      'border-color': 'data(regionColour)',
      'text-margin-y': '-5%',
      'text-border-width': '2px',
      'text-background-opacity': '1',
      'text-border-color': 'data(regionColour)',
      'text-background-color': 'data(regionColour)',
      'text-background-shape': 'rectangle',
      'text-background-padding': '5px',
      shape: 'rectangle',
      color: '#fafafa',
    },
  },

  {
    selector: '.availabilityZone:selected',
    style: {
      label: 'data(label)',
      'overlay-color': '#f7991f',
      'overlay-opacity': '0.25',
      // 'padding': '200px',
      shape: 'roundrectangle',
      color: '#fafafa',
    },
  },
  {
    selector: '.availabilityZone:active',
    style: {
      label: 'data(label)',
      'overlay-color': '#f7991f',
      'overlay-opacity': '0.45',
      // 'padding': '200px',
      shape: 'roundrectangle',
      color: '#fafafa',
    },
  },
  {
    selector: '.availabilityZone',
    style: {
      label: 'data(label)',
      'font-family': 'Amazon Ember, Helvetica, Arial, sans-serif',
      'font-size': '7rem',
      'text-valign': 'top',
      'text-halign': 'center',
      'background-color': 'data(color)',
      'background-opacity': 'data(opacity)',
      'border-style': 'dashed',
      'border-width': 1,
      'border-color': '#f7991f',
      'text-margin-y': '-4.5%',
      'text-border-width': '2px',
      'text-background-opacity': '1',
      'text-border-color': '#f7991f',
      'text-background-color': '#f7991f',
      'text-background-shape': 'rectangle',
      'text-background-padding': '5px',
      shape: 'rectangle',
      color: '#000',
    },
  },
  {
    selector: '.account:active',
    style: {
      label: 'data(label)',
      'overlay-color': 'data(accountColour)',
      'overlay-opacity': '0.45',
      // 'padding': '200px',
      shape: 'roundrectangle',
      color: '#fafafa',
    },
  },
  {
    selector: '.account:selected',
    style: {
      label: 'data(label)',
      'overlay-color': 'data(accountColour)',
      'overlay-opacity': '0.25',
      // 'padding': '200px',
      shape: 'roundrectangle',
      color: '#fafafa',
    },
  },
  {
    selector: '.account',
    style: {
      label: 'data(label)',
      'font-family': 'Amazon Ember, Helvetica, Arial, sans-serif',
      'font-size': '8rem',
      'text-valign': 'top',
      'text-halign': 'center',
      'background-color': 'data(color)',
      'background-opacity': 'data(opacity)',
      'text-margin-y': '-5%',
      'border-style': 'dashed',
      'border-width': 1,
      'border-color': 'data(accountColour)',
      'text-border-width': '2px',
      'text-background-opacity': '1',
      'text-border-color': 'data(accountColour)',
      'text-background-color': 'data(accountColour)',
      'text-background-shape': 'rectangle',
      'text-background-padding': '5px',
      shape: 'rectangle',
      color: '#fafafa',
    },
  },
  {
    selector: 'node.highlight',
    style: {
      label: 'data(label)',
      'font-family': 'Amazon Ember, Helvetica, Arial, sans-serif',
      'font-weight': '900',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'font-size': '5rem',
      'text-margin-y': '3px',
      'background-color': '#fff',
      'overlay-color': '#545B64',
      'overlay-opacity': '0.25',
      'background-opacity': '1',
      shape: 'ellipse',
      color: '#545B64',
      'border-style': 'data(borderStyle)',
      'border-width': 1,
      'border-color': 'data(borderColour)',
      'background-width-relative-to': 'inner',
      'background-height-relative-to': 'inner',
      'background-width': '50%',
      'background-height': '50%',
      padding: '5px',
    },
  },
  {
    selector: '.resource:selected',
    style: {
      label: 'data(label)',
      'font-family': 'Amazon Ember, Helvetica, Arial, sans-serif',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'font-size': '5rem',
      'text-margin-y': '3px',
      'background-color': '#545B64',
      'background-opacity': '0.2',
      shape: 'ellipse',
      color: '#545B64',
      'border-style': 'data(borderStyle)',
      'border-width': '2',
      'border-color': 'data(borderColour)',
      'background-width-relative-to': 'inner',
      'background-height-relative-to': 'inner',
      'background-width': '50%',
      'background-height': '50%',
      padding: '5px',
    },
  },
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      'target-arrow-shape': 'none',
      width: '1px',
      'line-style': 'solid',
      'line-color': '#545B64',
    },
  },
  {
    selector: 'edge.hidden',
    style: {
      width: '1px',
      'line-opacity': 0,
    },
  },
  {
    selector: 'edge.highlight',
    style: {
      'curve-style': 'bezier',
      'target-arrow-shape': 'none',
      width: '2px',
      'line-style': 'dashed',
      'line-color': '#545B64',
    },
  },
  {
    selector: 'edge.cy-expand-collapse-meta-edge',
    style: {
      'curve-style': 'unbundled-bezier',
      'control-point-distances': '0 0 0',
      'line-style': 'dashed',
      'line-color': '#ec7211',
      width: '2px',
    },
  },
  {
    selector: 'node.cy-expand-collapse-collapsed-node',
    style: {
      label: 'data(label)',
      'font-size': '6rem',
      'font-family': 'Amazon Ember, Helvetica, Arial, sans-serif',
      'text-valign': 'top',
      'text-halign': 'center',
      'background-color': '#fff',
      'background-opacity': '1',
      'border-style': 'solid',
      'border-width': 1,
      'border-color': '#545B64',
      'text-border-width': '1px',
      'text-background-opacity': '1',
      'text-border-color': '#545B64',
      'text-background-color': '#545B64',
      'text-background-shape': 'rectangle',
      'background-image': 'data(image)',
      'background-fit': 'none',
      width: '43px',
      height: '43px',
      shape: 'ellipse',
      color: '#fff',
      'background-width': '50%',
      'background-height': '50%',
    },
  },
];