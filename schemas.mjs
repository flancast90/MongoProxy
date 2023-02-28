import mongoose from 'mongoose'
mongoose.pluralize(null);

const date = (options) => {
    var today = new Date();

    var date = 'm/d/Y'
    .replace('d', today.getDate())
    .replace('m', today.getMonth()+(options || 1))
    .replace('Y', today.getFullYear());

    return date;
}

export const users = new mongoose.Schema({
  id: {
    required: true,
    type: String
  },
  username: {
    required: true,
    type: String
  },
  password: {
    type: String,
    required: true
  },
  pendingDeletion: {
    required: true,
    type: Boolean
  }
});

export const fpp = new mongoose.Schema({
  username: {
    required: true,
    type: String
  }
})

export const signage = new mongoose.Schema({
  username: {
    required: true,
    type: String
  }
})

export const user = new mongoose.Schema({
    id: { type: String,unique: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    accountType: { type: String, default: 'processing' },
    pendingDeletion: { type: Boolean, default: false },
    gateway: { type: String, default: 'processing' },
    isRunning: { type: Boolean, default: false },
    lastSecret: { type: String, default: '' },
    index: { type: Number, default: 0 },
    mode: { 
        type: { type: String, default: 'screen' },
        ip: { type: String, default: '' },
        port: { type: Number, default: 0 },
        currentAd: { type: Number, default: 0 }
    },
    fpe: { type: Object },
    network: { type: Number, default: 0 },
    ads: [],
    paymentHistory: [],
    logs: [
        { 
            msg: {type: String, default:'Logs are collected when you run the program'}, date: { type: String, default: date() }
        }
    ],
    packets: [],
    code: { type: String, default: '' }
});

export const bids = new mongoose.Schema({
    date: { type: String, default: new Date().toISOString() },
    status: { type: String, default: 'active' },
    for: { type: String, default: '', required: true },
    bidders: {
        type: Object
        /*
            name: {
                amount: ,
            }
        */
    }
});

export const fpd = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  gateway: String,
  paymentHistory: Array,
});