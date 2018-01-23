import { InfoWindowComponent } from './../info-window/info-window.component';
import {
  Component, OnInit, 
  NgModule,
  ApplicationRef, 
  ComponentFactoryResolver, 
  ComponentRef,
  Injector,
  NgZone,
  EventEmitter
} from '@angular/core';

declare var google: any;

@Component({
  selector: 'my-maps',
  templateUrl: './my-maps.component.html',
  styleUrls: ['./my-maps.component.css']
})
export class MyMapsComponent implements OnInit {

  constructor(private injector: Injector, 
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private zone: NgZone) {
  }
  compRef: ComponentRef<InfoWindowComponent>;
  placeInfoWindow: any;

  ngOnInit() {

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

    let bounds  = new google.maps.LatLngBounds();
    let map = this.initializeMap();
    let isLast:boolean = false;
    for (var i = 0; i < routes.length; i++) {
      if(i === routes.length-1){
        isLast = true;
      }
      let marker = this.addMarker(routes[i],map);
      let loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
      bounds.extend(loc);
      if(isLast){
        map.fitBounds(bounds);
      }
    }
    var path = this.drawPath(map,routes);
    this.animatePath(path);
  }

  // Utility methods

  initializeMap(){
    let gmap = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: {lat: 52.738, lng: -119.486}
    }); 
    return gmap;
  }

  addMarker(position,map){
    let marker = new google.maps.Marker({
      position: position,
      map: map,
      draggable:true,
      animation: google.maps.Animation.BOUNCE,        
      title: position+""
    });

    marker.addListener('click', (e) => { 
      this.zone.run(() => this.onMarkerClick(marker,map, e));
    });

    return marker;
  }

  onMarkerClick(marker,gmap, e) {
    this.placeInfoWindow = new google.maps.InfoWindow();
    if(this.compRef) this.compRef.destroy();
    
    const compFactory = this.resolver.resolveComponentFactory(InfoWindowComponent);
    this.compRef = compFactory.create(this.injector);  
    this.compRef.instance.latitude = marker.position.lat();
    this.compRef.instance.longitude = marker.position.lng();
    
    let div = document.createElement('div');
    div.appendChild(this.compRef.location.nativeElement);
    
    this.placeInfoWindow.setContent(div);
    this.placeInfoWindow.open(gmap, marker);
    this.appRef.attachView(this.compRef.hostView);
  }

  drawPath(gmap,routes) {
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
          map: gmap
      });

      return path;
  }

  animatePath(line) {
    var count = 0;
    window.setInterval(function() {
      count = (count + 1) % 200;

      var icons = line.get('icons');
      icons[1].offset = (count / 2) + '%';
      line.set('icons', icons);
  }, 200);
}


}
