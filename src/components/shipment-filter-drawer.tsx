"use client";

import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface ShipmentFilters {
    drugNames: string[];
    riskLevels: string[];
    statuses: string[];
    tempMin: string;
    tempMax: string;
    humidityMin: string;
    humidityMax: string;
    route: string;
    etaFilter: string;
}

interface ShipmentFilterDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    filters: ShipmentFilters;
    onFiltersChange: (filters: ShipmentFilters) => void;
    onApply: () => void;
    onClear: () => void;
}

const DRUG_OPTIONS = [
    "Cold and Flu Medicine",
    "Insulin Glargine",
    "COVID-19 Vaccine",
    "Oncology Meds",
    "Antibiotics",
];

const RISK_OPTIONS = [
    { value: "Safe", color: "bg-[#00E676] hover:bg-[#00E676]/80" },
    { value: "Warning", color: "bg-[#FF9800] hover:bg-[#FF9800]/80" },
    { value: "Critical", color: "bg-red-500 hover:bg-red-600" },
];

const STATUS_OPTIONS = ["In-Transit", "Delayed", "Delivered"];

const ETA_OPTIONS = [
    { value: "all", label: "All" },
    { value: "in-transit", label: "In-Transit Only" },
    { value: "delayed", label: "Delayed Only" },
    { value: "delivered", label: "Delivered" },
];

export function ShipmentFilterDrawer({
    open,
    onOpenChange,
    filters,
    onFiltersChange,
    onApply,
    onClear,
}: ShipmentFilterDrawerProps) {
    const toggleArrayFilter = (key: keyof Pick<ShipmentFilters, "drugNames" | "riskLevels" | "statuses">, value: string) => {
        const currentArray = filters[key];
        const newArray = currentArray.includes(value)
            ? currentArray.filter((v) => v !== value)
            : [...currentArray, value];
        onFiltersChange({ ...filters, [key]: newArray });
    };

    const handleApply = () => {
        onApply();
        onOpenChange(false);
    };

    const handleClear = () => {
        onClear();
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:w-[450px] overflow-y-auto bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-slate-700/50">
                <SheetHeader className="space-y-3 pb-6 border-b border-slate-700/50">
                    <SheetTitle className="text-2xl font-bold text-white flex items-center gap-2">
                        Filter Shipments
                    </SheetTitle>
                    <SheetDescription className="text-slate-400">
                        Customize your shipment view with advanced filters
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-6 py-6">
                    {/* Drug Name Filter */}
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-200">Drug Name</Label>
                        <div className="flex flex-wrap gap-2">
                            {DRUG_OPTIONS.map((drug) => (
                                <Badge
                                    key={drug}
                                    variant={filters.drugNames.includes(drug) ? "default" : "outline"}
                                    className={`cursor-pointer transition-all ${filters.drugNames.includes(drug)
                                            ? "bg-[#00D4FF] text-slate-900 hover:bg-[#00D4FF]/90"
                                            : "border-slate-600 text-slate-300 hover:bg-slate-700"
                                        }`}
                                    onClick={() => toggleArrayFilter("drugNames", drug)}
                                >
                                    {drug}
                                    {filters.drugNames.includes(drug) && <X className="ml-1 h-3 w-3" />}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Risk Level Filter */}
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-200">Risk Level</Label>
                        <div className="flex flex-wrap gap-2">
                            {RISK_OPTIONS.map((risk) => (
                                <Badge
                                    key={risk.value}
                                    className={`cursor-pointer transition-all text-white ${filters.riskLevels.includes(risk.value)
                                            ? risk.color
                                            : "bg-slate-700 hover:bg-slate-600"
                                        }`}
                                    onClick={() => toggleArrayFilter("riskLevels", risk.value)}
                                >
                                    {risk.value}
                                    {filters.riskLevels.includes(risk.value) && <X className="ml-1 h-3 w-3" />}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-200">Status</Label>
                        <div className="flex flex-wrap gap-2">
                            {STATUS_OPTIONS.map((status) => (
                                <Badge
                                    key={status}
                                    variant={filters.statuses.includes(status) ? "default" : "outline"}
                                    className={`cursor-pointer transition-all ${filters.statuses.includes(status)
                                            ? "bg-[#00D4FF] text-slate-900 hover:bg-[#00D4FF]/90"
                                            : "border-slate-600 text-slate-300 hover:bg-slate-700"
                                        }`}
                                    onClick={() => toggleArrayFilter("statuses", status)}
                                >
                                    {status}
                                    {filters.statuses.includes(status) && <X className="ml-1 h-3 w-3" />}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Temperature Range */}
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-200">Temperature (°C)</Label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label className="text-xs text-slate-400">Min</Label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={filters.tempMin}
                                    onChange={(e) => onFiltersChange({ ...filters, tempMin: e.target.value })}
                                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs text-slate-400">Max</Label>
                                <Input
                                    type="number"
                                    placeholder="30"
                                    value={filters.tempMax}
                                    onChange={(e) => onFiltersChange({ ...filters, tempMax: e.target.value })}
                                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Humidity Range */}
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-200">Humidity (%)</Label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label className="text-xs text-slate-400">Min</Label>
                                <Input
                                    type="number"
                                    placeholder="20"
                                    value={filters.humidityMin}
                                    onChange={(e) => onFiltersChange({ ...filters, humidityMin: e.target.value })}
                                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs text-slate-400">Max</Label>
                                <Input
                                    type="number"
                                    placeholder="80"
                                    value={filters.humidityMax}
                                    onChange={(e) => onFiltersChange({ ...filters, humidityMax: e.target.value })}
                                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Route Search */}
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-200">Route Contains</Label>
                        <Input
                            type="text"
                            placeholder="e.g., Cairo, Mumbai, Tokyo..."
                            value={filters.route}
                            onChange={(e) => onFiltersChange({ ...filters, route: e.target.value })}
                            className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500"
                        />
                    </div>

                    {/* ETA Filter */}
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-200">ETA / Delivery</Label>
                        <Select
                            value={filters.etaFilter}
                            onValueChange={(value) => onFiltersChange({ ...filters, etaFilter: value })}
                        >
                            <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select filter" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                                {ETA_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value} className="text-white focus:bg-slate-700">
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="sticky bottom-0 pt-6 pb-4 border-t border-slate-700/50 bg-gradient-to-t from-slate-900 to-transparent space-y-3">
                    <Button
                        onClick={handleApply}
                        className="w-full h-11 bg-gradient-to-r from-[#00D4FF] to-[#00E676] hover:from-[#00D4FF]/90 hover:to-[#00E676]/90 text-slate-900 font-bold"
                    >
                        Apply Filters
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            variant="outline"
                            onClick={handleClear}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                            Clear All
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
