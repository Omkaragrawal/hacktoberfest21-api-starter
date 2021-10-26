const getAllContestants = "Select id, name, costumeTitle, costumeImgUrl, city, country, votes from contestants;"
const getSelectContestant = "Select id, name, costumeTitle, costumeImgUrl, city, country, votes from contestants where id = ?;"
const createDatabase = `
create table contestants
(
	db_id integer default nextval('contestants_id_seq'::regclass) not null
		constraint contestants_pk
			primary key,
    id varchar(20) not null,
	name varchar(255) not null,
	"costumeTitle" varchar(255) not null,
	"costumeImgUrl" varchar(255) not null,
	city varchar(255) default 'Mumbai'::character varying not null,
	country varchar(255) default 'India'::character varying not null,
	votes integer default 0 not null
);

create unique index contestants_id_uindex
	on contestants (db_id);

create unique index contestants_name_uindex
	on contestants (name);

create unique index contestants_id_uindex_2
	on contestants (id);

`;

module.exports = {
    getAllContestants,
    getSelectContestant,
    createDatabase
};