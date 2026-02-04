import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function FeaturesPage() {
    const features = [
        {
            title: "Predictive Risk Detection",
            description: "AI machine learning models analyze historical and real-time data to forecast temperature excursions up to 30 minutes before they occur."
        },
        {
            title: "Real-time Temperature Monitoring",
            description: "Continuous tracking of temperature and humidity across all shipments with instant deviation alerts."
        },
        {
            title: "Intelligent Recommendations",
            description: "Prescriptive analytics suggest specific corrective actions to drivers and warehouse staff to prevent spoilage."
        },
        {
            title: "Smart Route Optimization",
            description: "Dynamic routing based on traffic, weather, and sensitive cargo requirements."
        },
        {
            title: "Compliance Reporting",
            description: "Automated generation of audit-ready reports for FDA and GDP compliance."
        },
        {
            title: "End-to-End Encryption",
            description: "Military-grade security ensures your supply chain data remains confidential and tamper-proof."
        }
    ];

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1 container py-12 px-4 md:px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">Platform Features</h1>
                    <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
                        Everything you need to secure your pharmaceutical supply chain.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, i) => (
                        <Card key={i} className="bg-card border-border/50">
                            <CardHeader>
                                <CheckCircle2 className="h-10 w-10 text-primary mb-2" />
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
            <footer className="w-full border-t bg-[#0A2540] text-gray-400 py-8 text-center text-sm">
                © 2026 NERVIQS. Features Overview.
            </footer>
        </div>
    );
}
