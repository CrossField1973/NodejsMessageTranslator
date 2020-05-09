USE ttranslate;
CREATE TABLE `users` (
`telegram_id` BIGINT NOT NULL,
`input` VARCHAR(3) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
`output` VARCHAR(3) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
`created_at` INT NOT NULL,
`updated_at` INT NOT NULL,
KEY `by_telegram_id` (`telegram_id`) USING BTREE,
PRIMARY KEY (`telegram_id`)
) ENGINE=MyISAM;
