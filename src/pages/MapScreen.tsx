// Treasure Map — real interactive map built with Leaflet + OpenStreetMap.
// No API key, no Lovable, no billing. Tiles are © OpenStreetMap contributors.
//
// Hunt markers use demo locations in the Los Angeles area because the
// hunts in this app do not carry real coordinates yet. When a hunt is
// created with a real location, give it a latitude/longitude and add it
// to HUNT_SPOTS below — the map needs no other changes.

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';

// Pirate-flag marker. We use a divIcon instead of Leaflet's default image
// markers, because the default icon images do not resolve under Vite.
const huntIcon = L.divIcon({
  className: 'tq-hunt-marker',
  html: '<div style="font-size:28px;line-height:1;text-shadow:0 2px 6px rgba(0,0,0,0.6);">🏴‍☠️</div>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

const youIcon = L.divIcon({
  className: 'tq-you-marker',
  html: '<div style="font-size:28px;line-height:1;text-shadow:0 2px 6px rgba(0,0,0,0.6);">📍</div>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

interface HuntSpot {
  id: number;
  title: string;
  description: string;
  rewards: string;
  points: string;
  lat: number;
  lng: number;
}

// Demo locations for the featured hunts. Replace lat/lng with the real
// hunt location when one is set — the marker, popup and challenge link
// all keep working.
const HUNT_SPOTS: HuntSpot[] = [
  {
    id: 1,
    title: 'The Ultimate Treasure',
    description: '$10,000,000 — The Untraceable Treasure',
    rewards: 'Cash + NFTs',
    points: '100 points',
    lat: 34.1368,
    lng: -118.2948, // Griffith Park, Los Angeles
  },
  {
    id: 2,
    title: 'Million Dollar Challenge',
    description: 'Limited to 100 elite hunters — $10,000 entry fee',
    rewards: '$1,000,000',
    points: '75 points',
    lat: 34.1052,
    lng: -118.3508, // Runyon Canyon, Los Angeles
  },
];

const HOME_BASE = { lat: 34.2019, lng: -118.4298 }; // San Fernando Valley

const LA_CENTER: [number, number] = [34.117, -118.35];

function LocateButton({ onLocated }: { onLocated: (lat: number, lng: number) => void }) {
  const map = useMap();
  return (
    <button
      type="button"
      onClick={() => {
        if (!navigator.geolocation) {
          alert('Location is not supported by this browser.');
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            onLocated(latitude, longitude);
            map.flyTo([latitude, longitude], 13);
          },
          () => alert('Could not get your location. Check location permission and try again.'),
        );
      }}
      className="px-4 py-2 bg-[#F97316] hover:bg-[#ea6a0a] text-white font-semibold rounded-lg"
    >
      📍 Find me
    </button>
  );
}

export const MapScreen: React.FC = () => {
  const { flags } = useFeatureFlags();
  const [you, setYou] = useState<[number, number] | null>(null);

  return (
    <div className="bg-[#2A2E3A] p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-2 text-[#F97316]">Treasure Map</h2>
      <p className="text-gray-300 mb-4">
        Find treasures in your area using GPS navigation! Tap a flag to see the hunt.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <LocateButton onLocated={(lat, lng) => setYou([lat, lng])} />
        <span className="text-sm text-gray-400 self-center">
          Demo locations in the Los Angeles area — real hunt locations are set when a hunt is created.
        </span>
      </div>

      <div className="rounded-lg overflow-hidden border border-[#F97316]/30" style={{ height: 480 }}>
        <MapContainer
          center={LA_CENTER}
          zoom={10}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {HUNT_SPOTS.map((spot) => (
            <Marker key={spot.id} position={[spot.lat, spot.lng]} icon={huntIcon}>
              <Popup>
                <div style={{ color: '#1A1F2C' }}>
                  <strong>{spot.title}</strong>
                  <br />
                  {spot.description}
                  <br />
                  {spot.points} · {spot.rewards}
                  <br />
                  <Link to={`/challenge/${spot.id}`}>View challenge →</Link>
                </div>
              </Popup>
            </Marker>
          ))}
          <Marker position={[HOME_BASE.lat, HOME_BASE.lng]} icon={youIcon}>
            <Popup>
              <div style={{ color: '#1A1F2C' }}>
                <strong>Home Base — San Fernando Valley</strong>
                <br />
                Rally point for local hunters.
              </div>
            </Popup>
          </Marker>
          {you && (
            <Marker position={you} icon={youIcon}>
              <Popup>
                <div style={{ color: '#1A1F2C' }}>
                  <strong>You are here</strong>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="font-semibold text-[#F97316]">Hunts on this map</h3>
        {HUNT_SPOTS.map((spot) => (
          <div key={spot.id} className="flex justify-between items-center p-3 bg-[#1A1F2C] rounded">
            <div>
              <span className="font-semibold">🏴‍☠️ {spot.title}</span>
              <span className="text-gray-400 text-sm block">{spot.description}</span>
            </div>
            <Link to={`/challenge/${spot.id}`} className="text-[#F97316] font-semibold whitespace-nowrap">
              {spot.points} — View →
            </Link>
          </div>
        ))}
        <p className="text-sm text-gray-400">
          Virtual hunts (like Crypto Conundrum) don&apos;t need a location — play them from anywhere.
        </p>
      </div>
    </div>
  );
};
