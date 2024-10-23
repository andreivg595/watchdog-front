import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { AppState } from '../../store/AppState';
import { fetchPoints } from '../../store/points/point.actions';
import { getPoints } from '../../store/points/point.selectors';
import { Point } from '../../core/models/point.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private readonly store = inject(Store<AppState>);

  readonly points$ = this.store.pipe(select(getPoints));

  readonly primaryMap: L.TileLayer = L.tileLayer(
    'https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
    {
      attribution: 'Google',
      maxZoom: 19,
    }
  );

  readonly secondaryMap: L.TileLayer = L.tileLayer(
    'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
    {
      attribution: 'Wikimedia',
      maxZoom: 19,
    }
  );

  readonly tertiaryMap: L.TileLayer = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }
  );

  readonly coordinatesBCN: L.LatLng = L.latLng(41.3851, 2.1734);

  map!: L.Map;

  options: L.MapOptions = {
    center: this.coordinatesBCN,
    zoom: 13,
    layers: [this.primaryMap],
  };

  layers: L.Layer[] = [this.primaryMap];

  layersControl: L.Control.Layers = L.control.layers(
    {
      'Google Maps': this.primaryMap,
      'Wikimedia Maps': this.secondaryMap,
      OpenStreetMap: this.tertiaryMap,
    },
    {}
  );

  markersClusterGroup: L.MarkerClusterGroup = L.markerClusterGroup({
    iconCreateFunction: (cluster) => {
      const count = cluster.getChildCount();
      const icon = L.divIcon({
        html: `<div class="cluster-icon">
                 <span>${count}</span>
               </div>`,
        iconSize: L.point(40, 40),
      });
      icon.options.className = 'leaflet-marker-icon cluster-marker';
      return icon;
    },
  });
  parkMarkers: L.Marker[] = [];
  beachMarkers: L.Marker[] = [];
  vetMarkers: L.Marker[] = [];
  fountainMarkers: L.Marker[] = [];
  allMarkers: L.Marker[] = [];

  ngOnInit(): void {
    this.store.dispatch(fetchPoints());
  }

  ngAfterViewInit(): void {
    this.points$.pipe(takeUntil(this.destroy$)).subscribe((points: Point[]) => {
      if (points.length > 0) {
        this.initMarkers(points);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onMapReady(map: L.Map): void {
    this.map = map;
    this.layersControl.addTo(this.map);
    this.markersClusterGroup.addTo(this.map);
    this.getUserLocation();
  }

  private initMarkers(points: Point[]): void {
    points.forEach((point: Point) => {
      const iconUrl = this.getIconForPoint(point.type);
      const customMarker = this.createCustomMarker(iconUrl, point.type);
      const marker = L.marker([point.latitude, point.longitude], {
        icon: customMarker,
      });
      const popupContent = `<strong>${point.name}</strong><br/>${point.address}`;
      marker.bindPopup(popupContent);
      this.markersClusterGroup.addLayer(marker);
    });
  }

  private createCustomMarker(iconUrl: string, pointType: string): L.DivIcon {
    const pointTypeColors: { [key: string]: string } = {
      park: 'rgba(23, 160, 10, 0.8)',
      beach: 'rgba(215, 95, 5, 0.8)',
      vet: 'rgba(225, 15, 35, 0.8)',
      fountain: 'rgba(20, 100, 233, 0.8)',
    };
    const markerColor = pointTypeColors[pointType] || '#000';

    return L.divIcon({
      className: 'custom-map-marker',
      html: `<div class="pin" style="background-color: ${markerColor}">
               <div class="icon-container">
                 <img src="${iconUrl}" class="marker-image" />
               </div>
             </div>`,
      iconSize: [50, 70],
      iconAnchor: [25, 70],
      popupAnchor: [0, -70],
    });
  }

  private getIconForPoint(pointType: string): string {
    switch (pointType) {
      case 'park':
        return 'assets/images/dog.png';
      case 'beach':
        return 'assets/images/beach.png';
      case 'vet':
        return 'assets/images/vet.png';
      case 'fountain':
        return 'assets/images/water.png';
      default:
        return 'assets/default-icon.png';
    }
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = L.latLng(
            position.coords.latitude,
            position.coords.longitude
          );

          const accuracyRadius = Math.min(position.coords.accuracy, 100);

          const accuracyCircle = L.circle(userCoords, {
            color: '#1E90FF',
            fillColor: '#1E90FF',
            fillOpacity: 0.2,
            radius: accuracyRadius,
          }).addTo(this.map);

          const exactLocationMarker = L.circleMarker(userCoords, {
            color: '#FFFFFF',
            weight: 3,
            fillColor: '#0000FF',
            fillOpacity: 1,
            radius: 8,
          }).addTo(this.map);
          // .bindPopup('Tu ubicación actual')
          // .openPopup();

          // this.map.setView(userCoords, 15);
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
