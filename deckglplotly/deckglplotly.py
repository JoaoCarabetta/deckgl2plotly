# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class deckglplotly(Component):
    """A deckglplotly component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.

Keyword arguments:
- id (string; optional): The ID used to identify this component in Dash callbacks
- initial_longitude (number; optional): Inital view state logitude
- initial_latitude (number; optional): Inital view state latitude
- initial_zoom (number; optional): Inital view state zoom
- data (dict; optional): The data carries geographical and contextual information.
Necessary keys:
- sourcePosition => [lat, long]
- targetPosition => [lat, long]
- color =>  [r, b, g, a]
- width =>  width size
Optional Keys:
- legend_title => tooltip information title
- legend_data => tooltip information data

Example:
[{"sourcePosition": [-56.256744, -34.8749], 
 "targetPosition": [-56.255649, -34.874753], 
 "color": [96, 41, 243, 203], 
 "width": 2}, ...]
- mapboxtoken (string; optional): Mapbox token to load the map

Available events: """
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, initial_longitude=Component.UNDEFINED, initial_latitude=Component.UNDEFINED, initial_zoom=Component.UNDEFINED, data=Component.UNDEFINED, mapboxtoken=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'initial_longitude', 'initial_latitude', 'initial_zoom', 'data', 'mapboxtoken']
        self._type = 'deckglplotly'
        self._namespace = 'deckglplotly'
        self._valid_wildcard_attributes =            []
        self.available_events = []
        self.available_properties = ['id', 'initial_longitude', 'initial_latitude', 'initial_zoom', 'data', 'mapboxtoken']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(deckglplotly, self).__init__(**args)

    def __repr__(self):
        if(any(getattr(self, c, None) is not None
               for c in self._prop_names
               if c is not self._prop_names[0])
           or any(getattr(self, c, None) is not None
                  for c in self.__dict__.keys()
                  if any(c.startswith(wc_attr)
                  for wc_attr in self._valid_wildcard_attributes))):
            props_string = ', '.join([c+'='+repr(getattr(self, c, None))
                                      for c in self._prop_names
                                      if getattr(self, c, None) is not None])
            wilds_string = ', '.join([c+'='+repr(getattr(self, c, None))
                                      for c in self.__dict__.keys()
                                      if any([c.startswith(wc_attr)
                                      for wc_attr in
                                      self._valid_wildcard_attributes])])
            return ('deckglplotly(' + props_string +
                   (', ' + wilds_string if wilds_string != '' else '') + ')')
        else:
            return (
                'deckglplotly(' +
                repr(getattr(self, self._prop_names[0], None)) + ')')
