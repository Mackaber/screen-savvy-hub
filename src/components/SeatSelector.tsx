import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Seat {
  id: string;
  row: string;
  number: number;
  isAvailable: boolean;
  isSelected: boolean;
  price: number;
}

interface SeatSelectorProps {
  movieTitle: string;
  showtime: string;
  onBooking?: (selectedSeats: Seat[]) => void;
}

export function SeatSelector({ movieTitle, showtime, onBooking }: SeatSelectorProps) {
  const [seats, setSeats] = useState<Seat[]>(() => {
    const seatData: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    
    rows.forEach(row => {
      for (let i = 1; i <= 12; i++) {
        seatData.push({
          id: `${row}${i}`,
          row,
          number: i,
          isAvailable: Math.random() > 0.3, // Random availability
          isSelected: false,
          price: row <= 'C' ? 25 : row <= 'F' ? 20 : 15,
        });
      }
    });
    
    return seatData;
  });

  const toggleSeat = (seatId: string) => {
    setSeats(prev => prev.map(seat => 
      seat.id === seatId && seat.isAvailable
        ? { ...seat, isSelected: !seat.isSelected }
        : seat
    ));
  };

  const selectedSeats = seats.filter(seat => seat.isSelected);
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleBooking = () => {
    if (selectedSeats.length > 0) {
      onBooking?.(selectedSeats);
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">{movieTitle}</h2>
        <p className="text-muted-foreground">Showtime: {showtime}</p>
      </div>

      {/* Screen */}
      <div className="text-center">
        <div className="bg-gradient-cinema h-3 rounded-lg mx-auto w-3/4 mb-2"></div>
        <p className="text-sm text-muted-foreground">SCREEN</p>
      </div>

      {/* Seat Map */}
      <div className="grid grid-cols-14 gap-2 max-w-4xl mx-auto">
        {/* Row labels */}
        <div></div>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="text-center text-xs text-muted-foreground p-1">
            {i + 1}
          </div>
        ))}
        <div></div>

        {/* Seats */}
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(row => (
          <>
            <div key={`${row}-label`} className="flex items-center justify-center text-sm font-medium text-muted-foreground">
              {row}
            </div>
            {seats
              .filter(seat => seat.row === row)
              .map(seat => (
                <Button
                  key={seat.id}
                  variant={
                    !seat.isAvailable 
                      ? "seat-unavailable" 
                      : seat.isSelected 
                        ? "seat-selected" 
                        : "seat"
                  }
                  size="icon"
                  className="w-8 h-8 text-xs"
                  onClick={() => toggleSeat(seat.id)}
                  disabled={!seat.isAvailable}
                >
                  {seat.number}
                </Button>
              ))}
            <div key={`${row}-label-end`} className="flex items-center justify-center text-sm font-medium text-muted-foreground">
              {row}
            </div>
          </>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Button variant="seat" size="icon" className="w-4 h-4 pointer-events-none" />
          <span className="text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="seat-selected" size="icon" className="w-4 h-4 pointer-events-none" />
          <span className="text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="seat-unavailable" size="icon" className="w-4 h-4 pointer-events-none" />
          <span className="text-muted-foreground">Unavailable</span>
        </div>
      </div>

      {/* Booking Summary */}
      {selectedSeats.length > 0 && (
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selected Seats:</span>
                <div className="flex gap-1">
                  {selectedSeats.map(seat => (
                    <Badge key={seat.id} variant="outline">
                      {seat.id}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-bold text-accent text-lg">${totalPrice}</span>
              </div>
              <Button 
                variant="cinema" 
                className="w-full" 
                size="lg"
                onClick={handleBooking}
              >
                Book Tickets
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}