import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    
    @Prop()
    title: string;
  
    @Prop()
    description: string;
  
    @Prop()
    status: 'pendiente' | 'en progreso' | 'completada';
  
    @Prop()
    dueDate: string;
  
    @Prop()
    userId: string; 
}

export const TaskSchema = SchemaFactory.createForClass(Task);
