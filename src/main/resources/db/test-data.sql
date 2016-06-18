INSERT INTO soundbox.user (`id`, `email`, `name`, `password`, `created_date`, `last_modified_date`) VALUES (1, 'root', 'Manu', 'e2fc714c4727ee9395f324cd2e7f331f', '2016-06-05 12:47:00', '2016-06-05 12:47:00')
INSERT INTO soundbox.favorites ( `user_email`, `artist_id`, `user_id`) VALUES ('root', '22409434', 1 )
INSERT INTO soundbox.favorites ( `user_email`, `artist_id`, `user_id`) VALUES ('root', '36960179', 1 )
INSERT INTO soundbox.favorites ( `user_email`, `artist_id`, `user_id`) VALUES ('root', '44513723', 1 )
INSERT INTO soundbox.favorites ( `user_email`, `artist_id`, `user_id`) VALUES ('root', '8145658', 1 )


INSERT INTO soundbox.playlist ( `id`, `name`, `is_private`, `user_id`) VALUES ('1', 'Workout', 0, 1 )
INSERT INTO soundbox.playlist ( `id`, `name`, `is_private`, `user_id`) VALUES ('2', 'Jazz', 0, 1 )

INSERT INTO soundbox.playlistsong ( `id`, `track_id`, `playlist_id`) VALUES (1, 171440547, 1 )
INSERT INTO soundbox.playlistsong ( `id`, `track_id`, `playlist_id`) VALUES (2, 239663611, 1 )
INSERT INTO soundbox.playlistsong ( `id`, `track_id`, `playlist_id`) VALUES (5, 239663611, 2 )
INSERT INTO soundbox.playlistsong ( `id`, `track_id`, `playlist_id`) VALUES (6, 257498312, 2 )