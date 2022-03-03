import React, { Component } from 'react';
import constants from './constants';



export default class CustomTooltip extends Component {

  render() {

    const data = this.props.api.getDisplayedRowAtIndex(this.props.rowIndex)
.data;
  
 let tooltip= constants.find(element=>element.short_name===data.Status )

    return (
      <div
        className="custom-tooltip"
        style={{ backgroundColor: this.props.color || 'white' }}
      >
        <p>
          <span>Status:</span> {tooltip?tooltip.full_name:data.Status}
        </p>
      </div>

    );

  }

}