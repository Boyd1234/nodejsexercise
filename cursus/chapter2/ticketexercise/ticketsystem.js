const EventEmitter = require('events');

class TicketSystem extends EventEmitter{
    newTicket(customer, issue){
        this.emit('ticketCreated', {customer:customer, issue:issue})
    }
}

module.exports = TicketSystem