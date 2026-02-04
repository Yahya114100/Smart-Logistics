import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function DemoPlanPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1 container py-12 px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl font-bold tracking-tight lg:text-5xl">Demo Plan – Intelligent Pharma Logistics</h1>
                        <p className="text-xl text-muted-foreground">
                            Hackathon Presentation Flow (Benha 2026)
                        </p>
                        <Link href="/login">
                            <Button size="lg" className="mt-4">
                                View Live Demo
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-primary">1. The Hook (Problem)</h2>
                            <Card>
                                <CardContent className="pt-6">
                                    <ul className="list-disc leading-relaxed pl-5 space-y-2">
                                        <li><strong>Scenario:</strong> A shipment of insulin is traveling from Cairo to Alexandria.</li>
                                        <li><strong>Conflict:</strong> The truck's cooling unit malfunctions in 35°C heat.</li>
                                        <li><strong>Traditional Outcome:</strong> The driver notices too late. The entire shipment is spoiled. $50,000 lost. Patients denied meds.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-primary">2. The Solution Story</h2>
                            <Card>
                                <CardContent className="pt-6">
                                    <ul className="list-disc leading-relaxed pl-5 space-y-2">
                                        <li><strong>Consumption Increase:</strong> "With NERVIQS, the story changes."</li>
                                        <li><strong>Analysis:</strong> Our IoT sensors detect a 0.5°C deviation trend that is invisible to human eyes.</li>
                                        <li><strong>Risk Prediction:</strong> AI predicts: "Critical threshold will be breached in 28 minutes."</li>
                                        <li><strong>Alert:</strong> System instantly notifies HQ and the Driver.</li>
                                        <li><strong>Recommendation:</strong> "Suggest rerouting to nearest Cold Storage facility (10km away)."</li>
                                        <li><strong>Prevention:</strong> Driver acts. Cargo saved. Zero waste.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-primary">3. Technical Highlights</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <Card>
                                    <CardHeader><CardTitle className="text-lg">Predictive Models</CardTitle></CardHeader>
                                    <CardContent>Analyzing time-series temperature data against external weather factors.</CardContent>
                                </Card>
                                <Card>
                                    <CardHeader><CardTitle className="text-lg">Real-Time Architecture</CardTitle></CardHeader>
                                    <CardContent>Next.js 15 for lightning fast dashboards + Simulated IoT data ingestion.</CardContent>
                                </Card>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <footer className="w-full border-t bg-[#0A2540] text-gray-400 py-8 text-center text-sm">
                © 2026 NERVIQS. Internal Demo Plan.
            </footer>
        </div>
    );
}
