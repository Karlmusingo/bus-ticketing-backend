import { Ticket } from '../models';
import { statusCodes } from '../constants';

/**
 * @export
 * @class TicketController
 */
export default class TicketController {
  /**
   * Create a ticket
   *
   * @author Karl Musingo
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} ticket
   * @memberof TicketController
   */
  static async create(req, res) {
    const { name, dob } = req.body;

    const ticket = await Ticket.create({
      name,
      dob,
    });

    return res.status(statusCodes.CREATED).json({
      status: statusCodes.CREATED,
      ticket,
    });
  }

  /**
   * Get all the tickets
   *
   * @author Karl Musingo
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {array} chats
   * @memberof TicketController
   */
  static async getAll(req, res) {
    const tickets = await Ticket.find();

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      tickets,
    });
  }

  /**
   * Get the today's tickets
   *
   * @author Karl Musingo
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {array} chats
   * @memberof TicketController
   */
  static async getForToday(req, res) {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const tickets = await Ticket.find({
      createdAt: { $gte: startOfToday },
    });

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      tickets,
    });
  }
}
