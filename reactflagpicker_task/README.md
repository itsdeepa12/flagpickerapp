## Components

### FlagPicker
> Encapsulates the whole application with 2 search boxes and display functionality 

### SearchBox 
> Consists of Textbox with respective autocomplete options. 
  ```
  props for the component are as follows: 
    1.  Source - recieves source data as array of data to be loading as autocomplete 
    2.  hasCheckboxes - multiple selection of autocomplete data feature
    3.  name - to differentiate each search component, unique name
    4.  disabled - disable the component
    5.  placeholder - placeholder for the textbox
    6.  selectedTextOnClick - returns the selected text from the search box
    7.  selectedCheckedList - returns the list of multiple items selected if hasCheckBoxes = true 
```

### DisplayFlags 
> Component to display the flag


How to Start Application:

1.npm install to install all dependencies to the project.
2.npm start to start the project
3.open the browser and enter localhost:3000 to get the application
