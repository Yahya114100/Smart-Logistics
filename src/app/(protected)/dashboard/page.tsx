"use client";

import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { TempChart } from "@/components/dashboard/temp-chart";
import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { RecentShipments } from "@/components/dashboard/recent-shipments";
import { WarehouseMap } from "@/components/dashboard/warehouse-map";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Map, LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
    const [viewMode, setViewMode] = useState("overview");

    useEffect(() => {
        const saved = localStorage.getItem("dashboard_view");
        if (saved) setViewMode(saved);
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">
                    {viewMode === 'map' ? 'Live Warehouse Map' : 'Dashboard Overview'}
                </h1>
                <div className="flex items-center gap-2">
                    <div className="flex bg-muted/40 p-1 rounded-xl border border-slate-700/50 backdrop-blur-sm shadow-inner">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('overview')}
                            className={`gap-2 transition-all duration-300 cursor-pointer rounded-lg px-4 ${viewMode === 'overview'
                                    ? 'bg-[#00D4FF] text-[#0A2540] shadow-[0_0_15px_rgba(0,212,255,0.3)] font-bold'
                                    : 'text-slate-400 hover:bg-slate-700 hover:text-white hover:shadow-sm'
                                }`}
                        >
                            <LayoutDashboard className={`h-4 w-4 ${viewMode === 'overview' ? 'text-[#0A2540]' : 'text-slate-400'}`} />
                            Overview
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('map')}
                            className={`gap-2 transition-all duration-300 cursor-pointer rounded-lg px-4 ${viewMode === 'map'
                                    ? 'bg-[#00D4FF] text-[#0A2540] shadow-[0_0_15px_rgba(0,212,255,0.3)] font-bold'
                                    : 'text-slate-400 hover:bg-slate-700 hover:text-white hover:shadow-sm'
                                }`}
                        >
                            <Map className={`h-4 w-4 ${viewMode === 'map' ? 'text-[#0A2540]' : 'text-slate-400'}`} />
                            Map View
                        </Button>
                    </div>
                </div>
            </div>

            <KpiGrid />

            {viewMode === 'map' ? (
                <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
                    <WarehouseMap />
                    <TempChart />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
                        <TempChart />
                        <AlertsPanel />
                    </div>
                    <RecentShipments />
                </>
            )}
        </div>
    );
}
