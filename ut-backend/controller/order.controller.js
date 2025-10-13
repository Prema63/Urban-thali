const { secret } = require("../config/secret");
const Order = require("../model/Order");
const { confirmationTemplate, itemsToHtmlRows } = require('../services/email-templates');
const { sendEmail } = require('../services/mailer.service');


// addOrder
exports.addOrder = async (req, res, next) => {
  try {
    const orderItems = await Order.create(req.body);

    res.status(200).json({
      success: true,
      message: "Order added successfully",
      order: orderItems,
    });
  }
  catch (error) {
    console.log(error);
    next(error)
  }
};
// get Orders
exports.getOrders = async (req, res, next) => {
  try {
    const orderItems = await Order.find({}).populate('user');
    res.status(200).json({
      success: true,
      data: orderItems,
    });
  }
  catch (error) {
    console.log(error);
    next(error)
  }
};
// get Orders
exports.getSingleOrder = async (req, res, next) => {
  try {
    const orderItem = await Order.findById(req.params.id).populate('user');
    res.status(200).json(orderItem);
  }
  catch (error) {
    console.log(error);
    next(error)
  }
};


// update code of order confirmation with sending emails
exports.updateOrderStatus = async (req, res, next) => {
  const newStatus = req.body.status;

  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Update status
    order.status = newStatus;
    await order.save();

    // Send confirmation email only if order is confirmed
    if (newStatus === 'confirmed') {
      const itemsHtml = itemsToHtmlRows(order.cart);

      const htmlContent = confirmationTemplate({
        name: order.name,
        orderId: order.invoice,
        itemsHtml,
        total: order.totalAmount,
        address: order.address,
        eta: order.estimatedDeliveryTime || 'Soon',
      });

      await sendEmail({
        to: order.email,  // user email from order
        subject: `Your UrbanThali Order #${order.invoice} is Confirmed!`,
        html: htmlContent,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};


