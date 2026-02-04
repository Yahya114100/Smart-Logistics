import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SENSORS } from "@/lib/mockData";
import { Radio, Battery, Thermometer, Droplets, Signal } from "lucide-react";

export default function SensorsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">IoT Sensor Network</h1>
                <Badge variant="outline" className="text-lg px-4 py-1">
                    <Signal className="mr-2 h-4 w-4 text-success animate-pulse" />
                    Network Online
                </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {SENSORS.map((sensor) => (
                    <Card key={sensor.id} className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {sensor.id}
                            </CardTitle>
                            <Radio className={`h-4 w-4 ${sensor.status === 'Online' ? 'text-success' : sensor.status === 'Warning' ? 'text-warning' : 'text-destructive'}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-1">{sensor.temperature}°C</div>
                            <p className="text-xs text-muted-foreground mb-4">{sensor.location}</p>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Droplets className="h-4 w-4 text-blue-400" />
                                    <span>{sensor.humidity}%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Battery className="h-4 w-4 text-gray-400" />
                                    <span>{sensor.battery}%</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/50 px-6 py-3">
                            <div className="text-xs text-muted-foreground w-full flex justify-between">
                                <span>Last update: {sensor.lastUpdate}</span>
                                <Badge variant={sensor.status === 'Online' ? 'secondary' : 'destructive'} className="text-[10px] h-5">
                                    {sensor.status}
                                </Badge>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
