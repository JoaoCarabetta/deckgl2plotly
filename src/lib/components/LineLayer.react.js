import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StaticMap} from 'react-map-gl';
import DeckGL, {LineLayer} from 'deck.gl';

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default class deckglplotly extends Component {

    _renderTooltip() {
        const {hoveredObject, pointerX, pointerY} = this.state || {};
        return hoveredObject && (
          <div className='datainfo' style={{position: 'absolute', 
                        zIndex: 1,
                        pointerEvents: 'none', 
                        left: pointerX, 
                        top: pointerY,
                        width: '300px',
                        height: '100px',
                        'background-color': '#fff',
                        'border-radius': '3px',
                        'margin-top': '20px',   
                        margin: '0 auto',
                        padding: '10px 25px',
                        'font-family': 'Arial, Helvetica, Georgia, sans-serif',
                        'font-weight': 300,
                        'font-size': '12px',
                        color: '#808080',
                        }}>
            <h1 style={{'font-size': '13px',
                        color: '#000000',
                        'font-weight': 600}}>Legend</h1>
                <p className="info">
                <span style={{color: '#000000'}}>{ hoveredObject.legend_title }</span>
                <span style={{color: '#000000',
                            'text-align': 'right',
                             float: 'right'}} className="data">
                                { hoveredObject.legend_data }</span>
                </p>
          </div>
        );
    }

    _onViewStateChange({viewState}) {
        this.setState({viewState});
      }

    render() {

        const {
            id,
            latitude, longitude, zoom,
            data, mapboxtoken} = this.props;

        const viewState = {
            latitude: latitude,
            longitude: longitude,
            zoom: zoom
            }
        
        const layers = [
            new LineLayer({
                id: id,
                data: data,
                getColor: d => d.color,
                getStrokeWidth: d => d.width,
                // Enable picking
                pickable: true,
                // Update app state
                onHover: info => this.setState({
                    hoveredObject: info.object,
                    pointerX: info.x,
                    pointerY: info.y
                    })
            })
        ];
        
        return (
            <DeckGL 
                  controller={true} 
                  width="100%" 
                  height="100%"
                  layers={layers}
                  viewState={viewState}
                  onViewStateChange={this._onViewStateChange}>
            <StaticMap mapboxApiAccessToken={mapboxtoken}/>
            {this._renderTooltip()}
          </DeckGL>
        );
      }
}

deckglplotly.defaultProps = {};

deckglplotly.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * Dash-assigned callback that should be called whenever any of the
     * properties change
     */
    setProps: PropTypes.func,

    /**
     * Inital view state logitude
     */
    longitude: PropTypes.number,
    
     /**
     * Inital view state latitude
     */
    latitude: PropTypes.number,
    
     /**
     * Inital view state zoom
     */
    zoom: PropTypes.number,

    /**
     * The data carries geographical and contextual information.
     * Necessary keys:
     * - sourcePosition => [lat, long]
     * - targetPosition => [lat, long]
     * - color =>  [r, b, g, a]
     * - width =>  width size
     * Optional Keys:
     * - legend_title => tooltip information title
     * - legend_data => tooltip information data
     * 
     * Example:
     * [{"sourcePosition": [-56.256744, -34.8749], 
     *  "targetPosition": [-56.255649, -34.874753], 
     *  "color": [96, 41, 243, 203], 
     *  "width": 2}, ...]
     */
    data: PropTypes.object,

    /**
     * Mapbox token to load the map 
     */
    mapboxtoken: PropTypes.string,
};
