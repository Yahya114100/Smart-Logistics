"use client";

import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function AlertsPage() {
    const [cleared, setCleared] = useState(false);

    const handleClearAll = () => {
        if (cleared) return;
        toast.success("All alerts have been acknowledged and cleared.");
        setCleared(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Predictive Alerts</h1>
                <Button variant="destructive" onClick={handleClearAll} disabled={cleared}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All Alerts
                </Button>
            </div>

            {!cleared ? (
                <div className="grid gap-6">
                    <AlertsPanel />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed rounded-lg">
                    <div className="rounded-full bg-muted p-4 mb-4">
                        <Trash2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">No Active Alerts</h2>
                    <p className="text-muted-foreground">System is running within normal parameters.</p>
                </div>
            )}
        </div>
    );
}
