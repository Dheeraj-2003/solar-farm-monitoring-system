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
## System Deployment Guide

### Prerequisites
Before deploying the system, ensure the following are installed:
1. **Node.js** (version 14+)
2. **MongoDB** (version 4.4+)
3. **Kafka** (version 3.2+)
4. **Git** (for cloning the repository)

---

### Deployment Steps

#### 1. Clone the Repository
Run the following commands:
```bash
git clone https://github.com/yourusername/solar-farm-monitoring.git
cd solar-farm-monitoring
```
####2. **Install Dependencies:**
   ```bash
npm install
```
####3. **Configure Environment Variables: Create a .env file**
####4. **Kafka**
```bash
./bin/zookeeper-server-start.sh ./config/zookeeper.properties
./bin/kafka-server-start.sh ./config/server.properties
```
####5. **Mongo**
```bash
mongod --dbpath /path/to/your/db
```
###6. Start Application

