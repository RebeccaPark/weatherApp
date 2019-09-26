import React, { useState, useEffect } from 'react';
import './SearchArea.scss';

import { getRequest } from '../util/api';
import { SEARCH_OPTIONS } from '../util/constants';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = makeStyles((theme) => ({
  formControl: {
    width: 300,
    minWidth: 200,
    maxWidth: 600,
  },

  textField: {
    marginTop: 20,
  }
}));

export function SearchArea() {
  const [searchOption, setSearchOption] = useState(SEARCH_OPTIONS.CITY);
  
  useEffect(() => {
    getRequest()}, 
    []
  );

  const classes = styles();
  
  function onSelectChange(e) {
    setSearchOption(e.target.value);
  }

  function getInputFields() {
    if(searchOption === SEARCH_OPTIONS.CITY) {
      return (
        <TextField
          placeholder="Enter city name"
          className={classes.textField}
        />
      );
    }
    if(searchOption === SEARCH_OPTIONS.LATITUDE_LONGTITUDE) {
      return (
        <div className="searchArea__coordinates">
          <TextField
            placeholder="Enter latitude"
            className={classes.textField}
          />
          <TextField
            placeholder="Enter longtitude"
            className={classes.textField}
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
          <MenuItem value={SEARCH_OPTIONS.LATITUDE_LONGTITUDE}>Longtitude & Altitude</MenuItem>
        </Select>
        { getInputFields() }
      </FormControl>
    </div>
  )
}