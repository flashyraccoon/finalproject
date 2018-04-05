//sketchco2.js
var emissionsData;


function preload() {
  emissionsData =  loadTable('finalproject/CountriesByEmission(2012).csv','csv', 'header');
}

function setup() {

   let map1 = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: new google.maps.LatLng(2.8,-187.3),
          mapTypeId: 'terrain'
        });
   if(emissionsData == null || emissionsData == undefined)
    return;
    for (var r = 0; r < emissionsData.getRowCount(); r++){

        let row = emissionsData.getRow(r);
        let country = row.getString('ISO_NAME');
        let emission = row.getString('Emission');
        let latitude = row.getString('latitude');
        let longitude = row.getString('longitude');
        let meltdown = parseInt(emission) * 3;
        let contentString = '<div>'+
        '<h1>'+
        country +
        '</h1>' +
        '<div>'+
        '<p><b>CO2 Emission: </b>' +
         emission +
         ' tons per year' +
        '</p><p><b>Meltdown: </b>' +
         meltdown +
         ' sq m of ice loss per year'
        '</p></div>'+
        '</div>';

        let infowindow = new google.maps.InfoWindow({
        content: contentString
        });
        let latLng = new google.maps.LatLng(latitude,longitude);


        var color = getStrokeColor(meltdown);
        let marker = new google.maps.Marker({
                position: latLng,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  strokeColor: color,
                  scale: 5
                },
                map: map1
              });
        marker.addListener('click', function() {
             infowindow.open(map, marker);
          });

    }
/*
    var legend = document.getElementById('legend');
    var div = document.createElement('div');
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);


    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);*/


}


 function getStrokeColor(meltdown){
   if(meltdown >= 0 && meltdown < 10)
   return "#C19749";
   if(meltdown >= 10 && meltdown < 20)
   return "#C18F49";
   if(meltdown >= 20 && meltdown < 30)
   return "#D3804D";
   if(meltdown >= 30 && meltdown < 40)
   return "#D3684D";
   if(meltdown >= 40 && meltdown < 50)
   return "#E1441C";
   if(meltdown >= 50)
   return "#900000 ";

 }
