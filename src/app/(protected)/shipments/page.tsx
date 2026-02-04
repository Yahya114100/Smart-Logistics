"use client";

import { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RECENT_SHIPMENTS } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, Filter, X } from "lucide-react";
import { toast } from "sonner";
import { ShipmentFilterDrawer, ShipmentFilters } from "@/components/shipment-filter-drawer";
import { Shipment } from "@/lib/types";

const INITIAL_FILTERS: ShipmentFilters = {
    drugNames: [],
    riskLevels: [],
    statuses: [],
    tempMin: "",
    tempMax: "",
    humidityMin: "",
    humidityMax: "",
    route: "",
    etaFilter: "all",
};

// CSV Export Utility Functions
const escapeCSVValue = (value: string | number): string => {
    const stringValue = String(value);
    // If value contains comma, quote, or newline, wrap in quotes and escape internal quotes
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
};

const convertToCSV = (data: Shipment[]): string => {
    const headers = [
        "Tracking ID",
        "Drug Name",
        "Route",
        "Status",
        "Risk Level",
        "Temperature",
        "Humidity",
        "ETA"
    ];

    const csvRows = [headers.join(',')];

    data.forEach(shipment => {
        const row = [
            escapeCSVValue(shipment.id),
            escapeCSVValue(shipment.drugName),
            escapeCSVValue(`${shipment.origin} → ${shipment.destination}`),
            escapeCSVValue(shipment.status),
            escapeCSVValue(shipment.riskStatus),
            escapeCSVValue(`${shipment.currentTemp}°C`),
            escapeCSVValue(`${shipment.humidity}%`),
            escapeCSVValue(shipment.eta)
        ];
        csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
};

const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export default function ShipmentsPage() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState<ShipmentFilters>(INITIAL_FILTERS);
    const [appliedFilters, setAppliedFilters] = useState<ShipmentFilters>(INITIAL_FILTERS);

    // Duplicate shipments for demo
    const allShipments = useMemo(() => RECENT_SHIPMENTS.concat(RECENT_SHIPMENTS), []);

    // Apply filters
    const filteredShipments = useMemo(() => {
        return allShipments.filter((shipment: Shipment) => {
            // Drug Name filter
            if (appliedFilters.drugNames.length > 0 && !appliedFilters.drugNames.includes(shipment.drugName)) {
                return false;
            }

            // Risk Level filter
            if (appliedFilters.riskLevels.length > 0 && !appliedFilters.riskLevels.includes(shipment.riskStatus)) {
                return false;
            }

            // Status filter
            if (appliedFilters.statuses.length > 0 && !appliedFilters.statuses.includes(shipment.status)) {
                return false;
            }

            // Temperature filter
            if (appliedFilters.tempMin && parseFloat(appliedFilters.tempMin) > shipment.currentTemp) {
                return false;
            }
            if (appliedFilters.tempMax && parseFloat(appliedFilters.tempMax) < shipment.currentTemp) {
                return false;
            }

            // Humidity filter
            if (appliedFilters.humidityMin && parseFloat(appliedFilters.humidityMin) > shipment.humidity) {
                return false;
            }
            if (appliedFilters.humidityMax && parseFloat(appliedFilters.humidityMax) < shipment.humidity) {
                return false;
            }

            // Route filter
            if (appliedFilters.route) {
                const routeString = `${shipment.origin} → ${shipment.destination}`.toLowerCase();
                if (!routeString.includes(appliedFilters.route.toLowerCase())) {
                    return false;
                }
            }

            // ETA filter
            if (appliedFilters.etaFilter !== "all") {
                if (appliedFilters.etaFilter === "in-transit" && shipment.status !== "In-Transit") {
                    return false;
                }
                if (appliedFilters.etaFilter === "delayed" && shipment.status !== "Delayed") {
                    return false;
                }
                if (appliedFilters.etaFilter === "delivered" && shipment.status !== "Delivered") {
                    return false;
                }
            }

            return true;
        });
    }, [allShipments, appliedFilters]);

    // Count active filters
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (appliedFilters.drugNames.length > 0) count++;
        if (appliedFilters.riskLevels.length > 0) count++;
        if (appliedFilters.statuses.length > 0) count++;
        if (appliedFilters.tempMin || appliedFilters.tempMax) count++;
        if (appliedFilters.humidityMin || appliedFilters.humidityMax) count++;
        if (appliedFilters.route) count++;
        if (appliedFilters.etaFilter !== "all") count++;
        return count;
    }, [appliedFilters]);

    const handleApplyFilters = () => {
        setAppliedFilters(filters);
        toast.success("Filters Applied", { description: `Found ${filteredShipments.length} shipments` });
    };

    const handleClearFilters = () => {
        setFilters(INITIAL_FILTERS);
        setAppliedFilters(INITIAL_FILTERS);
        toast.info("Filters Cleared", { description: "Showing all shipments" });
    };

    const handleExportCSV = () => {
        if (filteredShipments.length === 0) {
            toast.error("No Data to Export", { description: "No shipments available to export" });
            return;
        }

        try {
            let csvContent = "";

            // Add filter summary as a comment row if filters are active
            if (activeFilterCount > 0) {
                const activeFilters = [];
                if (appliedFilters.drugNames.length > 0) activeFilters.push(`Drugs: ${appliedFilters.drugNames.join('|')}`);
                if (appliedFilters.riskLevels.length > 0) activeFilters.push(`Risk: ${appliedFilters.riskLevels.join('|')}`);
                if (appliedFilters.statuses.length > 0) activeFilters.push(`Status: ${appliedFilters.statuses.join('|')}`);
                if (appliedFilters.tempMin || appliedFilters.tempMax) activeFilters.push(`Temp: ${appliedFilters.tempMin || 'min'} to ${appliedFilters.tempMax || 'max'}`);
                if (appliedFilters.route) activeFilters.push(`Route: ${appliedFilters.route}`);
                if (appliedFilters.etaFilter !== 'all') activeFilters.push(`ETA: ${appliedFilters.etaFilter}`);

                csvContent += `# Exported with filters: ${activeFilters.join(', ')}\n`;
            }

            csvContent += convertToCSV(filteredShipments);
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            const filterSuffix = activeFilterCount > 0 ? '_filtered' : '';
            const filename = `pharmalogix_active_shipments_${today}${filterSuffix}.csv`;

            downloadCSV(csvContent, filename);

            toast.success("CSV Downloaded", {
                description: `Exported ${filteredShipments.length} shipment${filteredShipments.length > 1 ? 's' : ''} successfully`
            });
        } catch (error) {
            toast.error("Export Failed", { description: "An error occurred while exporting data" });
        }
    };

    const removeFilter = (filterType: string, value?: string) => {
        const newFilters = { ...appliedFilters };

        if (filterType === "drugName" && value) {
            newFilters.drugNames = newFilters.drugNames.filter(d => d !== value);
        } else if (filterType === "riskLevel" && value) {
            newFilters.riskLevels = newFilters.riskLevels.filter(r => r !== value);
        } else if (filterType === "status" && value) {
            newFilters.statuses = newFilters.statuses.filter(s => s !== value);
        } else if (filterType === "temperature") {
            newFilters.tempMin = "";
            newFilters.tempMax = "";
        } else if (filterType === "humidity") {
            newFilters.humidityMin = "";
            newFilters.humidityMax = "";
        } else if (filterType === "route") {
            newFilters.route = "";
        } else if (filterType === "eta") {
            newFilters.etaFilter = "all";
        }

        setFilters(newFilters);
        setAppliedFilters(newFilters);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Active Shipments</h1>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setFilterOpen(true)}
                        className="relative transition-all duration-200 hover:bg-slate-700 hover:text-white cursor-pointer active:scale-95 shadow-sm hover:shadow-cyan-500/20"
                    >
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                        {activeFilterCount > 0 && (
                            <Badge className="ml-2 bg-[#00D4FF] text-slate-900 h-5 min-w-5 px-1.5 border-none">
                                {activeFilterCount}
                            </Badge>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleExportCSV}
                        className="transition-all duration-200 hover:bg-slate-700 hover:text-white cursor-pointer active:scale-95 shadow-sm hover:shadow-cyan-500/20"
                    >
                        <FileDown className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Active Filter Badges */}
            {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2">
                    {appliedFilters.drugNames.map(drug => (
                        <Badge key={drug} variant="secondary" className="gap-1">
                            Drug: {drug}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("drugName", drug)} />
                        </Badge>
                    ))}
                    {appliedFilters.riskLevels.map(risk => (
                        <Badge key={risk} variant="secondary" className="gap-1">
                            Risk: {risk}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("riskLevel", risk)} />
                        </Badge>
                    ))}
                    {appliedFilters.statuses.map(status => (
                        <Badge key={status} variant="secondary" className="gap-1">
                            Status: {status}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("status", status)} />
                        </Badge>
                    ))}
                    {(appliedFilters.tempMin || appliedFilters.tempMax) && (
                        <Badge variant="secondary" className="gap-1">
                            Temp: {appliedFilters.tempMin || "−∞"}°C to {appliedFilters.tempMax || "∞"}°C
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("temperature")} />
                        </Badge>
                    )}
                    {(appliedFilters.humidityMin || appliedFilters.humidityMax) && (
                        <Badge variant="secondary" className="gap-1">
                            Humidity: {appliedFilters.humidityMin || "0"}% to {appliedFilters.humidityMax || "100"}%
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("humidity")} />
                        </Badge>
                    )}
                    {appliedFilters.route && (
                        <Badge variant="secondary" className="gap-1">
                            Route: {appliedFilters.route}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("route")} />
                        </Badge>
                    )}
                    {appliedFilters.etaFilter !== "all" && (
                        <Badge variant="secondary" className="gap-1">
                            ETA: {appliedFilters.etaFilter}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("eta")} />
                        </Badge>
                    )}
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Global Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                    {filteredShipments.length === 0 ? (
                        <div className="text-center py-12 space-y-4">
                            <p className="text-xl font-semibold text-muted-foreground">No shipments match your filters</p>
                            <Button variant="outline" onClick={handleClearFilters}>
                                Clear Filters
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tracking ID</TableHead>
                                    <TableHead>Drug Name</TableHead>
                                    <TableHead>Route</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Risk Level</TableHead>
                                    <TableHead>Temperature</TableHead>
                                    <TableHead>Humidity</TableHead>
                                    <TableHead className="text-right">ETA</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredShipments.map((shipment, i) => (
                                    <TableRow key={`${shipment.id}-${i}`} className="cursor-pointer hover:bg-muted/50">
                                        <TableCell className="font-medium">{shipment.id}</TableCell>
                                        <TableCell>{shipment.drugName}</TableCell>
                                        <TableCell>
                                            <span className="text-xs text-muted-foreground">{shipment.origin} → {shipment.destination}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{shipment.status}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    shipment.riskStatus === 'Safe' ? 'bg-[#00E676]/15 text-[#00E676] border-[#00E676]/20' :
                                                        shipment.riskStatus === 'Warning' ? 'bg-[#FF9800]/15 text-[#FF9800] border-[#FF9800]/20' :
                                                            'bg-destructive/15 text-destructive border-destructive/20'
                                                }
                                                variant="outline"
                                            >
                                                {shipment.riskStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className={
                                            shipment.currentTemp > shipment.maxTemp || shipment.currentTemp < shipment.minTemp
                                                ? "text-destructive font-bold"
                                                : "text-success font-bold"
                                        }>
                                            {shipment.currentTemp}°C
                                        </TableCell>
                                        <TableCell>{shipment.humidity}%</TableCell>
                                        <TableCell className="text-right">{shipment.eta}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <ShipmentFilterDrawer
                open={filterOpen}
                onOpenChange={setFilterOpen}
                filters={filters}
                onFiltersChange={setFilters}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
            />
        </div>
    );
}
