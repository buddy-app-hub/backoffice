
export enum ConnectionFields {
  Id = 'id',
  ElderId = 'elderID',
  BuddyId = 'buddyID',
  CreationDate = 'creationDate',
  Meetings = 'meetings',
}

export interface Connection {
  [ConnectionFields.Id]: string,
  [ConnectionFields.ElderId]: string,
  [ConnectionFields.BuddyId]: string,
  [ConnectionFields.CreationDate]: Date,
  [ConnectionFields.Meetings]: Meeting[],
}

export enum MeetingFields {
  Id = 'meetingID',
  Schedule = 'schedule',
  Location = 'location',
  IsCancelled = 'isCancelled',
  IsConfirmedByBuddy = 'isConfirmedByBuddy',
  IsConfirmedByElder = 'isConfirmedByElder',
  IsRescheduled = 'isRescheduled',
  Activity = 'activity',
  DateLastModification = 'dateLastModification',
  ElderReviewForBuddy = 'elderReviewForBuddy',
  BuddyReviewForElder = 'buddyReviewForElder',
}

export interface Meeting {
  [MeetingFields.Id]: string,
  [MeetingFields.Schedule]: MeetingSchedule,
  [MeetingFields.Location]: MeetingLocation,
  [MeetingFields.IsCancelled]: boolean,
  [MeetingFields.IsConfirmedByBuddy]: boolean,
  [MeetingFields.IsConfirmedByElder]: boolean,
  [MeetingFields.IsRescheduled]: boolean,
  [MeetingFields.Activity]: string,
  [MeetingFields.DateLastModification]: string,
  [MeetingFields.ElderReviewForBuddy]: Review,
  [MeetingFields.BuddyReviewForElder]: Review,
}

export enum MeetingScheduleFields {
  Date = 'date',
  StartHour = 'startHour',
  EndHour = 'endHour'
}

export interface MeetingSchedule {
  [MeetingScheduleFields.Date]: string,
  [MeetingScheduleFields.StartHour]: number,
  [MeetingScheduleFields.EndHour]: number,
}

export enum MeetingLocationFields {
  IsEldersHome = 'isEldersHome',
  PlaceName = 'placeName',
  StreetName = 'streetName',
  StreetNumber = 'streetNumber',
  City = 'city',
  State = 'state',
  Country = 'country',
}

export interface MeetingLocation {
  [MeetingLocationFields.IsEldersHome]: boolean,
  [MeetingLocationFields.PlaceName]: string,
  [MeetingLocationFields.StreetName]: string,
  [MeetingLocationFields.StreetNumber]: number,
  [MeetingLocationFields.City]: string,
  [MeetingLocationFields.State]: string,
  [MeetingLocationFields.Country]: string,
}

export enum ReviewFields {
  Rating = 'rating',
  Comment = 'comment',
}

export interface Review {
  [ReviewFields.Rating]: number,
  [ReviewFields.Comment]: string,
}
