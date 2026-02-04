import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Play, ShieldAlert, ThermometerSnowflake, Activity, FileText, CheckCircle2, Plus } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-[#0A2540] text-white">
          {/* Abstract Background Effect */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#00D4FF] blur-[150px]"></div>
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[#00E676] blur-[150px]"></div>
          </div>

          <div className="container relative z-10 grid gap-8 px-4 md:grid-cols-2 md:items-center md:px-6">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-3 py-1 text-sm text-[#00D4FF]">
                <span className="flex h-2 w-2 rounded-full bg-[#00D4FF] mr-2 animate-pulse"></span>
                v1.0 Hackathon Demo
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Secure, Predictive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#00E676]">Supply Chain Intelligence</span>
                <br className="hidden lg:inline" /> for the Medical Industry.
              </h1>
              <p className="max-w-[700px] text-lg text-gray-300 md:text-xl">
                Predict risks before they happen. Prevent waste. Eliminate shortages.
                The world's first AI-driven logistics platform designed for life-saving cargo.
                <span> Used by leading pharmaceutical companies • 99.8% risk prediction accuracy • Preventing 1.2M doses of waste annually</span>
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/login">
                  <Button size="lg" className="w-full bg-[#00D4FF] text-[#0A2540] hover:bg-[#00D4FF]/90 sm:w-auto font-bold text-md h-12">
                    Launch Live Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Dashboard Mockup Teaser */}
            <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none group cursor-pointer">
              <Link href="/dashboard">
                <div className="relative rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-[#00D4FF]/30 group-hover:shadow-[0_0_40px_-10px_rgba(0,212,255,0.3)]">
                  <div className="absolute -top-12 -left-12 h-24 w-24 rounded-xl bg-gradient-to-br from-[#FFB800] to-[#FF3B5C] opacity-20 blur-2xl"></div>
                  <div className="aspect-video w-full rounded-lg bg-[#0f2a4a] overflow-hidden relative border border-white/5 p-4">
                    {/* Simulation of Dashboard UI */}
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                      <div className="h-4 w-32 bg-white/10 rounded"></div>
                      <div className="flex gap-2">
                        <div className="h-6 w-6 rounded-full bg-white/10"></div>
                        <div className="h-6 w-6 rounded-full bg-white/10"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-20 rounded bg-white/5 border border-white/5"></div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4 h-32">
                      <div className="col-span-2 rounded bg-white/5 border border-white/5"></div>
                      <div className="col-span-1 rounded bg-white/5 border border-white/5"></div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all">
                      <span className="text-sm font-mono text-[#00D4FF] border border-[#00D4FF] px-3 py-1 rounded bg-[#00D4FF]/10 group-hover:bg-[#00D4FF] group-hover:text-[#0A2540] transition-colors font-bold">
                        Live System Preview
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* THE PROBLEM SECTION */}
        <section className="py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Why NERVIQS?</h2>
              <p className="text-muted-foreground max-w-[800px] mx-auto text-lg">
                The pharmaceutical supply chain is broken. Sensitive medications are wasted every day due to lack of visibility.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-card/50 border-destructive/20 shadow-lg relative overflow-hidden group hover:border-destructive/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-b from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader>
                  <ShieldAlert className="h-10 w-10 text-destructive mb-2" />
                  <CardTitle className="text-xl">Drug Shortages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Logistics failures cause critical stockouts, putting patient lives at risk when expected deliveries fail.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-warning/20 shadow-lg relative overflow-hidden group hover:border-warning/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-b from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader>
                  <Activity className="h-10 w-10 text-warning mb-2" />
                  <CardTitle className="text-xl">$35 Billion Loss</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Annual loss in the pharma industry due to temperature excursions during transit.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-primary/20 shadow-lg relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader>
                  <ThermometerSnowflake className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-xl">Temperature Damage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Consistent cold-chain failures ruin efficacy of vaccines and insulin.</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-destructive/20 shadow-lg relative overflow-hidden group hover:border-destructive/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-b from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader>
                  <ShieldAlert className="h-10 w-10 text-destructive mb-2" />
                  <CardTitle className="text-xl">50% Vaccine Waste</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Globally, up to 50% of vaccines are wasted each year due to cold chain failures (WHO), resulting in lost doses.</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-warning/20 shadow-lg relative overflow-hidden group hover:border-warning/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-b from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader>
                  <FileText className="h-10 w-10 text-warning mb-2" />
                  <CardTitle className="text-xl">Billions in Expiry</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Inaccurate demand forecasting and poor visibility lead to massive overproduction and expiry of sensitive drugs.</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-destructive/20 shadow-lg relative overflow-hidden group hover:border-destructive/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-b from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader>
                  <Activity className="h-10 w-10 text-destructive mb-2" />
                  <CardTitle className="text-xl">Lives at Risk</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Supply chain disruptions directly endanger patients who rely on timely, potent medications.</p>
                </CardContent>
              </Card>

              {/* Optional 4th Card */}
              <Card className="bg-card/50 border-primary/20 shadow-lg relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader>
                  <CheckCircle2 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-xl">Environmental Crisis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Preventable pharma waste increases medical pollution and carbon emissions from excess production.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* OUR SOLUTION (From Demo PDF) */}
        <section className="py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">The Intelligent Cycle of Prevention</h2>
                <ul className="space-y-6">
                  {[
                    { title: "Analysis", desc: "Real-time sensor data ingest from IoT devices." },
                    { title: "Risk Prediction", desc: "AI forecasts temperature breaches 30 mins before they happen." },
                    { title: "Alert & Action", desc: "Instant notifications to drivers with corrective actions." },
                    { title: "Prevention", desc: "Spoilage prevented, compliance guaranteed." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                        {i + 1}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-square lg:aspect-auto h-full min-h-[400px] rounded-xl bg-gradient-to-br from-[#0A2540] to-[#113055] p-8 flex items-center justify-center border border-border/50">
                {/* Abstract visual for the cycle */}
                <div className="relative w-full max-w-sm aspect-square border-2 border-dashed border-primary/30 rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -ml-3 -mt-3 h-6 w-6 rounded-full bg-primary shadow-[0_0_20px_#00D4FF]"></div>
                </div>
                <div className="absolute text-center z-10">
                  <h3 className="text-4xl font-black text-white">99.9%</h3>
                  <p className="text-primary-foreground/80">Reliability Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KEY FEATURES */}
        <section className="py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter">Platform Capabilities</h2>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                "Predictive Risk Detection",
                "Temp & Humidity Monitoring",
                "Intelligent Recommendations",
                "Real-time Dashboards",
                "Compliance Reports"
              ].map((feature, i) => (
                <Card key={i} className="hover:-translate-y-1 transition-transform cursor-default">
                  <CardContent className="pt-6 flex flex-col items-center text-center gap-2">
                    <CheckCircle2 className="h-8 w-8 text-success mb-2" />
                    <p className="font-semibold">{feature}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* TRUSTED BY */}
        <section className="py-12 border-y bg-muted/30">
          <div className="container px-4 md:px-6 text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Trusted by Global Leaders</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Fake Logos (Text based for now) */}
              {["PharmaCorp", "MediLine", "BioTech Global", "HealthExpress", "VaxSystems"].map((logo) => (
                <span key={logo} className="text-xl font-black text-foreground">{logo}</span>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t bg-[#0A2540] text-gray-400 py-12">
        <div className="container px-4 md:px-6 grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#00D4FF] text-[#0A2540]">
                <Plus className="h-4 w-4" strokeWidth={3} />
              </div>
              <span className="text-lg font-bold">NERVIQS</span>
            </div>
            <p className="text-sm">
              Advance Logistics Platform for the Medical Industry.
              <br /> Hackathon 2026.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>Features</li>
              <li>Security</li>
              <li>Integrations</li>
              <li>Enterprise</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Case Studies</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>HIPAA Compliance</li>
            </ul>
          </div>
        </div>
        <div className="container px-4 md:px-6 mt-12 pt-8 border-t border-white/10 text-center text-xs">
          © 2026 NERVIQS. Built for Benha Hackathon. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
