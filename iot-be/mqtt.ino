#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// Khai báo thông tin mạng WiFi
const char* ssid = "OPPO A15s";
const char* password = "magician";

// Thông tin MQTT broker
const char* mqtt_server = "192.168.43.22";

// Khai báo các chân kết nối
#define DHTPIN 14      // Chân data của DHT11
#define DHTTYPE DHT11  // Kiểu cảm biến DHT11
#define LED1 5
#define LED2 4
#define LED3 0

// Chân A0 cho cảm biến ánh sáng
#define lightSensorPin A0 

// Khởi tạo DHT và MQTT
DHT dht(DHTPIN, DHTTYPE);
WiFiClient espClient;
PubSubClient client(espClient);

// Topic MQTT
const char* dataTopic = "data";
const char* dataLed = "led";

// Hàm kết nối WiFi
void setup_wifi() {
  delay(10);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");
}

// Hàm callback để xử lý các thông điệp MQTT
void callback(char* topic, byte* payload, unsigned int length) {
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  // Kiểm tra topic và điều khiển LED
  if (String(topic) == dataLed) {
    if (message == "LED1_ON") {
      digitalWrite(LED1, HIGH);
    } else if (message == "LED1_OFF") {
      digitalWrite(LED1, LOW);
    } else if (message == "LED2_ON") {
      digitalWrite(LED2, HIGH);
    } else if (message == "LED2_OFF") {
      digitalWrite(LED2, LOW);
    } else if (message == "LED3_ON") {
      digitalWrite(LED3, HIGH);
    } else if (message == "LED3_OFF") {
      digitalWrite(LED3, LOW);
    }
  }
}

// Hàm kết nối và đăng ký các topic MQTT
void reconnect() {
  while (!client.connected()) {
    if (client.connect("ESP8266Client", "xuantri", "B21DCCN721")) {
      Serial.println("MQTT connected");
      client.subscribe(dataTopic);
      client.subscribe(dataLed);
    } else {
      Serial.print("Failed to connect to MQTT, rc=");
      Serial.println(client.state());
      delay(2000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 2003);
  client.setCallback(callback);

  dht.begin();
  
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Đo nhiệt độ và độ ẩm
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  
  // Đọc giá trị cảm biến ánh sáng từ chân A0
  int lightValue = analogRead(lightSensorPin);

  // Kiểm tra trạng thái LED
  String led1Status = digitalRead(LED1) == HIGH ? "ON" : "OFF";
  String led2Status = digitalRead(LED2) == HIGH ? "ON" : "OFF";
  String led3Status = digitalRead(LED3) == HIGH ? "ON" : "OFF";

  // In dữ liệu ra Serial Monitor
  // Serial.print("Temperature: ");
  // Serial.print(t);
  // Serial.print(" C, Humidity: ");
  // Serial.print(h);
  // Serial.print(" %, Light: ");
  // Serial.print(lightValue);
  // Serial.print(", LED1: ");
  // Serial.print(led1Status);
  // Serial.print(", LED2: ");
  // Serial.print(led2Status);
  // Serial.print(", LED3: ");
  // Serial.println(led3Status);

  // Gửi tất cả dữ liệu qua MQTT
  char dataBuffer[100];
  sprintf(dataBuffer, "Nhiet do: %.2f, Do am: %.2f, Anh sang: %d, LED1: %s, LED2: %s, LED3: %s", 
          t, h, lightValue, led1Status.c_str(), led2Status.c_str(), led3Status.c_str());
  client.publish(dataTopic, dataBuffer);

  // Dừng 2 giây trước khi gửi dữ liệu lần tiếp theo
  delay(2000);
}