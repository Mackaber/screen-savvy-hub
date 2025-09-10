import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Clock, Calendar } from "lucide-react";

interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  duration: string;
  genre: string;
  description: string;
  director: string;
  cast: string[];
  showtimes: string[];
}

interface MovieDetailsProps {
  movie: Movie;
  onBack: () => void;
  onSelectShowtime: (time: string) => void;
}

export function MovieDetails({ movie, onBack, onSelectShowtime }: MovieDetailsProps) {
  return (
    <div className="animate-slide-up">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Movies
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Poster */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-card border-border overflow-hidden">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-auto object-cover"
            />
          </Card>
        </div>

        {/* Movie Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {movie.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="text-lg font-medium text-foreground">{movie.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span>{movie.duration}</span>
              </div>
              <Badge variant="secondary" className="text-sm">
                {movie.genre}
              </Badge>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {movie.description}
            </p>

            <div className="space-y-3">
              <div>
                <span className="font-semibold text-foreground">Director: </span>
                <span className="text-muted-foreground">{movie.director}</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">Cast: </span>
                <span className="text-muted-foreground">{movie.cast.join(", ")}</span>
              </div>
            </div>
          </div>

          {/* Showtimes */}
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Showtimes
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {movie.showtimes.map((time, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => onSelectShowtime(time)}
                    className="h-12 text-base font-medium hover:border-primary hover:bg-primary/10"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}