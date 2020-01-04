/* Oliver Yellock & Kat Lissa */

package Movie;

//class to hold the exception when all of the tickets are sold out.
public class AllTicketsSoldOutException extends Exception {

	//constructor showing the exception error message.
    public AllTicketsSoldOutException() {
        super("\nAll tickets are sold out");
    }

    //constructor to show any specific message that might be passed as a parameter.
    public AllTicketsSoldOutException(String message) {
        super(message);
    }
}

