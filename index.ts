#! usr/bin/env node

import inquirer from "inquirer"
import chalk from  "chalk"

type Flight = {
    flightNumber: string;
    destination: string;
    departure: string;
    seatsAvailable: number;
};
  
  type Booking = {
    name: string;
    flightNumber: string;
  };
  
  const flights: Flight[] = [
    { flightNumber: 'AB123', destination: 'New York', departure: '10:00 AM', seatsAvailable: 5 },
    { flightNumber: 'CD456', destination: 'Los Angeles', departure: '1:00 PM', seatsAvailable: 3 },
    { flightNumber: 'EF789', destination: 'Chicago', departure: '6:00 PM', seatsAvailable: 8 },
  ];
  
  let bookings: Booking[] = [];
  

async function main() {
     let isRun = true
   while(isRun){
        const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: ['Search Flights', 'Book Ticket', 'View Bookings', 'Cancel Booking', 'Exit'],
      },
     ]);
  
     switch (answers.action) {
       case 'Search Flights':
        console.log(chalk.blue('Available Flights:'));
        flights.forEach((flight, index) => {
          console.log(`${index + 1}. Flight Number: ${chalk.bold(flight.flightNumber)}, Destination: ${flight.destination}, Departure: ${flight.departure}, Seats Available: ${flight.seatsAvailable}`);
        });
        break;
  
       case 'Book Ticket':
        const { flightNumber, name } = await inquirer.prompt([
          { type: 'input', name: 'flightNumber', message: 'Enter the flight number:' },
          { type: 'input', name: 'name', message: 'Enter your name:' },
        ]);
  
        const flight = flights.find(f => f.flightNumber === flightNumber);
        if (flight && flight.seatsAvailable > 0) {
          bookings.push({ name, flightNumber });
          flight.seatsAvailable--;
          console.log(chalk.green('Ticket booked successfully!'));
        } else {
          console.log(chalk.red('Flight not found or no seats available.'));
        }
        break;
  
       case 'View Bookings':
        if (bookings.length === 0) {
          console.log(chalk.yellow('No bookings found.'));
        } else {
          console.log(chalk.blue('Bookings:'));
          bookings.forEach((booking, index) => {
            console.log(`${index + 1}. Name: ${chalk.bold(booking.name)}, Flight Number: ${booking.flightNumber}`);
          });
        }
        break; 

        case "Cancel Booking":

        const {bookingName ,bookingFlightNumber}= await inquirer.prompt(
            [
                {
                    type: 'input', 
                    name: 'bookingName', 
                    message: 'Enter your name:'
       
                },
                {
                    type :"input",
                    name : "bookingFlightNumber",
                    meaasge : "Enter Your Flight Number"

                }
            ]
        )

        const bookingIndex = bookings.findIndex( b => b.name === bookingName && b . flightNumber === bookingFlightNumber)

        if (bookingIndex !== -1){
            bookings.splice(bookingIndex, 1 );
            const bookedFlight  = flights.find(f => f.flightNumber === bookingFlightNumber);
            if (bookedFlight) bookedFlight.seatsAvailable++ ;
            console.log(chalk.green(`Booking canceled Sucessfully`));
        }
        else {
            console.log(chalk.red(`Booking Not Found`));
        }

        break;

        case 'Exit':
              isRun = false ;
              if (isRun === false){
                

              }

              default :
              console.log("Exiting......")

              
    }
              
  }

        
}




main ()



