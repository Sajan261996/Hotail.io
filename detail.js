// API URL for fetching hotel/restaurant data
const apiUrl = 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=304554';

// Fetching data from Tripadvisor API
async function fetchHotelData() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
                'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY'  // Replace with your actual API key
            }
        });
        
        if (!response.ok) {
            throw new Error('Error fetching hotel data');
        }

        const data = await response.json();
        
        // Extract hotel information from the API response
        const hotel = data.data[0];  // Assuming the first hotel data
        const hotelName = hotel.name;
        const hotelRating = hotel.rating;
        const hotelDescription = hotel.description;
        const hotelImages = hotel.images;  // Assuming this is an array of images

        // Populate the webpage with fetched data
        document.querySelector('.hotel-details h2').textContent = hotelName;
        document.querySelector('.hotel-details p strong').textContent = `Rating: ${hotelRating} Stars`;
        document.querySelector('.hotel-details p').textContent = hotelDescription;

        // Populate the image slider
        const sliderImages = document.querySelector('.slider-images');
        sliderImages.innerHTML = '';  // Clear existing images

        hotelImages.forEach(image => {
            const img = document.createElement('img');
            img.src = image.url;  // Assuming 'url' contains the image link
            img.alt = hotelName;
            img.classList.add('hotel-image');
            sliderImages.appendChild(img);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Price Calculation
function calculatePrice() {
    const fromDateInput = document.querySelector('#from-date').value;
    const toDateInput = document.querySelector('#to-date').value;
    const numPeopleInput = document.querySelector('#Adult').value;

    if (!fromDateInput || !toDateInput || !numPeopleInput) {
        return;
    }

    const fromDate = new Date(fromDateInput);
    const toDate = new Date(toDateInput);
    const numPeople = parseInt(numPeopleInput);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime()) || isNaN(numPeople) || numPeople <= 0) {
        return;
    }

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const differenceInDays = Math.ceil((toDate - fromDate) / millisecondsPerDay);

    if (differenceInDays <= 0) {
        return;
    }

    const pricePerPersonPerDay = 1000;
    const totalPrice = differenceInDays * numPeople * pricePerPersonPerDay;

    document.querySelector('#total').value = `Rs. ${totalPrice}`;
}

// Attach event listeners for real-time updates
document.querySelector('#from-date').addEventListener('input', calculatePrice);
document.querySelector('#to-date').addEventListener('input', calculatePrice);
document.querySelector('#Adult').addEventListener('input', calculatePrice);

// Initialize hotel data when the page loads
window.onload = fetchHotelData;
