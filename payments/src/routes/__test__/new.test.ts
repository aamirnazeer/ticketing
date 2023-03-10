import { OrderStatus } from '@aamirnazeerbhat/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { stripe } from '../../stripe';

jest.mock('../../stripe');

it('returns a 404 when purchainsg an order which does not exsit', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'asdfasdf',
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it('returns a 401 when purchainsg an order that doesnt belong to the user', async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'asdfasdf',
      orderId: order.id,
    })
    .expect(401);
});

it('returns a 400 when purchainsg a cancelled order', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(userId))
    .send({
      orderId: order.id,
      token: 'asdfasdf',
    })
    .expect(400);
});

// it('returns a 204 with valid inputs', async () => {
//   const userId = new mongoose.Types.ObjectId().toHexString();
//   const order = Order.build({
//     id: new mongoose.Types.ObjectId().toHexString(),
//     userId: userId,
//     version: 0,
//     price: 20,
//     status: OrderStatus.Created,
//   });
//   await order.save();

//   await request(app)
//     .post('/api/payments')
//     .set('Cookie', global.signin(userId))
//     .send({
//       token: 'tok_visa',
//       orderId: order.id,
//     })
//     .expect(201);

//   const chargeOptions = (stripe.paymentIntents.create as jest.Mock).mock
//     .calls[0][0];
//   expect(chargeOptions.payment_method_types[0]).toEqual('card');
//   expect(chargeOptions.amount).toEqual(20 * 100);
//   expect(chargeOptions.currency).toEqual('usd');
// });

// amount: order.price * 100,
// currency: 'usd',
// payment_method_types: ['card'],