const smpp = require('smpp');

async function sendMessage(senderId, receivers = [], message) {
  const response = {
    ok: false,
    success: [],
    errors: [],
    summary: ''
  };

  try {
    const session = await smpp.connect({
      url: 'smpp://20.39.43.35:7661',
      auto_enquire_link_period: 10000,
      debug: false
    });

    await session.bind_transceiver({
      system_id: 'FWALLP',
      password: 'FWALLP',
      system_type: 'SMPP'
    });

    console.log('Successfully bound');
    session.on('deliver_sm', async (pdu) => {
      if (pdu.esm_class === 4 && pdu.receipted_message_id) {
        // Delivery receipt received
        console.log('Delivery receipt received:', pdu.receipted_message_id);

        const phoneNumber = pdu.source_addr.toString();
        const deliveryStatus = pdu.message_state === 2 ? 'delivered' : 'undelivered';

        // Update the response with the delivery status
        const successIndex = response.success.findIndex((item) => item.phone === phoneNumber);
        if (successIndex !== -1) {
          // response.success[successIndex].delievery = deliveryStatus;
          // response.success[successIndex].ack_id =  pdu.receipted_message_id;
        }
      }
    });

    for (const phoneNumber of receivers) {
      try {
        const submitResponse = await session.submit_sm({
          source_addr: senderId,
          destination_addr: phoneNumber,
          short_message: message
        });
        if (submitResponse) {
          response.success.push({
            phone: phoneNumber,
            status: 'success',
            delievery: undefined,
            ack_id: undefined
          });
          console.log(submitResponse.message_id);
        } else {
          response.errors.push({
            phone: phoneNumber,
            status: 'failed',
            ack_id: null
          });
        }
      } catch (error) {
        console.error('Error sending message:', error);
        response.errors.push({
          phone: phoneNumber,
          status: 'failed',
          ack_id: null
        });
      }
    }

    await session.close();
    console.log('Connection closed without error');
    response.ok = true;
  } catch (error) {
    console.error('Error connecting to SMPP server:', error);
    response.summary = 'Error connecting to SMPP server';
  }

  setTimeout(() => {
    return response;
    
  }, 15000);

}

module.exports = sendMessage