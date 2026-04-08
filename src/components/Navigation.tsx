import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Brain, BookOpen, Activity, LogOut, User, LayoutDashboard, Moon, Sun } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/home", icon: LayoutDashboard },
    { name: "Predict", href: "/predict", icon: Activity },
    { name: "Library", href: "/disease-library", icon: BookOpen },
    { name: "Mental Health", href: "/mental-health", icon: Brain },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/home")}>
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-gradient">HealthAI</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  size="sm"
                  className={`gap-2 transition-all ${isActive(item.href) ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => navigate(item.href)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground px-2">
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline max-w-[120px] truncate">{user.email}</span>
                </div>
                <Button variant="outline" size="sm" onClick={signOut} className="gap-1.5">
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => navigate("/")} className="bg-gradient-primary border-0">
                Sign In
              </Button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`w-full justify-start gap-2 ${isActive(item.href) ? "bg-primary/10 text-primary" : ""}`}
                  onClick={() => { navigate(item.href); setIsOpen(false); }}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Button>
              );
            })}
            {user ? (
              <Button variant="outline" className="w-full mt-2 gap-2" onClick={() => { signOut(); setIsOpen(false); }}>
                <LogOut className="h-4 w-4" /> Sign Out
              </Button>
            ) : (
              <Button className="w-full mt-2 bg-gradient-primary border-0" onClick={() => { navigate("/"); setIsOpen(false); }}>
                Sign In
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
