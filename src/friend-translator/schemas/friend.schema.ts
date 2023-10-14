import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FriendDocument = Friend & Document;

@Schema({ _id: false })
export class FriendSentence {
  @Prop({ type: String })
  raw: string;

  @Prop({ type: String })
  speaker?: string;

  @Prop({ type: String })
  sentence?: string;

  @Prop({ type: String })
  th: string;

  @Prop({ type: Number })
  index: number;
}
const friendSentenceSchema = SchemaFactory.createForClass(FriendSentence);

@Schema({ _id: false })
export class Friend {
  @Prop({ type: String })
  _id: string;

  @Prop({ type: Number })
  season: number;

  @Prop({ type: Number })
  episode: number;

  @Prop({ type: String })
  title: string;

  @Prop({ type: [friendSentenceSchema] })
  sentences: FriendSentence[];
}

export const FriendSchema = SchemaFactory.createForClass(Friend)
  .pre<FriendDocument>('save', function (next) {
    console.log('before save', this._id);
    const n = Date.now();
    next();
    console.log('after save', this._id, Date.now() - n);
  })
  .index({ episode: 1, season: 1 }, { unique: true });
