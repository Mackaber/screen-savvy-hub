import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Phone, Mail } from "lucide-react";

export function TheatreInfo() {
  const hours = [
    { day: "Monday - Thursday", hours: "10:00 AM - 11:00 PM" },
    { day: "Friday - Saturday", hours: "10:00 AM - 12:00 AM" },
    { day: "Sunday", hours: "11:00 AM - 10:00 PM" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Theatre Information</h1>
        <p className="text-xl text-muted-foreground">Your premium cinema experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hours */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Clock className="w-6 h-6 text-primary" />
              Operating Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {hours.map((schedule, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                <span className="font-medium text-foreground">{schedule.day}</span>
                <span className="text-muted-foreground">{schedule.hours}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Location & Contact */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MapPin className="w-6 h-6 text-primary" />
              Location & Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
              <div>
                <p className="font-medium text-foreground">CinemaMax Theater</p>
                <p className="text-muted-foreground">123 Hollywood Boulevard</p>
                <p className="text-muted-foreground">Los Angeles, CA 90028</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">(555) 123-4567</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">info@cinemamax.com</span>
            </div>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card className="bg-gradient-card border-border md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Amenities & Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎬</span>
                </div>
                <h3 className="font-semibold text-foreground">Premium Screens</h3>
                <p className="text-sm text-muted-foreground">4K Digital projection with Dolby Atmos sound</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🪑</span>
                </div>
                <h3 className="font-semibold text-foreground">Luxury Seating</h3>
                <p className="text-sm text-muted-foreground">Reclining leather seats with extra legroom</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🍿</span>
                </div>
                <h3 className="font-semibold text-foreground">Gourmet Concessions</h3>
                <p className="text-sm text-muted-foreground">Premium snacks and beverages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}