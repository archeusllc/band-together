#!/bin/bash

# Create a test JSON file
cat > /tmp/test.json << 'JSONEOF'
[
  { "title": "Test Song", "artist": "Test Artist", "type": "SONG", "duration": 240, "tuning": "Standard" }
]
JSONEOF

# Get a token (you'll need to provide a valid token)
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pblVzZXJJZCI6InRlc3QtdXNlciIsImVtYWlsIjoiYWRtaW5AZXHHSDX0ZXN0LmNvbSJ9.test"

# Try to upload the file
curl -X POST http://localhost:3001/import/json \
  -H "Content-Type: text/plain" \
  -H "Authorization: Bearer $TOKEN" \
  -d @/tmp/test.json

