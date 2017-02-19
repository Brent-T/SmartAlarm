export interface IAlarm {
  id:number;
  name:string;
  arrival:string;
  start_location:string;
  end_location:string;
  transportation:string;
  prep_time:number;
  description:string;
  status:boolean;
  user_id:number;
  wake_up:string;
}
