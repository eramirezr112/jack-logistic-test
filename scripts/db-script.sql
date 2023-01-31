CREATE TABLE `packages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `packageContent` varchar(100) NOT NULL,
  `packageType` varchar(100) NOT NULL,
  `weight` double NOT NULL,
  `packagePrice` double NOT NULL,
  `shippingFrom` varchar(100) NOT NULL,
  `shippingTo` varchar(100) NOT NULL,
  `createdTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `pickUpTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deliveryTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `originLat` double NOT NULL,
  `originLng` double DEFAULT NULL,
  `destinationLat` double DEFAULT NULL,
  `destinationLng` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `packages_id_IDX` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO packages (packageContent,packageType,weight,packagePrice,shippingFrom,shippingTo,createdTime,pickUpTime,deliveryTime,originLat,originLng,destinationLat,destinationLng) VALUES
	 ('Blusas','Regular Package',5.0,300.0,'Plaza Viquez','UCR','2023-01-27 14:41:18','2023-01-27 14:41:18','2023-01-27 14:41:18',9.925440469218355,-84.07418267754674,9.934731635169477,-84.05142350730411),
	 ('Pantalon, Control remoto, Tennis','Regular Package',5.0,300.0,'Plaza Viquez','UCR','2023-01-27 14:41:18','2023-01-27 14:41:18','2023-01-27 14:41:18',9.925440469218355,-84.07418267754674,9.934731635169477,-84.05142350730411),
	 ('Bolsas Plasticas, Nintendo Switch','Regular Package',5.0,300.0,'Plaza Viquez','UCR','2023-01-27 14:41:18','2023-01-27 14:41:18','2023-01-27 14:41:18',9.925440469218355,-84.07418267754674,9.934731635169477,-84.05142350730411),
	 ('XBox','Regular Package',5.0,300.0,'Plaza Viquez','UCR','2023-01-27 14:41:18','2023-01-27 14:41:18','2023-01-27 14:41:18',9.925440469218355,-84.07418267754674,9.934731635169477,-84.05142350730411),
	 ('Some Content','Regular Package',30.0,300.0,'Plaza Del Sol, Freses, San José, Curridabat, Costa Rica','Oxígeno Human Playground, 111, Heredia, Costa Rica','2023-01-31 08:05:04','2023-01-31 00:00:00','2023-01-31 00:00:00',9.9285234,-84.04215230000001,9.994422499999999,-84.1312353),
	 ('Nintendo Switch','Special Package',50.0,600.0,'Mall San Pedro, Alameda, San José, San Pedro, Costa Rica','Heredia paseo de las flores, Heredia, Costa Rica','2023-01-31 08:29:10','2023-01-31 00:00:00','2023-01-31 00:00:00',9.9342461,-84.05655209999999,9.9981413,-84.1197643);