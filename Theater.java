/* Oliver Yellock & Kat Lissa */

package Movie;

import Movie.AllTicketsSoldOutException;
import java.util.Scanner;

//set values and allow a ticket to be purchased or returned.
public class Theater {

        final int SEAT_CAP = 50; //max value of seats available in the theater.
        int seatsAvail; //holds how many seats are available.
        int[] seats = new int[SEAT_CAP]; //array to hold which specific seat each customer buys.
        boolean[] avail = new boolean[SEAT_CAP]; //array to hold if specific seat is available to buy.
        String date;
        String time;

        //constructor to set the date, time, and number of seats. 
        Theater(String date, String time) {
            seatsAvail = SEAT_CAP;
            for (int i = 0; i < SEAT_CAP; i++) {
                seats[i] = (i + 1);
                avail[i] = true;
            }
            this.date = date;
            this.time = time;
        }

        //holds if the theater is full.
        public boolean theaterFull() {
            return (seatsAvail == 0);
        }

        //where a person can buy a ticket. 
        public boolean purchaseTicket() {
            if (!theaterFull()) { //if theater is not full then allow them to purchase the ticket.
                System.out.println("\nWhat is your name?");
                Scanner in = new Scanner(System.in);
                String name = in.nextLine();
                int seat = 0;
                for (int i = 0; i < SEAT_CAP;) {//continue until all of the seats are full.
                    if (avail[i]==true) {//if the seat is available make it now unavailable and decrease the total amount of available seats.
                        avail[i]=false;
                        seatsAvail--;
                        seat = i;
                        i++;
                        break;
                    }else if(avail[i]==false){//if the seat is not available move onto the next seat.
                        i++;
                    }
                }
                //print out the name, seat, date, and time for the customer that just bought the ticket.
                System.out.println("\n" + name + " has bought ticket " + seats[seat] + "\n"
                        + "Showtime: " + date + " " + time + "\n\n"
                ); 
                return true;
            }
            try {//throw an exception when all of the tickets for the time are sold out.
                throw new AllTicketsSoldOutException();
            } catch (AllTicketsSoldOutException ex) {
                System.err.println("Tickets for Downton Abbey at " + time + " on "
                        + date + " are sold out!");
            }
            finally {//return false when the exception executes and all the tickets for the time are sold out.
                return false;
            }
        }

        //where a person can return a ticket.
        public boolean returnTicket() {
            System.out.println("\nWhat is your ticket number?");
            Scanner in = new Scanner(System.in);
            int ticket = in.nextInt();
            
            //if the index (starting at zero, therefore ticket number - 1) where the persons seat was not available 
            //then now make it available and increase the number of available seats.
            if (avail[ticket - 1] == false) {
            	avail[ticket - 1] = true;
                System.out.println("Return success!\n");
                seatsAvail++;
                return true;
            }else {//if the ticket was not purchased then produce an error.
                System.err.println("Uh-oh! It looks as if that ticket was never purchased!");
                return false;
            }
        }
    }

