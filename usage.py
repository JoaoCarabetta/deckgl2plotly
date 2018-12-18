import deckglplotly
import dash
from dash.dependencies import Input, Output
import dash_core_components as dcc
import dash_html_components as html
import json

app = dash.Dash(__name__)

app.scripts.config.serve_locally = True
app.css.config.serve_locally = True

app.layout = html.Div([
    dcc.RadioItems(
        id='radio',
        options=[
            {'label': '10 lines', 'value': 0},
            {'label': '10000 lines', 'value': 1},
        ],
        value=1
    ),
    html.Div([
        deckglplotly.deckglplotly(
            id='map',
            initial_longitude=-56.256744, 
            initial_latitude=-34.8749, 
            initial_zoom=16,
            data=json.load(open('test.json', 'r')),
            mapboxtoken='pk.eyJ1IjoiYWxpc2hvYmVpcmkiLCJhIjoiY2ozYnM3YTUxMDAxeDMzcGNjbmZyMmplZiJ9.ZjmQ0C2MNs1AzEBC_Syadg',
            # stroke_width=5,
        )], style={'position':'relative', 'height': 1000})
])

@app.callback(Output('map', 'data'),
        [Input('radio', 'value')])
def change_data(value):

    if value:
        return json.load(open('test.json', 'r'))
    else:
        return json.load(open('test.json', 'r'))[:10]

if __name__ == '__main__':
    app.run_server(debug=True)
