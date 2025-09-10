import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MovieCard } from "@/components/MovieCard";
import { MovieDetails } from "@/components/MovieDetails";
import { SeatSelector } from "@/components/SeatSelector";
import { TheatreInfo } from "./TheatreInfo";
import { useToast } from "@/hooks/use-toast";

// Import movie posters
import shadowStrikePoster from "@/assets/movie-shadow-strike.jpg";
import loveParisPoster from "@/assets/movie-love-paris.jpg";
import quantumRealmPoster from "@/assets/movie-quantum-realm.jpg";
import midnightTerrorPoster from "@/assets/movie-midnight-terror.jpg";

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

const movies: Movie[] = [
  {
    id: "1",
    title: "Shadow Strike",
    poster: shadowStrikePoster,
    rating: 8.5,
    duration: "2h 15m",
    genre: "Action/Thriller",
    description: "An elite operative must navigate a web of betrayal and espionage to prevent a global catastrophe. With breathtaking action sequences and heart-pounding suspense, Shadow Strike delivers an unforgettable cinematic experience.",
    director: "Michael Bay",
    cast: ["Tom Hardy", "Scarlett Johansson", "Idris Elba"],
    showtimes: ["2:30 PM", "5:15 PM", "8:00 PM", "10:45 PM"],
  },
  {
    id: "2",
    title: "Love in Paris",
    poster: loveParisPoster,
    rating: 7.8,
    duration: "1h 52m",
    genre: "Romance/Comedy",
    description: "A charming romantic comedy about two strangers who meet in the City of Light and discover that love knows no boundaries. Set against the stunning backdrop of Paris, this heartwarming tale will make you believe in love again.",
    director: "Nancy Meyers",
    cast: ["Ryan Gosling", "Emma Stone", "Marion Cotillard"],
    showtimes: ["1:00 PM", "3:45 PM", "6:30 PM", "9:15 PM"],
  },
  {
    id: "3",
    title: "Quantum Realm",
    poster: quantumRealmPoster,
    rating: 9.1,
    duration: "2h 28m",
    genre: "Sci-Fi/Adventure",
    description: "Journey to the edge of reality in this mind-bending sci-fi epic. When scientists discover a portal to parallel dimensions, they must race against time to prevent the collapse of the multiverse.",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Amy Adams", "Oscar Isaac"],
    showtimes: ["1:15 PM", "4:30 PM", "7:45 PM", "11:00 PM"],
  },
  {
    id: "4",
    title: "Midnight Terror",
    poster: midnightTerrorPoster,
    rating: 7.3,
    duration: "1h 48m",
    genre: "Horror/Thriller",
    description: "A psychological horror masterpiece that will keep you on the edge of your seat. When a family moves to an isolated mansion, they discover that some secrets are better left buried.",
    director: "Jordan Peele",
    cast: ["Lupita Nyong'o", "Winston Duke", "Elisabeth Moss"],
    showtimes: ["4:00 PM", "6:45 PM", "9:30 PM", "11:45 PM"],
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("movies");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const { toast } = useToast();

  const handleMovieSelect = (movieId: string) => {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
      setSelectedMovie(movie);
    }
  };

  const handleShowtimeSelect = (time: string) => {
    setSelectedShowtime(time);
  };

  const handleBooking = (selectedSeats: any[]) => {
    toast({
      title: "Booking Confirmed! 🎬",
      description: `Your tickets for ${selectedMovie?.title} at ${selectedShowtime} have been booked successfully.`,
    });
    // Reset to movies list
    setSelectedMovie(null);
    setSelectedShowtime(null);
    setActiveTab("movies");
  };

  const handleBack = () => {
    if (selectedShowtime) {
      setSelectedShowtime(null);
    } else if (selectedMovie) {
      setSelectedMovie(null);
    }
  };

  const renderContent = () => {
    if (activeTab === "hours" || activeTab === "location") {
      return <TheatreInfo />;
    }

    if (selectedShowtime && selectedMovie) {
      return (
        <SeatSelector
          movieTitle={selectedMovie.title}
          showtime={selectedShowtime}
          onBooking={handleBooking}
        />
      );
    }

    if (selectedMovie) {
      return (
        <MovieDetails
          movie={selectedMovie}
          onBack={handleBack}
          onSelectShowtime={handleShowtimeSelect}
        />
      );
    }

    return (
      <div className="space-y-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Now Showing
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover the latest blockbusters and indie films
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MovieCard
                {...movie}
                onClick={() => handleMovieSelect(movie.id)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
