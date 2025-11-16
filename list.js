document.getElementById('list-view-link').addEventListener('click', () => {
    // Show hotel list and hide map view
    document.getElementById('hotel-list').classList.add('active');
    document.getElementById('map-view').classList.remove('active');
});

document.getElementById('map-view-link').addEventListener('click', () => {
    // Show map and hide hotel list
    document.getElementById('map-view').classList.add('active');
    document.getElementById('hotel-list').classList.remove('active');
});
