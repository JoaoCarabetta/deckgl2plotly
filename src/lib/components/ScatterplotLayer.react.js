import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StaticMap} from 'react-map-gl';
import DeckGL, {ScatterplotLayer} from 'deck.gl';

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
                        top: pointerY
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

    _onViewStateChange({viewState}) {
        this.setState({viewState});
      }

    render() {

        const {id,  
            initial_latitude, initial_longitude, initial_zoom,
            data, mapboxtoken} = this.props;

        const viewState = {
            latitude: initial_latitude,
            longitude: initial_longitude,
            zoom: initial_zoom,
            }
        
        const layers = [
            new ScatterplotLayer({
                id: id,
                data: data,
                getPosition: d => d.position,
                getColor: d => d.color,
                getRadius: d => d.radius,
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
     * - position => [lat, long]
     * - color =>  [r, b, g, a]
     * - radius =>  radius size
     * Optional Keys:
     * - legend_title => tooltip information title
     * - legend_data => tooltip information data
     * 
     * Example:
     * [{"position": [-56.256744, -34.8749],  
     *  "color": [96, 41, 243, 203], 
     *  "radius": 2}, ...]
     */
    data: PropTypes.object,

    /**
     * Mapbox token to load the map 
     */
    mapboxtoken: PropTypes.string,
};
