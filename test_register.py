import requests

url = "http://localhost:8000/api/register"
payload = {
    "username": "testuser_debug_3",
    "email": "testuser_debug3@example.com",
    "password": "password123"
}

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Raw Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
