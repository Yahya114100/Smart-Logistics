// src/lib/mockData.ts
import { Shipment, Sensor, Alert, KPI } from './types';

export const KPIS: KPI[] = [
    { title: "Total Shipments In-Transit", value: "2,845", change: "+4.5%", trend: "up", iconName: "Truck" },
    { title: "Active Critical Alerts", value: "12", change: "+2", trend: "down", iconName: "Siren" }, // Trend down is bad effectively here contextually, but physically up
    { title: "Avg. Border Delay", value: "4.2h", change: "-1.1h", trend: "up", iconName: "Clock" }, // Trend up means improvement here
    { title: "Compliance Rate", value: "99.1%", change: "+0.3%", trend: "up", iconName: "ShieldCheck" },
];

export const RECENT_SHIPMENTS: Shipment[] = [
    {
        id: "SHP-2026-001",
        origin: "Cairo, EG",
        destination: "Benha, EG",
        drugName: "Cold & Flu Medicine",
        currentTemp: 4.2,
        minTemp: 2.0,
        maxTemp: 8.0,
        humidity: 45,
        status: "In-Transit",
        riskStatus: "Safe",
        eta: "2h 15m",
        coordinates: { lat: 30.0444, lng: 31.2357 }
    },
    {
        id: "SHP-2026-002",
        origin: "Berlin, DE",
        destination: "Cairo, EG",
        drugName: "Insulin Glargine",
        currentTemp: 7.8,
        minTemp: 2.0,
        maxTemp: 8.0,
        humidity: 50,
        status: "In-Transit",
        riskStatus: "Warning",
        eta: "14h 30m",
        coordinates: { lat: 52.5200, lng: 13.4050 }
    },
    {
        id: "SHP-2026-003",
        origin: "Mumbai, IN",
        destination: "Alexandria, EG",
        drugName: "COVID-19 Vaccine",
        currentTemp: -18.5,
        minTemp: -25.0,
        maxTemp: -15.0,
        humidity: 30,
        status: "Delayed",
        riskStatus: "Critical",
        eta: "2d 4h",
        coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    {
        id: "SHP-2026-004",
        origin: "Paris, FR",
        destination: "Giza, EG",
        drugName: "Oncology Meds",
        currentTemp: 5.0,
        minTemp: 2.0,
        maxTemp: 8.0,
        humidity: 42,
        status: "In-Transit",
        riskStatus: "Safe",
        eta: "8h 10m",
        coordinates: { lat: 48.8566, lng: 2.3522 }
    },
    {
        id: "SHP-2026-005",
        origin: "Dubai, AE",
        destination: "Hurghada, EG",
        drugName: "Antibiotics",
        currentTemp: 22.1,
        minTemp: 15.0,
        maxTemp: 25.0,
        humidity: 35,
        status: "Delivered",
        riskStatus: "Safe",
        eta: "Delivered",
        coordinates: { lat: 25.276987, lng: 55.296249 }
    }
];

export const ALERTS: Alert[] = [
    {
        id: "ALT-001",
        shipmentId: "SHP-2026-003",
        type: "Temperature",
        message: "Temp Rising Rapidly",
        predictedIssue: "Temperature will exceed 8°C in 28 minutes",
        confidence: "High",
        suggestedAction: "Check coolant levels immediately",
        timestamp: "10 mins ago",
        severity: "Critical"
    },
    {
        id: "ALT-002",
        shipmentId: "SHP-2026-002",
        type: "Risk",
        message: "Approaching Buffer Limit",
        predictedIssue: "Humidity approaching 60% threshold",
        confidence: "Medium",
        suggestedAction: "Monitor sensor closely",
        timestamp: "45 mins ago",
        severity: "Warning"
    },
    {
        id: "ALT-003",
        shipmentId: "SYS-MAIN",
        type: "System",
        message: "Sensor Offline",
        predictedIssue: "Data packet loss detected in Sector 4",
        confidence: "High",
        suggestedAction: "Dispatch technician",
        timestamp: "2 hours ago",
        severity: "Warning"
    }
];

export const SENSORS: Sensor[] = [
    { id: "SNR-X500", location: "Warehouse A - Cold Room", status: "Online", temperature: 4.5, humidity: 42, battery: 98, lastUpdate: "Just now" },
    { id: "SNR-X501", location: "Warehouse A - Loading Dock", status: "Warning", temperature: 8.1, humidity: 55, battery: 45, lastUpdate: "5m ago" },
    { id: "SNR-X502", location: "Truck fleet - T04", status: "Offline", temperature: 0, humidity: 0, battery: 0, lastUpdate: "2h ago" },
    { id: "SNR-X503", location: "Warehouse B - Storage", status: "Online", temperature: 5.2, humidity: 40, battery: 88, lastUpdate: "1m ago" },
    { id: "SNR-X504", location: "Air Cargo Pallet #99", status: "Online", temperature: -18.2, humidity: 30, battery: 76, lastUpdate: "10m ago" },
];
