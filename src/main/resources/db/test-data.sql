INSERT INTO soundbox.user (`id`, `name`, `email`,`created_date`, `last_modified_date`, `fb_id`) VALUES ('1', 'Demo', '', '2016-06-05 12:47:00', '2016-06-05 12:47:00', '1209');

INSERT INTO soundbox.favorites (`artist_id`, `user_id`) VALUES ('22409434', 1 );
INSERT INTO soundbox.favorites (`artist_id`, `user_id`) VALUES ('36960179', 1 );
INSERT INTO soundbox.favorites (`artist_id`, `user_id`) VALUES ('44513723', 1 );
INSERT INTO soundbox.favorites (`artist_id`, `user_id`) VALUES ('8145658', 1 );
INSERT INTO soundbox.favorites (`artist_id`, `user_id`) VALUES ('117052852', 1 );
INSERT INTO soundbox.favorites (`artist_id`, `user_id`) VALUES ('41792998', 1 );


INSERT INTO soundbox.playlist ( `id`, `name`, `is_private`, `user_id`) VALUES ('1', 'Summer 2K16', 0, 1 );
INSERT INTO soundbox.playlist ( `id`, `name`, `is_private`, `user_id`) VALUES ('2', 'Canyon Lake 2K16', 0, 1 );
INSERT INTO soundbox.playlist ( `id`, `name`, `is_private`, `user_id`) VALUES ('3', 'Workout', 0, 1 );
INSERT INTO soundbox.playlist ( `id`, `name`, `is_private`, `user_id`) VALUES ('4', 'MUUSiC', 0, 1 );

INSERT INTO soundbox.playlistsong ( `id`, `track_id`, `playlist_id`) VALUES (1, 171440547, 1 );
INSERT INTO soundbox.playlistsong ( `id`, `track_id`, `playlist_id`) VALUES (2, 239663611, 1 );
INSERT INTO soundbox.playlistsong ( `id`, `track_id`, `playlist_id`) VALUES (5, 239663611, 2 );
INSERT INTO soundbox.playlistsong ( `id`, `track_id`, `playlist_id`) VALUES (6, 257498312, 2 );

INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('1', 'All', 'all-music');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('2', 'Alternative Rock', 'alternativerock');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('3', 'Ambient', 'ambient');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('4', 'Classical', 'classical');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('5', 'Country', 'country');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('6', 'Dance & EDM', 'danceedm');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('7', 'Dancehall', 'dancehall');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('8', 'Deep House', 'deephouse');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('9', 'Disco', 'disco');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('10', 'Drum & Bass', 'drumbass');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('11', 'Dubstep', 'dubstep');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('12', 'Electronic', 'electronic');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('13', 'Folk & Singer-Songwriter', 'folksingersongwriter');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('14', 'Hip-hop & Rap', 'hiphoprap');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('15', 'House', 'house');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('16', 'Indie', 'indie');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('17', 'Jazz & Blues', 'jazzblues');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('18', 'Latin', 'latin');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('19', 'Metal', 'metal');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('20', 'Piano', 'piano');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('21', 'Pop', 'pop');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('22', 'R&B & Soul', 'rbsoul');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('23', 'Reggae', 'reggae');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('24', 'Reggaeton', 'reggaeton');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('25', 'Rock', 'rock');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('26', 'Soundtrack', 'soundtrack');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('27', 'Techno', 'techno');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('28', 'Trance', 'trance');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('29', 'Trap', 'trap');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('30', 'Triphop', 'triphop');
INSERT INTO soundbox.genres (`id`, `name`, `value`) VALUES ('31', 'World', 'world');