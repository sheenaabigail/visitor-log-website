create database visitor_tracking_app;
use visitor_tracking_app;

create table Visitors(
	VisitorId int Primary key auto_increment,
    VisitorName varchar(100),
    ContactNo varchar(10)
);

drop table visitors;

insert into visitors (VisitorName, ContactNo) values ("TestUser","1234567890");

select * from visitors;

create table Visitors_log(
	LogId int primary key auto_increment,
    VisitorId int,
    ApartmentNo int not null,
    VehicleType varchar(100),
    VehicleNo varchar(50),
    PurposeOfVisit Varchar(200),
    InTime time,
    OutTime time default null,
    VisitTimestamp timestamp default current_timestamp,
    DurationOfVisit Time generated always as (timediff(OutTime, InTime)),
    visitStatus boolean default false,
    foreign key(visitorId) references Visitors(VisitorId)
);

drop table Visitors_log;

insert into Visitors_log(VisitorId,ApartmentNo,VehicleType,VehicleNo,PurposeOfVisit,InTime) values (1, 5, "car","tn074667","birthday party",current_time());

select * from Visitors_log;

update Visitors_log set OutTime=current_time();
alter table Visitors_log modify ApartmentNo varchar(10);
