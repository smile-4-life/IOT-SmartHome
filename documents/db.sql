-- Đảm bảo tạo bảng user trước
-- Bảng 1: user
CREATE TABLE "user" (
    user_id VARCHAR(255) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL
);

---

-- Bảng 2: room (Quan hệ 1:N với user)
CREATE TABLE room (
    room_id VARCHAR(255) PRIMARY KEY,
    room_name VARCHAR(255) NOT NULL,
    user_id VARCHAR(255), -- Khóa ngoại trỏ về user (1 User manages N Rooms)
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

---

-- Bảng 3: device (Quan hệ CONTAINS)
CREATE TABLE device (
    device_id VARCHAR(255) PRIMARY KEY,
    device_name VARCHAR(255) NOT NULL,
    device_type VARCHAR(255),
    current_state VARCHAR(255),
    room_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES room(room_id)
);

---

-- Bảng 4: sensor (Quan hệ HAS_SENSOR)
CREATE TABLE sensor (
    sensor_id VARCHAR(255) PRIMARY KEY,
    room_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES room(room_id)
);

---

-- Bảng 5: sensor_data_log (Quan hệ RECORDS)
CREATE TABLE sensor_data_log (
    log_id VARCHAR(255) PRIMARY KEY,
    "timestamp" TIMESTAMPTZ NOT NULL,
    sensor_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (sensor_id) REFERENCES sensor(sensor_id)
);

---

-- Bảng 6: sensor_value (Quan hệ HAS, Khóa chính kết hợp)
CREATE TABLE sensor_value (
    log_id VARCHAR(255) NOT NULL,
    value_index INT NOT NULL,
    unit VARCHAR(50),
    value FLOAT,
    PRIMARY KEY (log_id, value_index),
    FOREIGN KEY (log_id) REFERENCES sensor_data_log(log_id)
);

---

-- Bảng 7: command (Quan hệ EXECUTES)
CREATE TABLE command (
    command_id VARCHAR(255) PRIMARY KEY,
    command_name VARCHAR(255) NOT NULL,
    mqtt_topic VARCHAR(255),
    mqtt_type VARCHAR(255),
    payload_value VARCHAR(255),
    device_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (device_id) REFERENCES device(device_id)
);

---

-- Bảng 8: command_action_log (Quan hệ MAPS_TO và liên kết với user)
CREATE TABLE command_action_log (
    action_log_id VARCHAR(255) PRIMARY KEY,
    "timestamp" TIMESTAMPTZ NOT NULL,
    status VARCHAR(50),
    command_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255),
    FOREIGN KEY (command_id) REFERENCES command(command_id),
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);