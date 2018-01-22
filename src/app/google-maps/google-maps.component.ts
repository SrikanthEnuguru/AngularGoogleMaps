import { LatLong } from './../LatLong';
import { Component, OnInit, Input } from '@angular/core';
declare var google: any;

@Component({
  selector: 'my-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})

export class GoogleMapsComponent implements OnInit {
  
  constructor() {}

  ngOnInit() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 52.520, lng: 13.410}
  }); 

  var routes =
  [
      new google.maps.LatLng(52.738,-119.486),
      new google.maps.LatLng(-4.039,-57.656),
      new google.maps.LatLng(51.619,10.632),
      new google.maps.LatLng(8.627,7.394),
      new google.maps.LatLng(47.227,68.554),
      new google.maps.LatLng(39.517,95.626),            
      new google.maps.LatLng(17.385,78.486)
  ]; 

  var markers = [];
  var bounds  = new google.maps.LatLngBounds();
  var contentString ="Hello !";
  var isLast:boolean = false;

  var dottedLineSymbol = {
    path: 'M 0,-1 0,1',        
    strokeOpacity: 1,
    strokeWeight: 1.5,
    scale: 4
  };

  var lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
    scale: 4,    
    strokeColor: '#393',
    strokeOpacity: 1,
    strokeWeight: 5.5,
  };


  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 200
  });

  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];

  for (var i = 0; i < routes.length; i++) {
    if(i === routes.length-1){
      isLast = true;
    }
    addMarkerWithTimeout(routes[i], i * 0);   
  }

  function addMarkerWithTimeout(position, timeout) {
    window.setTimeout(function() {
      var marker = new google.maps.Marker({
        position: position,
        map: map,
        draggable:true,
        animation: google.maps.Animation.BOUNCE,        
        title: position+""
      });

      let loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
      bounds.extend(loc);
      if(isLast){
        map.fitBounds(bounds);
      }      

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      markers.push(marker);
    }, timeout);
  }

  var path = new google.maps.Polyline(
    {
        path: routes,        
        strokeOpacity:0,            
        icons: [{
          icon: dottedLineSymbol,
          offset: '100%',
          repeat: '20px'
        },
        {
          icon: lineSymbol,
          offset: '100%'        
        }
      ],
        geodesic: true,
        map: map
    });
    

    animateCircle(path);
    

    function animateCircle(line) {
      var count = 0;
      window.setInterval(function() {
        count = (count + 1) % 200;

        var icons = line.get('icons');
        icons[1].offset = (count / 2) + '%';
        line.set('icons', icons);
    }, 200);
  }
  
  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });

  function addMarker(position, timeout) {
    window.setTimeout(function() {
      var marker = new google.maps.Marker({
        position: position,
        map: map,        
        animation: google.maps.Animation.DROP,
        title: position+""
      });

      let loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
      bounds.extend(loc);
      map.fitBounds(bounds);

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      markers.push(marker);
    }, timeout);
  }
  
  


  }
}
