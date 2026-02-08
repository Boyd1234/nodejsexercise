const TicketSystem = require('./ticketsystem');
const ticketSystem = new TicketSystem();

ticketSystem.on('ticketCreated', function(arg){
    console.log('event: ', arg)
});

ticketSystem.newTicket('testticket', 'dit is een test');