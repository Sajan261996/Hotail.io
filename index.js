document.addEventListener("DOMContentLoaded", function () {
    const viewMoreBtn = document.getElementById("view-more-btn");
    const viewLessBtn = document.getElementById("view-less-btn");
    const secondRow = document.querySelector(".second-row");

    viewMoreBtn.addEventListener("click", function () {
        secondRow.classList.add("active");
        viewMoreBtn.style.display = "none";
        viewLessBtn.style.display = "inline-block";
    });

    viewLessBtn.addEventListener("click", function () {
        secondRow.classList.remove("active");
        viewLessBtn.style.display = "none";
        viewMoreBtn.style.display = "inline-block";
    });

    // 🔥 Updated API Key & Fetch Code
    const apiUrl = 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=60763';

    const headers = {
        "X-RapidAPI-Key": "YOUR_NEW_RAPIDAPI_KEY", // 🔥 Replace this with your actual API key
        "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com"
    };

    fetch(apiUrl, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // ✅ Debugging purpose

            // ✅ Update restaurant list
            const restaurantList = document.getElementById("restaurant-list");
            restaurantList.innerHTML = "";

            if (data.data && data.data.length > 0) {
                data.data.forEach(restaurant => {
                    const restaurantItem = document.createElement("div");
                    restaurantItem.classList.add("restaurant-item");

                    const restaurantName = document.createElement("h3");
                    restaurantName.textContent = restaurant.name;
                    restaurantItem.appendChild(restaurantName);

                    const restaurantRating = document.createElement("p");
                    restaurantRating.textContent = `Rating: ${restaurant.rating || 'N/A'}`;
                    restaurantItem.appendChild(restaurantRating);

                    const restaurantDescription = document.createElement("p");
                    restaurantDescription.textContent = restaurant.description || "No description available.";
                    restaurantItem.appendChild(restaurantDescription);

                    restaurantList.appendChild(restaurantItem);
                });
            } else {
                restaurantList.innerHTML = "<p>No restaurants found for this location.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching data from TripAdvisor API:", error);
            document.getElementById("restaurant-list").innerHTML = "<p>Failed to load restaurant data.</p>";
        });
});
