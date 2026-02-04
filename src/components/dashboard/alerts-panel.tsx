import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Thermometer, Clock, ArrowRight } from "lucide-react";
import { ALERTS } from "@/lib/mockData";

export function AlertsPanel() {
    const iconMap: any = {
        Temperature: Thermometer,
        Delay: Clock,
        Risk: AlertTriangle,
        System: AlertTriangle
    };

    return (
        <Card className="col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Live Predictive Alerts</CardTitle>
                <Badge variant="destructive" className="animate-pulse">3 Critical</Badge>
            </CardHeader>
            <CardContent className="grid gap-4">
                {ALERTS.map((alert, i) => {
                    const Icon = iconMap[alert.type];
                    return (
                        <div key={i} className="flex items-start space-x-4 rounded-md border p-4 bg-muted/40 hover:bg-muted/60 transition-colors">
                            <div className={`mt-1 rounded-full p-2 bg-background border ${alert.severity === 'Critical' ? 'text-destructive border-destructive/30' : 'text-warning border-warning/30'}`}>
                                <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none flex items-center justify-between">
                                    {alert.message}
                                    <span className="text-xs text-muted-foreground font-normal">{alert.timestamp}</span>
                                </p>
                                <p className="text-xs text-muted-foreground">{alert.shipmentId}</p>
                                <div className="mt-2 rounded-md bg-background p-2 text-xs border border-border/50">
                                    <span className="font-semibold text-primary">AI Prediction: </span>
                                    {alert.predictedIssue}
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 self-center">
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    );
}
