// src/lib/types.ts

export type Status = 'Safe' | 'Warning' | 'Critical';
export type ShipmentStatus = 'In-Transit' | 'Delivered' | 'Pending' | 'Delayed';

export interface Shipment {
    id: string;
    origin: string;
    destination: string;
    drugName: string;
    currentTemp: number;
    minTemp: number;
    maxTemp: number;
    humidity: number;
    status: ShipmentStatus;
    riskStatus: Status;
    eta: string;
    coordinates: { lat: number; lng: number };
}

export interface Sensor {
    id: string;
    location: string;
    status: 'Online' | 'Offline' | 'Warning';
    temperature: number;
    humidity: number;
    battery: number;
    lastUpdate: string;
}

export interface Alert {
    id: string;
    shipmentId: string;
    type: 'Temperature' | 'Delay' | 'System' | 'Risk';
    message: string;
    predictedIssue: string;
    confidence: 'High' | 'Medium' | 'Low';
    suggestedAction: string;
    timestamp: string;
    severity: Status;
}

export interface KPI {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    iconName: string;
}
