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
                        'background-color': '#14252f',
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
                        color: '#fff',
                        'font-weight': 600}}>Legend</h1>
                <p className="info">
                <span className="infotitle">{ hoveredObject.legend_title }</span>
                <span style={{color: '#fff',
                            'text-align': 'right',
                             float: 'right'}} className="data">
                                { hoveredObject.legend_data }</span>
                </p>
          </div>
        );
    }

    render() {

        const {id, label, setProps, value, 
            initial_latitude, initial_longitude, initial_zoom,
            data, mapboxtoken} = this.props;
        
        const layers = [
            new LineLayer({
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
            <DeckGL initialViewState={{
                latitude: initial_latitude,
                longitude: initial_longitude,
                zoom: initial_zoom
                }} 
                  controller={true} 
                  width="100%" 
                  height="100%"
                  layers={layers}>
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
    initial_longitude: PropTypes.number,
    
     /**
     * Inital view state latitude
     */
    initial_latitude: PropTypes.number,
    
     /**
     * Inital view state zoom
     */
    initial_zoom: PropTypes.number,

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
