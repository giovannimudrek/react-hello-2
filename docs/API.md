# API Documentation

## Overview

This is a client-side only application. All data is managed in-memory via JavaScript state.
No external API endpoints are currently defined. Data persistence is not yet implemented.

## Data Models

### Card

| Field         | Type                  | Description                           |
|---------------|-----------------------|---------------------------------------|
| `id`          | `string`              | Unique identifier (e.g. `"c1"`)       |
| `colId`       | `string`              | Parent column identifier              |
| `title`       | `string`              | Card title (required)                 |
| `description` | `string`              | Card description text                 |
| `due`         | `string` (ISO date)   | Due date in `YYYY-MM-DD` format       |
| `labels`      | `Label[]`             | Array of label objects                |
| `assignees`   | `string[]`            | Array of member initials              |

### Label

| Field   | Type     | Values                                               |
|---------|----------|------------------------------------------------------|
| `text`  | `string` | Display text for the label                           |
| `style` | `string` | `"filled"`, `"outline"`, `"success"`, `"warning"`, `"error"` |

### Column

| Field       | Type           | Description                              |
|-------------|----------------|------------------------------------------|
| `id`        | `string`       | Unique identifier (e.g. `"col-1"`)       |
| `title`     | `string`       | Column display name                      |
| `badgeBg`   | `string` (hex) | Badge background color                   |
| `badgeText` | `string` (hex) | Badge text color                         |
| `filter`    | `string`       | `"pending"` or `"done"` — for tab filter |
| `limit`     | `number\|null` | Max cards allowed in the column          |
