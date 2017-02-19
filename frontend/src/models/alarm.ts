import { IAlarm } from './ialarm';

export class Alarm implements IAlarm {
  constructor(public id:number, public name:string, public arrival:string, public start_location:string, public end_location:string, public transportation:string, public prep_time:number, public description:string, public status:boolean, public user_id:number, public wake_up:string) { }
}
