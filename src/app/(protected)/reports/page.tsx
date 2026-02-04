"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Share2, Plus } from "lucide-react";
import { toast } from "sonner";

export default function ReportsPage() {
    const reports = [
        { title: "Temperature Compliance Report", desc: "Monthly summary of all temperature deviations regarding GDP compliance.", date: "Feb 2026" },
        { title: "Risk Assessment Summary", desc: "AI-driven analysis of supply chain vulnerabilities and incident predictions.", date: "Feb 2026" },
        { title: "Sensor Health Audit", desc: "Technical status report of all active IoT nodes.", date: "Jan 2026" },
    ];

    const handleGenerateValues = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Generating comprehensive report...',
                success: (data) => {
                    return `Report generated successfully!`;
                },
                error: 'Error',
            }
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
                <div className="flex gap-2">
                    <Button onClick={handleGenerateValues} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Generate New Report
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                {reports.map((report, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-primary" />
                                        {report.title}
                                    </CardTitle>
                                    <CardDescription>{report.desc}</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => toast.success(`Shared ${report.title} with team.`)}>
                                        <Share2 className="mr-2 h-4 w-4" />
                                        Share
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => toast.success(`Downloaded ${report.title}`)}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download PDF
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">Generated: {report.date} • Size: 2.4 MB</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
