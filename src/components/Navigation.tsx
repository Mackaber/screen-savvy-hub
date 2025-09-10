import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Film, Clock, MapPin, Ticket } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="bg-gradient-hero border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Film className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-cinema bg-clip-text text-transparent">
              CinemaMax
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === "movies" ? "cinema" : "ghost"}
              onClick={() => onTabChange("movies")}
              className="flex items-center gap-2"
            >
              <Film className="w-4 h-4" />
              Movies
            </Button>
            <Button
              variant={activeTab === "hours" ? "cinema" : "ghost"}
              onClick={() => onTabChange("hours")}
              className="flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Hours
            </Button>
            <Button
              variant={activeTab === "location" ? "cinema" : "ghost"}
              onClick={() => onTabChange("location")}
              className="flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Location
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}