import Sequelize from 'sequelize';
import Mongoose from 'mongoose'
import casual from 'casual';
import _ from 'lodash';

const mongo = Mongoose.connect('mongodb://localhost/channels')

const ViewSchema = Mongoose.Schema({
  channelId: Number,
  views: Number
})

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

const ChannelModel = db.define('channel', {
  name: { type: Sequelize.STRING },
});

const MessageModel = db.define('message', {
  text: { type: Sequelize.STRING },
});

ChannelModel.hasMany(MessageModel);
MessageModel.belongsTo(ChannelModel);
const View = Mongoose.model('views', ViewSchema)

// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return ChannelModel.create({
      name: casual.first_name,
    }).then((channel) => {
      return channel.createMessage({
        text: casual.sentences(3),
      });
    }).then((channel) => {
      return View.update(
        { channelId: channel.id },
        { views: casual.integer(0, 100) },
        { upsert: true }
      )
    })
  });
});

const Channel = db.models.channel;
const Message = db.models.message;

export { Channel, Message, View };
