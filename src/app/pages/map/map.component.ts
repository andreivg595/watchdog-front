import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { AppState } from '../../store/AppState';
import { fetchPoints } from '../../store/points/point.actions';
import { getPointsByType } from '../../store/points/point.selectors';
import { Point } from '../../core/models/point.model';
import { PointType } from '../../core/enums/point-type.enum';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private readonly store = inject(Store<AppState>);

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

  readonly pointConfig = {
    park: { color: 'rgba(23, 160, 10, 0.8)', iconUrl: 'assets/images/dog.png' },
    beach: {
      color: 'rgba(235, 95, 5, 0.8)',
      iconUrl: 'assets/images/beach.png',
    },
    vet: { color: 'rgba(225, 15, 35, 0.8)', iconUrl: 'assets/images/vet.png' },
    fountain: {
      color: 'rgba(20, 100, 233, 0.8)',
      iconUrl: 'assets/images/water.png',
    },
  } as const;

  readonly pointType = PointType;

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

  ngOnInit(): void {
    this.store.dispatch(fetchPoints());
    this.filterMarkers(this.pointType.PARK);
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

  filterMarkers(type: string) {
    this.markersClusterGroup.clearLayers();
    const points$ = this.store.pipe(
      select(getPointsByType(type)),
      takeUntil(this.destroy$)
    );
    points$.subscribe((points) => this.initMarkers(points));
  }

  private initMarkers(points: Point[]): void {
    points.forEach((point: Point) => {
      const customMarker = this.createCustomMarker(point.type);
      L.marker([point.latitude, point.longitude], { icon: customMarker })
        .bindPopup(this.createPopupContent(point))
        .addTo(this.markersClusterGroup);
    });
  }

  private createCustomMarker(pointType: string): L.DivIcon {
    const config = this.pointConfig[pointType as keyof typeof this.pointConfig];
    return L.divIcon({
      className: 'custom-map-marker',
      html: `<div class="pin" style="background-color: ${config.color}">
               <div class="icon-container">
                 <img src="${config.iconUrl}" class="marker-image" />
               </div>
             </div>`,
      iconSize: [50, 70],
      iconAnchor: [25, 70],
      popupAnchor: [0, -70],
    });
  }

  private createPopupContent(point: Point): string {
    return `<strong>${point.name}</strong><br/>${point.address}`;
  }

  private getUserLocation(): void {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => this.addUserLocationMarker(position),
      (error) => console.error('Error getting location', error)
    );
  }

  private addUserLocationMarker(position: GeolocationPosition): void {
    const userCoords = L.latLng(
      position.coords.latitude,
      position.coords.longitude
    );
    const accuracyRadius = Math.min(position.coords.accuracy, 100);

    L.circle(userCoords, {
      color: '#1E90FF',
      fillColor: '#1E90FF',
      fillOpacity: 0.2,
      radius: accuracyRadius,
    }).addTo(this.map);

    L.circleMarker(userCoords, {
      color: '#FFFFFF',
      weight: 3,
      fillColor: '#0000FF',
      fillOpacity: 1,
      radius: 8,
    }).addTo(this.map);
    // .bindPopup('Tu ubicación actual')
    // .openPopup();
    // this.map.setView(userCoords, 15);
  }
}
