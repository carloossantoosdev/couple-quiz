import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { resolveTravelPhoto } from '../../data/content.js'

function markerIcon(found) {
  return L.divIcon({
    className: '',
    html: `<div class="travel-marker${found ? ' travel-marker--found' : ''}"><span>💕</span></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -42],
  })
}

function popupHtml(place) {
  const photo = resolveTravelPhoto(place)
  return `
    <div class="travel-popup-inner">
      <img src="${photo}" alt="${place.name}" />
      <strong>${place.name}</strong>
      <p>${place.memory}</p>
    </div>
  `
}

export default function TravelMap({ places, discovered, onDiscover }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef({})
  const onDiscoverRef = useRef(onDiscover)

  onDiscoverRef.current = onDiscover

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    })

    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 18,
    }).addTo(map)

    const bounds = L.latLngBounds([])

    places.forEach((place) => {
      const latlng = [place.lat, place.lng]
      bounds.extend(latlng)

      const marker = L.marker(latlng, { icon: markerIcon(false) }).addTo(map)
      markersRef.current[place.id] = marker

      marker.bindPopup(popupHtml(place), {
        className: 'travel-popup',
        maxWidth: 280,
        minWidth: 220,
      })

      marker.on('click', () => {
        onDiscoverRef.current?.(place.id)
      })
    })

    if (places.length === 1) {
      map.setView([places[0].lat, places[0].lng], 6)
    } else {
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 5 })
    }

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current = {}
    }
  }, [places])

  useEffect(() => {
    places.forEach((place) => {
      const marker = markersRef.current[place.id]
      if (!marker) return

      const found = discovered.has(place.id)
      marker.setIcon(markerIcon(found))
    })
  }, [discovered, places])

  return <div ref={containerRef} className="travel-map" aria-label="Mapa de viagens" />
}
