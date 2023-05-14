# WordFrequencyCounter
This is a simple React app that fetches the content of a text file from a given URL, counts the frequency of each word in the text, and displays the top 20 most frequent words in the form of a histogram and a table. The app also allows you to export the data as a CSV file.

Components
The app consists of the following components:

App: The main component that fetches the data, processes it, and renders the histogram, table, and export button.
handleFetchData: An asynchronous function that fetches the content of a text file from a given URL, splits it into words, counts the frequency of each word, sorts the word frequencies in descending order, and sets the top 20 most frequent words as the state of the App component.
handleExportData: A function that converts the histogram data to a CSV format and downloads it as a file.
svgRef: A reference to the SVG element where the histogram is rendered.
renderTableRows: A function that renders the table rows based on the histogram data.
Libraries and Plugins
The app uses the following libraries and plugins:

React: A JavaScript library for building user interfaces.
axios: A popular JavaScript library for making HTTP requests.
d3: A JavaScript library for visualizing data using SVG, HTML, and CSS.
file-saver: A JavaScript library for saving files on the client side.
How to Use
To use the app, follow these steps:

Clone the repository or download the source code.
Install the dependencies by running npm install or yarn install.
Start the app by running npm start or yarn start.
Click the "Fetch Data" button to fetch the data from the given URL and display the histogram and table.
Click the "Export Data" button to download the histogram data as a CSV file.
License
This project is licensed under the MIT License - see the LICENSE file for details.
