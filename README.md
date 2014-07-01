CropTracker
===========

Track the growing degree days of your crop.

## The Team

Dennis Zdonov - JavaScript  
JW - UX  
Kevin Stephens - JavaScript  
Kyle Warbis - JavaScript  
Steve Buckley - Ruby  
Idil Jama - UX
  
## Short Summary

This web app will allow farmers to enter in crop planting dates and then see a graph of cumulative growing degree days.

_JW: graph may or may not be best way to do visualize - would like to explore graphic representations_

## Longer Summary

Farmers want to know the cumulative growing degree days (GDD) of their crops from planting to present so they are aware of the life cycle stage of their crops and can use that information to make management decisions.

## Steps to accomplish this manually:

1. Identify the GDD equation for the crop of interest.
2. Know the planting date for the crop.
3. Get high and low daily temperatures for every day.
4. For every day from planting to present, apply the GDD equation to get the GDD in that day.
5. Add up the GDD from planting to present to get the cumulative GDD to present.
6. Display this graphically by plotting cumulative GDD on Y axis, date on X axis.

## Our MVP

1. Farmers can create user accounts.
2. Farmers can add crop plantings.
	- Planting Date
	- Crop Type (corn or rice to start)
	- Select closest CIMIS weather station
3. Once crop planting is entered they can see a graph of the cumulative GDD of that crop.

## Major Parts to the Project.

1. Scrape CIMIS website for data
	- DECISIONS TO MAKE
		- Will we store the scraped data in our own database?
		- Will the data be scraped on demand from farmer?
			- Can on demand scraping be done by the client browser?
			- Must we setup a server with API to do on demand scraping?

2. User auth. and API to farmer's crop data
	- DECISIONS TO MAKE
		- Can we use a service like Parse.com?
		- OR build our own API?
		- Can auth and crop data be seperate API from weather API?

3. Data processing. (like doing GDD calcs)
	- DECISIONS TO MAKE
		- Is this done by our server?
		- Is this done by the clients browser?
		- I'm assuming we don't want to store the final processed data b/c of server space and associated costs

4. Data Visualization.
	- DECISIONS TO MAKE
		- What JS library?
		- How do those libraries work?

5. Views
	- DECISIONS TO MAKE
		- What's our MVP view of the data? I think it's a single page with all of the GDD chart for all crops entered in order of planting date.
		- What other views do we want to see?
			- _JW: limit/expand view by crop, location, date range? use checkboxes to select which crops to view? bar graph versus curve? other charts?_

6. UX.
	- DECISIONS TO MAKE
		- What views will we make?
			- **Login page**
			- **Account management page**
			- **GDD view page**
		- Wireframes/Layout
		- Style tile (fonts, colors, themes)
		


## Timeline

MVP by Friday, June 13.  
Additional features by Friday, June 27th.






