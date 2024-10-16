import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import L, { latLng, Layer, MapOptions, tileLayer, Control } from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  map!: L.Map;
  options!: MapOptions;
  layers: Layer[] = [];
  layersControl!: Control.Layers;

  ngOnInit(): void {
    this.initMapOptions();
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
}
