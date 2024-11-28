-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 28, 2024 lúc 01:07 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `email_marketing`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `campaigns`
--

CREATE TABLE `campaigns` (
  `campaign_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email_id` int(11) DEFAULT NULL,
  `send_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Draft','Pending','Complete') NOT NULL DEFAULT 'Draft'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `campaigns`
--

INSERT INTO `campaigns` (`campaign_id`, `name`, `email_id`, `send_at`, `created_at`, `status`) VALUES
(19, 'Chiến Dịch 1', 22, '0000-00-00 00:00:00', '2024-11-27 23:49:27', 'Complete'),
(20, 'Chiến Dịch 2', 22, '2024-11-27 23:58:39', '2024-11-27 23:58:31', 'Draft'),
(22, 'A', 22, '2024-11-28 00:05:09', '2024-11-28 00:00:57', 'Complete');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `campaign_groups`
--

CREATE TABLE `campaign_groups` (
  `campaign_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `campaign_groups`
--

INSERT INTO `campaign_groups` (`campaign_id`, `group_id`) VALUES
(19, 5),
(19, 6),
(20, 5),
(22, 5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_unsubscribed` tinyint(1) DEFAULT 0,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `contacts`
--

INSERT INTO `contacts` (`contact_id`, `email`, `is_unsubscribed`, `name`, `phone`, `created_at`) VALUES
(8, 'jva@jacoa', 0, 'Jonas', '1', '2024-11-27 23:30:38'),
(9, 'belly@belly', 0, 'Belly', '111', '2024-11-27 23:30:55'),
(10, 'holesheet@holy', 0, 'Holy', '114', '2024-11-27 23:31:36'),
(11, 'pricescott@jacobson.net', 0, 'Jade Anderson', '11', '2024-11-27 23:32:19'),
(12, 'gstevens@martinez.com', 0, 'Cathy Kelley', '4867', '2024-11-27 23:32:32'),
(13, 'don86@lucas.org', 0, 'Anthony Wheeler', '1', '2024-11-27 23:32:43');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `emails`
--

CREATE TABLE `emails` (
  `email_id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(255) DEFAULT 'Unnamed Template'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `emails`
--

INSERT INTO `emails` (`email_id`, `subject`, `content`, `created_at`, `name`) VALUES
(21, 'Mẫu 1', '<p style=\"text-align: center;\"><strong>Lorem Ipsum</strong> is <em><strong>simply dummy</strong></em> text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scra<strong>mbled </strong>it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, rem<span style=\"background-color: #f1c40f;\">aining ess</span>entially unchanged. It was popularised in the <strong>1960s </strong>with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n<div class=\"notranslate\" style=\"all: initial;\">&nbsp;</div>', '2024-11-27 23:34:44', 'Template'),
(22, 'Mẫu 3', '<p style=\"text-align: justify;\">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a m<strong>ore-or-less normal distrib</strong>ution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the ye<em>ars, sometimes </em>by accident, sometimes on purpose (injected humour and the like).</p>', '2024-11-27 23:35:12', 'Template 3');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `email_attachments`
--

CREATE TABLE `email_attachments` (
  `attachment_id` int(11) NOT NULL,
  `email_id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `email_interactions`
--

CREATE TABLE `email_interactions` (
  `interaction_id` int(11) NOT NULL,
  `campaign_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `viewed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `groups`
--

CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `groups`
--

INSERT INTO `groups` (`group_id`, `name`, `created_at`) VALUES
(5, 'VIP', '2024-11-27 23:32:51'),
(6, 'VIP+', '2024-11-27 23:33:09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `group_contacts`
--

CREATE TABLE `group_contacts` (
  `group_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `group_contacts`
--

INSERT INTO `group_contacts` (`group_id`, `contact_id`) VALUES
(5, 8),
(5, 9),
(5, 10),
(6, 11),
(6, 12),
(6, 13);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `user_type` enum('admin','regular') NOT NULL DEFAULT 'regular',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password_hash`, `user_type`, `created_at`) VALUES
(3, 'John Doe', 'a@a', '$2b$10$pvKIgyUB2YBUoibDf0b2GumBSiCeHhGApYhAreAWJs3ZXDy2w2K8.', 'admin', '2024-11-26 07:16:36'),
(4, 'John Doe2', 'b@b', '$2b$10$pvKIgyUB2YBUoibDf0b2GumBSiCeHhGApYhAreAWJs3ZXDy2w2K8.', 'regular', '2024-11-26 07:16:36'),
(5, 'Duc', 'd@d', '$2b$10$T6DFUzq1q/4mtxvcy1LOBO6cfwnWOv42r0c8Nz87SgI4nPOUysQdq', 'regular', '2024-11-26 17:59:45');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`campaign_id`),
  ADD KEY `campaigns_ibfk_1` (`email_id`);

--
-- Chỉ mục cho bảng `campaign_groups`
--
ALTER TABLE `campaign_groups`
  ADD PRIMARY KEY (`campaign_id`,`group_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Chỉ mục cho bảng `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contact_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `emails`
--
ALTER TABLE `emails`
  ADD PRIMARY KEY (`email_id`);

--
-- Chỉ mục cho bảng `email_attachments`
--
ALTER TABLE `email_attachments`
  ADD PRIMARY KEY (`attachment_id`),
  ADD KEY `email_id` (`email_id`);

--
-- Chỉ mục cho bảng `email_interactions`
--
ALTER TABLE `email_interactions`
  ADD PRIMARY KEY (`interaction_id`),
  ADD KEY `campaign_id` (`campaign_id`),
  ADD KEY `contact_id` (`contact_id`);

--
-- Chỉ mục cho bảng `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`);

--
-- Chỉ mục cho bảng `group_contacts`
--
ALTER TABLE `group_contacts`
  ADD PRIMARY KEY (`group_id`,`contact_id`),
  ADD KEY `contact_id` (`contact_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `campaign_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `emails`
--
ALTER TABLE `emails`
  MODIFY `email_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `email_attachments`
--
ALTER TABLE `email_attachments`
  MODIFY `attachment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `email_interactions`
--
ALTER TABLE `email_interactions`
  MODIFY `interaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `campaigns`
--
ALTER TABLE `campaigns`
  ADD CONSTRAINT `campaigns_ibfk_1` FOREIGN KEY (`email_id`) REFERENCES `emails` (`email_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `campaign_groups`
--
ALTER TABLE `campaign_groups`
  ADD CONSTRAINT `campaign_groups_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`campaign_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `campaign_groups_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `email_attachments`
--
ALTER TABLE `email_attachments`
  ADD CONSTRAINT `email_attachments_ibfk_1` FOREIGN KEY (`email_id`) REFERENCES `emails` (`email_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `email_interactions`
--
ALTER TABLE `email_interactions`
  ADD CONSTRAINT `email_interactions_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`campaign_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `email_interactions_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`contact_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `group_contacts`
--
ALTER TABLE `group_contacts`
  ADD CONSTRAINT `group_contacts_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_contacts_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`contact_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
