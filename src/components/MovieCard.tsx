import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star } from "lucide-react";

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  rating: number;
  duration: string;
  genre: string;
  showtimes: string[];
  onClick?: () => void;
}

export function MovieCard({ 
  title, 
  poster, 
  rating, 
  duration, 
  genre, 
  showtimes, 
  onClick 
}: MovieCardProps) {
  return (
    <Card 
      className="bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-cinema cursor-pointer group overflow-hidden animate-fade-in"
      onClick={onClick}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm font-medium text-foreground">{rating}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{duration}</span>
          </div>
        </div>
        
        <Badge variant="secondary" className="mb-3">
          {genre}
        </Badge>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Showtimes</p>
          <div className="flex flex-wrap gap-2">
            {showtimes.slice(0, 3).map((time, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {time}
              </Badge>
            ))}
            {showtimes.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{showtimes.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}