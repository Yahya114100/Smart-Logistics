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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RECENT_SHIPMENTS } from "@/lib/mockData";
import Link from "next/link";
import { ArrowRight, FileDown, Filter } from "lucide-react";
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

// CSV Export Utility Functions (Shared logic, but inline for component self-containment in demo)
const escapeCSVValue = (value: string | number): string => {
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
};

const convertToCSV = (data: Shipment[]): string => {
    const headers = ["Tracking ID", "Drug Name", "Route", "Status", "Risk Level", "Temperature", "Humidity", "ETA"];
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

export function RecentShipments() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState<ShipmentFilters>(INITIAL_FILTERS);
    const [appliedFilters, setAppliedFilters] = useState<ShipmentFilters>(INITIAL_FILTERS);

    // Filter Logic
    const filteredShipments = useMemo(() => {
        return RECENT_SHIPMENTS.filter((shipment: Shipment) => {
            if (appliedFilters.drugNames.length > 0 && !appliedFilters.drugNames.includes(shipment.drugName)) return false;
            if (appliedFilters.riskLevels.length > 0 && !appliedFilters.riskLevels.includes(shipment.riskStatus)) return false;
            if (appliedFilters.statuses.length > 0 && !appliedFilters.statuses.includes(shipment.status)) return false;
            if (appliedFilters.tempMin && parseFloat(appliedFilters.tempMin) > shipment.currentTemp) return false;
            if (appliedFilters.tempMax && parseFloat(appliedFilters.tempMax) < shipment.currentTemp) return false;
            if (appliedFilters.route) {
                const routeString = `${shipment.origin} → ${shipment.destination}`.toLowerCase();
                if (!routeString.includes(appliedFilters.route.toLowerCase())) return false;
            }
            return true;
        });
    }, [appliedFilters]);

    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (appliedFilters.drugNames.length > 0) count++;
        if (appliedFilters.riskLevels.length > 0) count++;
        if (appliedFilters.statuses.length > 0) count++;
        if (appliedFilters.tempMin || appliedFilters.tempMax) count++;
        if (appliedFilters.route) count++;
        return count;
    }, [appliedFilters]);

    const handleApplyFilters = () => {
        setAppliedFilters(filters);
        toast.success("Filters Applied", { description: `Found ${filteredShipments.length} shipments` });
    };

    const handleClearFilters = () => {
        setFilters(INITIAL_FILTERS);
        setAppliedFilters(INITIAL_FILTERS);
        toast.info("Filters Cleared");
    };

    const handleExportCSV = () => {
        if (filteredShipments.length === 0) {
            toast.error("No Data to Export");
            return;
        }
        try {
            const csvContent = convertToCSV(filteredShipments);
            const today = new Date().toISOString().split('T')[0];
            const filterSuffix = activeFilterCount > 0 ? '_filtered' : '';
            downloadCSV(csvContent, `pharmalogix_active_shipments_${today}${filterSuffix}.csv`);
            toast.success("Export Complete", { description: "CSV file downloaded successfully" });
        } catch (error) {
            toast.error("Export Failed");
        }
    };

    return (
        <Card className="col-span-7 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl shadow-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-700/50 pb-4">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Global Tracking
                    </CardTitle>
                    <p className="text-xs text-slate-400 font-medium">Live shipment status and risk analysis</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFilterOpen(true)}
                        className="h-8 transition-all duration-200 hover:bg-slate-700 hover:text-white cursor-pointer active:scale-95 shadow-sm"
                    >
                        <Filter className="mr-2 h-3.5 w-3.5" />
                        Filter
                        {activeFilterCount > 0 && (
                            <Badge className="ml-2 bg-[#00D4FF] text-[#0A2540] h-4 min-w-4 px-1 text-[10px] border-none font-bold">
                                {activeFilterCount}
                            </Badge>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExportCSV}
                        className="h-8 transition-all duration-200 hover:bg-slate-700 hover:text-white cursor-pointer active:scale-95 shadow-sm"
                    >
                        <FileDown className="mr-2 h-3.5 w-3.5" />
                        Export
                    </Button>
                    <div className="w-px h-6 bg-slate-700 mx-1" />
                    <Link href="/shipments">
                        <Button variant="ghost" size="sm" className="h-8 text-[#00D4FF] hover:bg-[#00D4FF]/10">
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <Table>
                    <TableHeader className="bg-slate-800/50 hover:bg-slate-800/50">
                        <TableRow className="border-slate-700/50 hover:bg-transparent">
                            <TableHead className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Tracking ID</TableHead>
                            <TableHead className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Origin / Destination</TableHead>
                            <TableHead className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Status</TableHead>
                            <TableHead className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Risk</TableHead>
                            <TableHead className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Temp</TableHead>
                            <TableHead className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider text-right">ETA</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredShipments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-slate-500 font-medium">
                                    No shipments match your criteria
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredShipments.map((shipment) => (
                                <TableRow key={shipment.id} className="border-slate-700/50 hover:bg-slate-800/30 transition-colors group">
                                    <TableCell className="font-bold text-slate-200 group-hover:text-[#00D4FF] transition-colors">{shipment.id}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-300">{shipment.origin}</span>
                                            <span className="text-[10px] text-slate-500">to {shipment.destination}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="font-bold text-[10px] bg-slate-800 text-slate-300 border-slate-700 active:scale-95 transition-transform">
                                            {shipment.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`font-bold text-[10px] border-none shadow-sm ${shipment.riskStatus === 'Safe' ? 'bg-[#00E676]/15 text-[#00E676]' :
                                                    shipment.riskStatus === 'Warning' ? 'bg-[#FF9800]/15 text-[#FF9800]' :
                                                        'bg-red-500/15 text-red-500'
                                                }`}
                                            variant="outline"
                                        >
                                            {shipment.riskStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className={`font-bold text-xs ${shipment.currentTemp > shipment.maxTemp || shipment.currentTemp < shipment.minTemp
                                            ? "text-red-500"
                                            : "text-[#00E676]"
                                        }`}>
                                        {shipment.currentTemp}°C
                                    </TableCell>
                                    <TableCell className="text-right text-xs font-bold text-slate-300">{shipment.eta}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>

            <ShipmentFilterDrawer
                open={filterOpen}
                onOpenChange={setFilterOpen}
                filters={filters}
                onFiltersChange={setFilters}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
            />
        </Card>
    );
}
