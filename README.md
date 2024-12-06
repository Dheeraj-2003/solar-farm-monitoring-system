# Solar Farm Monitoring System - API Documentation

## Overview
This API provides access to solar panel sensor data stored in the system. The primary endpoint allows querying based on panel ID and optional time range filters.

---

## Monitor API

### Endpoint
**`GET /monitor`**

### Description
Retrieves sensor data for a specific solar panel, optionally filtered by a time range.

### Query Parameters
| Parameter    | Type     | Required | Description                             |
|--------------|----------|----------|-----------------------------------------|
| `panel_id`   | `string` | Yes      | Unique identifier for the solar panel.  |
| `start_time` | `string` | No       | Start time in ISO 8601 format.          |
| `end_time`   | `string` | No       | End time in ISO 8601 format.            |

### Response
- **200 OK**: Returns an array of sensor data.
- **400 Bad Request**: Missing or invalid parameters.
- **500 Internal Server Error**: Database or server failure.

---

## Error Codes
| Status Code | Description                             |
|-------------|-----------------------------------------|
| 200         | Successful retrieval of data.           |
| 400         | Bad request due to missing or invalid parameters. |
| 500         | Server error while processing the request. |

---
