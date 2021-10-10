## Database MySQL

 ```
CREATE DATABASE task_interview;

CREATE TABLE `users` (
`id` int(11) NOT NULL,
`first_name` varchar(100) NOT NULL,
`last_name` varchar(100) NOT NULL,
`email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `users`
ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `users_email_uindex` (`email`);
ALTER TABLE `users` ADD FULLTEXT KEY `first_name_last_name_full_text` (`first_name`,`last_name`);

ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=896;
COMMIT;
```

## MySQL CONFIG

 ```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=user
DB_PASSWORD=password
DB_DATABASE_NAME=task_interview
```