import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Settings,
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Bot,
  Database,
  Shield,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Users,
  CheckCircle,
  Plus,
  Star,
  Quote,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Clock,
  TrendingUp,
  Lock,
  Palette,
  Code,
  Headphones,
  Award,
  Target,
  Rocket,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function HomePage() {
  const features = [
    {
      icon: Palette,
      title: "Visual Widget Builder",
      description:
        "Drag-and-drop editor with real-time preview. Customize colors, fonts, and positioning without writing code.",
      href: "/widget-builder",
      color: "bg-blue-500",
    },
    {
      icon: Bot,
      title: "Multi-AI Integration",
      description:
        "Connect OpenAI, Claude, Gemini with intelligent fallback options and model selection.",
      href: "/ai-provider",
      color: "bg-purple-500",
    },
    {
      icon: Database,
      title: "Smart Knowledge Base",
      description:
        "Upload PDFs, DOCX, CSV files or scrape websites to train AI on your company data.",
      href: "/knowledge-base",
      color: "bg-green-500",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Track conversations, user satisfaction, AI performance with detailed insights and reports.",
      href: "/analytics",
      color: "bg-orange-500",
    },
    {
      icon: Shield,
      title: "Enterprise Ready",
      description:
        "Role-based access, white-labeling, webhook integrations, and enterprise security.",
      href: "/enterprise-settings",
      color: "bg-red-500",
    },
    {
      icon: Code,
      title: "Easy Integration",
      description:
        "One-line embed code. Works with any website, CMS, or platform. No technical expertise required.",
      href: "/dashboard",
      color: "bg-indigo-500",
    },
  ];

  const stats = [
    {
      label: "Active Widgets",
      value: "2.5K+",
      icon: MessageSquare,
      change: "+12%",
    },
    { label: "Conversations", value: "150K+", icon: Users, change: "+28%" },
    { label: "AI Providers", value: "15+", icon: Bot, change: "+5" },
    { label: "Uptime", value: "99.9%", icon: CheckCircle, change: "SLA" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechFlow",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      content:
        "Multi-AI Widget Builder transformed our customer support. 40% reduction in response time and our customers love the instant, accurate responses.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Product at InnovateCorp",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
      content:
        "The knowledge base integration is phenomenal. Our AI now understands our products perfectly and provides spot-on recommendations.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Customer Success Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      content:
        "Setup took 10 minutes. The visual editor is intuitive and the analytics give us insights we never had before. Highly recommended!",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 1,000 conversations/month",
        "2 AI providers",
        "Basic analytics",
        "Email support",
        "Standard widgets",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "Ideal for growing companies",
      features: [
        "Up to 10,000 conversations/month",
        "All AI providers",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "Knowledge base integration",
        "Webhook integrations",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with specific needs",
      features: [
        "Unlimited conversations",
        "All features included",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee",
        "On-premise deployment",
        "Advanced security",
      ],
      popular: false,
    },
  ];

  const whyChooseUs = [
    {
      icon: Rocket,
      title: "Lightning Fast Setup",
      description:
        "Get your AI chat widget live in under 10 minutes with our intuitive visual builder.",
    },
    {
      icon: Target,
      title: "Precision AI Training",
      description:
        "Upload your documents and train AI that understands your business inside and out.",
    },
    {
      icon: Award,
      title: "Enterprise Grade",
      description:
        "Built for scale with 99.9% uptime, advanced security, and compliance features.",
    },
    {
      icon: Headphones,
      title: "24/7 Expert Support",
      description:
        "Our team of AI specialists is here to help you succeed every step of the way.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Multi-AI Widget Builder
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Reviews
            </Link>
          </nav>
          <ThemeSwitcher />
          <Link href="/auth/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 animate-fade-in">
                  <Zap className="h-3 w-3 mr-1" />
                  Enterprise-Ready AI Platform
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-slide-up">
                  Build Intelligent
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {" "}
                    Chat Experiences
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl animate-slide-up">
                  Deploy customizable AI-powered chat widgets across your
                  websites with support for multiple AI providers, knowledge
                  base integration, and advanced analytics.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 btn-animate"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="btn-animate">
                    View Live Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-gradient-to-br from-background to-muted/20 rounded-2xl border shadow-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                    <div className="bg-primary/10 rounded-lg p-4 ml-8">
                      <div className="h-3 bg-primary/20 rounded w-2/3" />
                    </div>
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className="card-hover bg-background/50 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-green-600 font-medium">
                          {stat.change}
                        </p>
                      </div>
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to build, deploy, and manage AI chat widgets
              that deliver exceptional customer experiences.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-hover group">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're not just another chat widget. We're your partner in creating
              exceptional AI-powered customer experiences.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of businesses that trust us with their customer
              experience.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground leading-relaxed">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your needs. Upgrade or downgrade at any
              time.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`card-hover relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">
                      {plan.price}
                      <span className="text-lg font-normal text-muted-foreground">
                        /{plan.period}
                      </span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-primary" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Enterprise"
                      ? "Contact Sales"
                      : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 text-center text-white">
            <div className="space-y-6 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Transform Your Customer Experience?
              </h2>
              <p className="text-xl opacity-90">
                Join thousands of businesses using our AI chat widgets to
                provide instant, intelligent customer support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register">
                  <Button size="lg" variant="secondary" className="btn-animate">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary btn-animate"
                  >
                    View Demo
                  </Button>
                </Link>
              </div>
              <p className="text-sm opacity-75">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Multi-AI Widget Builder</h3>
              </div>
              <p className="text-muted-foreground">
                The most powerful AI chat widget platform for modern businesses.
              </p>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/features"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/integrations"
                    className="hover:text-foreground transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api"
                    className="hover:text-foreground transition-colors"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>support@multiaiwidget.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2024 Multi-AI Widget Builder. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/security"
                className="hover:text-foreground transition-colors"
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
