
function initStreetViewer(panoramaData) {
 
    // console.log(globalPanoramaData);
    // console.log(panoramaData.scenes["1"]["panorama"])
    if(globalSelectedView != ""){
        panoramaData.scenes["1"]["panorama"] = "Bsp_VR/"+panoramaData.locationName+"/" + globalSelectedView;
    }

    let panorama = document.getElementById('panorama');
    panorama.classList.remove('hide');

    const panoramaViewer = pannellum.viewer('panorama', panoramaData);
    
    let map = document.getElementById('map'); 
    map.classList.add('hide');
    
    let btn = document.getElementById('goBack')
    btn.classList.remove('hide');
    btn.addEventListener('click', () => {
        panoramaViewer.destroy();
        panorama.classList.add('hide');
        map.classList.remove('hide');
        btn.classList.add('hide');
    })

}


async function mapSpotsToMap() {
    const spotsData = await (await fetch('./spotsData.json')).json();
    for (let spot of spotsData) {
        let position = L.latLng([spot.y, spot.x]);
        L.marker(position).addTo(map)
        .bindPopup(spot.locationName)
        .bindTooltip(spot.locationName)
        .on('click', () => {
            initStreetViewer(spot.panoramaData);
            globalPanoramaData = spot.panoramaData;
        })
    }
}

//creates map 
var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1
});
var globalPanoramaData = "";
var globalSelectedView = "";

var bounds = [[0, 0], [1300, 3200]];
var image = L.imageOverlay('HR_pano.jpg', bounds).addTo(map);
map.fitBounds(bounds);
////
mapSpotsToMap();