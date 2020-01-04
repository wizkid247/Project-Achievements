
/* Oliver Yellock & Kat Lissa */
package Movie;

import java.util.InputMismatchException;
import java.util.Scanner;

//setting the time and dates while showing the menu of choices and catching any errors if anything fails.
public class BoxOffice {

    public static void main(String[] args) {
    	//set the date and times for the early and late showing.
        Theater early = new Theater("November 15", "10:00 AM");
        Theater late = new Theater("November 15", "8:00 PM");
        
        while (true) {
	        try {
	        
	        	//menu for choices to buy a ticket, return a ticket, or exit the menu.
	            System.out.println("What would you like to do?\n"
	                    + "1. Buy Tickets\n"
	                    + "2. Return Tickets\n"
	                    + "3. Exit");
	            Scanner in = new Scanner(System.in);
	            int choice = in.nextInt();
	        
	            
	            switch (choice) {
	                case 1://if buying a ticket then show menu to choose the time.
	                    System.out.println("\nWhich showing?\n"
	                            + "1. Early (10:00 AM)\n"
	                            + "2. Late (8:00 PM)");
	                    int showing = in.nextInt();
	
	                    switch (showing) {
	                        case 1://if the time is for the early showing and the ticket is not able to be purchased.
	                            if (!early.purchaseTicket()) {
	                                System.out.println("Purchase Failed!\n");
	                            }
	                            break;
	                        case 2://if the time is for the late showing and the ticket is not able to be purchased.
	                            if (!late.purchaseTicket()) {
	                                System.out.println("Purchase Failed!\n");
	                            }
	                            break;
	                        default:
	                            break;
	                    }
	                    break;
	                case 2://if returning a ticket then show menu to choose the time.
	                    System.out.println("\nWhich showing?\n"
	                            + "1. Early (10:00 AM)\n"
	                            + "2. Late (8:00 PM)");
	                    showing = in.nextInt();
	
	                    switch (showing) {
	                        case 1://if the time is for the early showing and the ticket is not able to be returned.
	                            if (!early.returnTicket()) {
	                                System.out.println("Return Failed!\n");
	                            }
	                            break;
	                        case 2://if the time is for the late showing and the ticket is not able to be returned.
	                            if (!late.returnTicket()) {
	                                System.out.println("Return Failed!\n");
	                            }
	                            break;
	                        default:
	                            break;
	                    }
	                    break;
	                case 3://if chose to exit.
	                    System.exit(0);
	                    break;
	                default:
	                    break;
	            }
	        }catch(InputMismatchException exception) {//exception to catch if anything but a number is typed in.
	    		System.out.println("Not a number.\n\n");
	        	}
    	}
        
    }
}
