import React, { useState, useContext, useEffect } from 'react';
import './SearchArea.scss';

import { dispatchContext } from '../App';
import { getWeatherByCity, getWeatherByCoordinates } from '../util/api';
import { SEARCH_OPTIONS } from '../util/constants';
import { updateGraphData } from '../store/actions';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { cipher } from 'node-forge';

const styles = makeStyles(() => ({
  formControl: {
    width: 300,
    minWidth: 200,
    maxWidth: 600,
  },
  textField: {
    marginTop: 20,
  },
  button: {
    width: 'fit-content',
    marginTop: 20,
  }
}));

export function SearchArea() {
  const dispatch = useContext(dispatchContext);
  const [searchOption, setSearchOption] = useState(SEARCH_OPTIONS.LATITUDE_LONGITUDE);
  const [inputValues, setInputValue] = useState({
    cityName: null,
    latitude: null,
    longitude: null,
  })
  useEffect(() => {
      async function getData(lat, long) {
        const weather = await getWeatherByCoordinates(lat, long)
        dispatch(updateGraphData(weather));
      }

      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        getData(lat, long);

        setInputValue({
          ...inputValues,
          latitude: lat,
          longitude: long, 
        })
      })
  }, []);

  const classes = styles();
  
  function onSelectChange(e) {
    setSearchOption(e.target.value);
    setInputValue({});
  }

  function onInputChange(e, name) {
    const newInputValues = { ...inputValues };
    newInputValues[name] = e.target.value;
    setInputValue(newInputValues);
  }

  async function onSearchClick() {
    let weatherData;
    if(searchOption === SEARCH_OPTIONS.CITY) {
      weatherData = await getWeatherByCity(inputValues.cityName);
    }

    if(searchOption === SEARCH_OPTIONS.LATITUDE_LONGITUDE) {
      weatherData = await getWeatherByCoordinates(inputValues.latitude, inputValues.longitude);
    }
    
    dispatch(updateGraphData(weatherData));
  }

  function getInputFields() {
    if(searchOption === SEARCH_OPTIONS.CITY) {
      return (
        <TextField
          placeholder="Enter city name"
          className={classes.textField}
          onChange={(e) => onInputChange(e, 'cityName')}
        />
      );
    }
    if(searchOption === SEARCH_OPTIONS.LATITUDE_LONGITUDE) {
      return (
        <div className="searchArea__coordinates">
          <TextField
            placeholder="Enter latitude"
            value={inputValues.latitude}
            className={classes.textField}
            onChange={(e) => onInputChange(e, 'latitude')}
          />
          <TextField
            placeholder="Enter longitude"
            value={inputValues.longitude}
            className={classes.textField}
            onChange={(e) => onInputChange(e, 'longitude')}
          />
        </div>
      );
    }
    return;
  }

  return(
    <div className="searchArea">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="outlined-search-by">
          Search by
        </InputLabel>
        <Select
          value={searchOption}
          onChange={(e) => onSelectChange(e)}
          inputProps={{
            name: 'search by',
            id: 'outlined-search-by',
          }}
        >
          <MenuItem value={SEARCH_OPTIONS.CITY}>City Name</MenuItem>
          <MenuItem value={SEARCH_OPTIONS.LATITUDE_LONGITUDE}>Latitude & Longitutde</MenuItem>
        </Select>
        { getInputFields() }
      </FormControl>
      <Button 
        variant="contained"
        className={classes.button}
        onClick={onSearchClick}
      >
        Search
      </Button>
    </div>
  )
}