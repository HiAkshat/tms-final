import { Ticket } from "../models/ticketModel.mjs";
import { Organisation } from "../models/organisationModel.mjs";
const getTickets = async (req, res) => {
    try {
        const data = await Ticket.find({}).populate('assignee').populate('reporter');
        // const data = await Ticket.find({ reporter: { $in: OrganisationUser.findById(req.params.id).select('_id') } })
        console.log("Ticket details retrieved!");
        res.status(200).json(data);
    }
    catch (e) {
        res.status(404).json({ error: e });
        console.log("Error occured retrieving ticket details:", e);
    }
};
const getTicket = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await Ticket.findById(req.params.id).populate('assignee').populate('reporter');
        console.log("Ticket details retrieved!");
        res.status(200).json(data);
    }
    catch (e) {
        res.status(404).json({ error: e });
        console.log("Error occured retrieving ticket details:", e);
    }
};
const addTicket = async (req, res) => {
    try {
        let org_data = await Organisation.findById(req.body.organisation);
        console.log(org_data);
        if (org_data) {
            req.body.key = `${org_data.organisation_name}-${org_data.total_tickets + 1}`;
            org_data.total_tickets += 1;
            await org_data.save();
        }
        const data = await Ticket.create(req.body);
        res.status(200).json(data);
        console.log("New ticket has been added to database!");
    }
    catch (e) {
        res.status(404).json({ error: e });
    }
};
const getOrgTickets = async (req, res) => {
    try {
        // console.log(req.params.organisation)
        const data = await Ticket.find({ organisation: req.params.id }).populate('assignee').populate('reporter');
        // const filteredData = data.filter(ticket => ticket.assignee.organisation === req.params.id);
        console.log("Ticket details retrieved!");
        res.status(200).json(data);
    }
    catch (e) {
        res.status(404).json({ error: e });
        console.log("Error occured retrieving ticket details:", e);
    }
};
const editTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const updatedTicket = req.body;
        const updated = await Ticket.findByIdAndUpdate(ticketId, updatedTicket, { new: true });
        if (!updated) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(updated);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const deleted = await Ticket.findByIdAndDelete(ticketId);
        if (!deleted) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json({ message: 'Ticket deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export { getTicket, getTickets, getOrgTickets, addTicket, editTicket, deleteTicket };
//# sourceMappingURL=ticketController.mjs.map