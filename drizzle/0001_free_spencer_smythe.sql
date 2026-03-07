CREATE TABLE `analystProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`department` varchar(255),
	`title` varchar(255),
	`expertise` json,
	`lastLoginAt` timestamp,
	`totalIncidentsHandled` int DEFAULT 0,
	`averageResolutionTime` int,
	`certifications` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `analystProfiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `analystProfiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `auditLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`action` varchar(255) NOT NULL,
	`resource` varchar(255),
	`resourceType` varchar(64),
	`page` varchar(255),
	`details` json,
	`ipAddress` varchar(45),
	`userAgent` text,
	`status` enum('success','failure') DEFAULT 'success',
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `auditLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `incidentAssignments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`incidentId` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`assignedAt` timestamp NOT NULL DEFAULT (now()),
	`resolvedAt` timestamp,
	`status` enum('assigned','in_progress','resolved','escalated') DEFAULT 'assigned',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `incidentAssignments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userSessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sessionToken` varchar(255) NOT NULL,
	`ipAddress` varchar(45),
	`userAgent` text,
	`isActive` boolean DEFAULT true,
	`lastActivity` timestamp DEFAULT (now()),
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userSessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `userSessions_sessionToken_unique` UNIQUE(`sessionToken`)
);
