import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { select, Store } from '@ngrx/store';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import L, {
  latLng,
  Layer,
  MapOptions,
  tileLayer,
  Control,
  Marker,
  marker,
} from 'leaflet';
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

  map!: L.Map;

  options!: MapOptions;

  markers: Marker[] = [];

  layers: Layer[] = [];

  layersControl!: Control.Layers;

  ngOnInit(): void {
    this.store.dispatch(fetchPoints());
    this.initMapOptions();
    this.getUserLocation();
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

  initMapOptions(): void {
    const primaryMap = tileLayer(
      'https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
      {
        attribution: 'Google',
        maxZoom: 18,
      }
    );

    const secondaryMap = tileLayer(
      'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
      {
        attribution: 'Wikimedia',
        maxZoom: 18,
      }
    );

    const tertiaryMap = tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }
    );

    const coordinatesBCN = latLng(41.3851, 2.1734);

    this.options = {
      center: coordinatesBCN,
      zoom: 13,
      layers: [primaryMap],
    };

    this.layersControl = L.control.layers(
      {
        'Google Maps': primaryMap,
        'Wikimedia Maps': secondaryMap,
        OpenStreetMap: tertiaryMap,
      },
      {}
    );

    this.layers = [primaryMap];
  }

  onMapReady(map: L.Map): void {
    this.map = map;
    this.layersControl.addTo(this.map);
  }

  initMarkers(points: Point[]): void {
    points.forEach((point: Point) => {
      this.markers.push(
        marker([point.latitude, point.longitude])
          .addTo(this.map!)
          .bindPopup(`<strong>${point.name}</strong><br/>${point.address}`)
      );
    });
  }

  getUserLocation(): void {
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
