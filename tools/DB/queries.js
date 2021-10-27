const createTable = `
create table contestants
(
	db_id integer default nextval('contestants_id_seq'::regclass) not null
		constraint contestants_pk
			primary key,
	id varchar(20) not null,
	name varchar(255) not null,
	costume_title varchar(255) not null,
	costume_img_url varchar(255) not null,
	city varchar(255) default 'Mumbai'::character varying not null,
	country varchar(255) default 'India'::character varying not null,
	votes integer default 0 not null,
	enabled boolean default true not null
);

create unique index contestants_id_uindex
	on contestants (db_id);

create unique index contestants_name_uindex
	on contestants (name);

create unique index contestants_id_uindex_2
	on contestants (id);
`;

const getAllContestants = `Select id, name, costume_title as "costumeTitle", costume_img_url as "costumeImgUrl", city, country, votes from contestants where enabled = true;`;
const getSelectContestant = `Select id, name, costume_title as "costumeTitle", costume_img_url as "costumeImgUrl", city, country, votes from contestants where id = $1 and enabled = true;`;

const enterNewParticipant = `Insert into contestants (id, name, costume_title, costume_img_url, city, country, votes) values ($1, $2, $3, $4, $5, $6, $7) returning id, name, costume_title as "costumeTitle", costume_img_url as "costumeImgUrl", city, country, votes;`;

const deleteContestant = `Update contestants set enabled = false where id = $1 and enabled = true;`;

const upVoteContestant = `Update contestants set votes = votes + 1 where id = $1 and enabled = true returning votes;`;

const UpdateContestant = {
	"queryStart": "Update contestants set ",
	"queryEnd": " where id = $1 and enabled = true;",
	"name": "name = ", 
	"costumeTitle": "costume_title = ", 
	"costumeImgUrl": "costume_img_url = ", 
	"city": "city = ", 
	"country": "country = "
};

module.exports = {
    createTable,
    getAllContestants,
    getSelectContestant,
    enterNewParticipant,
	deleteContestant,
	upVoteContestant,
	UpdateContestant
};