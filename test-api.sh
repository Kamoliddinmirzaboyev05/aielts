#!/bin/bash

# IELTS Backend API Test Script

BASE_URL="http://localhost:3001"

echo "🧪 Testing IELTS Backend API..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo "1️⃣  Testing Health Check..."
response=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/health)
if [ $response -eq 200 ]; then
    echo -e "${GREEN}✓ Health check passed${NC}"
else
    echo -e "${RED}✗ Health check failed (Status: $response)${NC}"
fi
echo ""

# Test 2: Register
echo "2️⃣  Testing User Registration..."
register_response=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test'$(date +%s)'@test.com",
    "password": "test123456",
    "fullName": "Test User"
  }')

if echo "$register_response" | grep -q "token"; then
    echo -e "${GREEN}✓ Registration successful${NC}"
    TOKEN=$(echo $register_response | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    echo "Token: ${TOKEN:0:20}..."
else
    echo -e "${RED}✗ Registration failed${NC}"
    echo "Response: $register_response"
fi
echo ""

# Test 3: Login
echo "3️⃣  Testing User Login..."
login_response=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "test123"
  }')

if echo "$login_response" | grep -q "token"; then
    echo -e "${GREEN}✓ Login successful${NC}"
    TOKEN=$(echo $login_response | grep -o '"token":"[^"]*' | cut -d'"' -f4)
elif echo "$login_response" | grep -q "Invalid credentials"; then
    echo -e "${GREEN}✓ Login validation working (user not found)${NC}"
else
    echo -e "${RED}✗ Login failed${NC}"
    echo "Response: $login_response"
fi
echo ""

# Test 4: Get Profile (with token)
if [ ! -z "$TOKEN" ]; then
    echo "4️⃣  Testing Get Profile (Protected Route)..."
    profile_response=$(curl -s -X GET $BASE_URL/users/profile \
      -H "Authorization: Bearer $TOKEN")
    
    if echo "$profile_response" | grep -q "email"; then
        echo -e "${GREEN}✓ Profile fetch successful${NC}"
    else
        echo -e "${RED}✗ Profile fetch failed${NC}"
        echo "Response: $profile_response"
    fi
    echo ""
fi

# Test 5: Get Tests
echo "5️⃣  Testing Get Tests..."
tests_response=$(curl -s -X GET $BASE_URL/tests)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Tests endpoint accessible${NC}"
else
    echo -e "${RED}✗ Tests endpoint failed${NC}"
fi
echo ""

echo "✅ API Testing Complete!"
echo ""
echo "📝 Note: Make sure the server is running on $BASE_URL"
