import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import Header from "@/react-app/components/Header";
import { Button } from "@/react-app/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/react-app/components/ui/table";
import { Badge } from "@/react-app/components/ui/badge";
import {
  Key,
  Shield,
  HardDrive,
  Activity,
  Plus,
  Eye,
  LogOut,
  Zap,
  ChevronRight,
} from "lucide-react";

interface DashboardStats {
  activeLicenses: number;
  hardwareLocked: number;
  totalLicenses: number;
  securityStatus: string;
}

interface License {
  id: number;
  license_key: string;
  plan: string;
  status: string;
  hardware_id: string | null;
  is_hardware_locked: number;
  expires_at: string | null;
  created_at: string;
}

export default function DashboardPage() {
  const { user, isPending, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !user) {
      navigate("/auth");
    }
  }, [user, isPending, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [statsRes, licensesRes] = await Promise.all([
        fetch("/api/dashboard/stats"),
        fetch("/api/licenses"),
      ]);

      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
      if (licensesRes.ok) {
        setLicenses(await licensesRes.json());
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateLicense = async () => {
    try {
      const res = await fetch("/api/licenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "Professional" }),
      });

      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to create license:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const statCards = [
    {
      icon: Key,
      label: "Active Licenses",
      value: stats?.activeLicenses ?? 0,
      color: "from-primary to-cyan-400",
    },
    {
      icon: Shield,
      label: "Security Status",
      value: stats?.securityStatus ?? "Standard",
      color: "from-emerald-500 to-teal-400",
    },
    {
      icon: HardDrive,
      label: "Hardware Locks",
      value: stats?.hardwareLocked ?? 0,
      color: "from-violet-500 to-purple-400",
    },
    {
      icon: Activity,
      label: "Total Licenses",
      value: stats?.totalLicenses ?? 0,
      color: "from-orange-500 to-amber-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user.google_user_data?.given_name || user.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, index) => (
              <div
                key={index}
                className="relative overflow-hidden p-6 rounded-2xl bg-card border border-border/50 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity" 
                     style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Licenses Table */}
          <div className="rounded-2xl bg-card border border-border/50 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-400">
                  <Key className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Hardware-Locked Licenses
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your license keys and hardware locks
                  </p>
                </div>
              </div>
              <Button
                onClick={handleCreateLicense}
                size="sm"
                className="gap-2 bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
                New License
              </Button>
            </div>

            {licenses.length === 0 ? (
              <div className="p-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Key className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No licenses yet
                </h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Purchase a subscription to get your first license key and start using Codrex AI.
                </p>
                <Link to="/pricing">
                  <Button className="gap-2 bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90">
                    <Zap className="h-4 w-4" />
                    View Pricing
                  </Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="text-muted-foreground">License Key</TableHead>
                    <TableHead className="text-muted-foreground">Plan</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Hardware Lock</TableHead>
                    <TableHead className="text-muted-foreground">Created</TableHead>
                    <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {licenses.map((license) => (
                    <TableRow
                      key={license.id}
                      className="border-border/50 hover:bg-muted/30"
                    >
                      <TableCell className="font-mono text-sm">
                        {license.license_key.substring(0, 4)}••••••••
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-primary/30 text-primary"
                        >
                          {license.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            license.status === "active"
                              ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {license.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {license.is_hardware_locked ? (
                          <div className="flex items-center gap-2 text-sm">
                            <HardDrive className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">
                              {license.hardware_id?.substring(0, 8) || "Locked"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Not locked
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(license.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to={`/license-key/${license.id}`}>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            View
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
