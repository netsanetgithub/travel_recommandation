fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    // Handle search on button click
    const searchButton = document.getElementById('search_button');
    searchButton.addEventListener('click', handleSearch.bind(null, data));
  })
  .catch(error => {
    console.log('Error:', error);
  });

// Function to handle search
function handleSearch(data) {
    const searchInput = document.getElementById('search_input');
    const keyword = searchInput.value.trim().toLowerCase();
  
    if (keyword) {
      let matchingResults = [];
      let matchingTemples = [];
      let matchingBeaches = [];
  
      matchingResults = data.countries.filter(country => {
        return (
          country.name.toLowerCase().includes(keyword) ||
          country.cities.some(city => city.name.toLowerCase().includes(keyword))
        );
      });
  
      matchingTemples = data.temples.filter(temple => {
        return temple.name.toLowerCase().includes(keyword);
      });
  
      matchingBeaches = data.beaches.filter(beach => {
        return beach.name.toLowerCase().includes(keyword);
      });
  
      const searchResults = {
        countries: matchingResults,
        temples: matchingTemples,
        beaches: matchingBeaches
      };
  
      displayResults(searchResults);
    } else {
      // Empty search, display appropriate message or take necessary action
      displayResults({});
    }
  }
// Function to display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
  
    if (Object.keys(results).length > 0) {
      if (results.countries && results.countries.length > 0) {
        results.countries.forEach(country => {
          const countryHeading = document.createElement('h3');
          countryHeading.textContent = `Matching Cities in ${country.name}:`;
          resultsContainer.appendChild(countryHeading);
  
          country.cities.forEach(city => {
            const cityItem = document.createElement('div');
            cityItem.textContent = city.name;
            resultsContainer.appendChild(cityItem);
          });
        });
      }
  
      if (results.temples && results.temples.length > 0) {
        const templesHeading = document.createElement('h3');
        templesHeading.textContent = 'Matching Temples:';
        resultsContainer.appendChild(templesHeading);
  
        results.temples.forEach(temple => {
          const templeItem = document.createElement('div');
          templeItem.textContent = temple.name;
          resultsContainer.appendChild(templeItem);
        });
      }
  
      if (results.beaches && results.beaches.length > 0) {
        const beachesHeading = document.createElement('h3');
        beachesHeading.textContent = 'Matching Beaches:';
        resultsContainer.appendChild(beachesHeading);
  
        results.beaches.forEach(beach => {
          const beachItem = document.createElement('div');
          beachItem.textContent = beach.name;
          resultsContainer.appendChild(beachItem);
        });
      }
    } else {
      const noResultsMessage = document.createElement('p');
      noResultsMessage.textContent = 'No results found.';
      resultsContainer.appendChild(noResultsMessage);
    }
  }