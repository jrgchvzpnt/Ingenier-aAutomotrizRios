#!/usr/bin/env python3
"""
Backend API Testing for Ingeniería Automotriz Ríos
Tests contact form endpoints with validation scenarios
"""

import requests
import json
import uuid
from datetime import datetime

# Use the production URL from frontend/.env
BASE_URL = "https://autorios.preview.emergentagent.com/api"

def test_post_contact_valid_data():
    """Test POST /api/contact with valid data"""
    print("\n=== Testing POST /api/contact with valid data ===")
    
    valid_data = {
        "name": "Carlos Rodriguez",
        "email": "carlos.rodriguez@email.com", 
        "phone": "1234567890",
        "message": "Necesito información sobre servicios de mantenimiento automotriz para mi flota de vehículos comerciales."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=valid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 201:
            data = response.json()
            if data.get("success") and "data" in data:
                print("✅ POST /api/contact with valid data: SUCCESS")
                return True, data.get("data", {}).get("id")
            else:
                print("❌ POST /api/contact: Invalid response structure")
                return False, None
        else:
            print(f"❌ POST /api/contact: Expected 201, got {response.status_code}")
            return False, None
            
    except Exception as e:
        print(f"❌ POST /api/contact: Exception occurred - {e}")
        return False, None

def test_post_contact_invalid_email():
    """Test POST /api/contact with invalid email"""
    print("\n=== Testing POST /api/contact with invalid email ===")
    
    invalid_data = {
        "name": "Maria Garcia",
        "email": "invalid-email",
        "phone": "9876543210", 
        "message": "Este es un mensaje de prueba con email inválido para verificar validaciones."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print("✅ POST /api/contact with invalid email: SUCCESS (correctly rejected)")
            return True
        else:
            print(f"❌ POST /api/contact: Expected 422, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ POST /api/contact: Exception occurred - {e}")
        return False

def test_post_contact_short_name():
    """Test POST /api/contact with name too short (< 2 chars)"""
    print("\n=== Testing POST /api/contact with short name ===")
    
    invalid_data = {
        "name": "A",
        "email": "test@email.com",
        "phone": "1234567890",
        "message": "Mensaje de prueba para validar nombre muy corto según especificaciones."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print("✅ POST /api/contact with short name: SUCCESS (correctly rejected)")
            return True
        else:
            print(f"❌ POST /api/contact: Expected 422, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ POST /api/contact: Exception occurred - {e}")
        return False

def test_post_contact_long_name():
    """Test POST /api/contact with name too long (> 100 chars)"""
    print("\n=== Testing POST /api/contact with long name ===")
    
    long_name = "A" * 101  # 101 characters
    invalid_data = {
        "name": long_name,
        "email": "test@email.com",
        "phone": "1234567890",
        "message": "Mensaje de prueba para validar nombre muy largo según especificaciones del sistema."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print("✅ POST /api/contact with long name: SUCCESS (correctly rejected)")
            return True
        else:
            print(f"❌ POST /api/contact: Expected 422, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ POST /api/contact: Exception occurred - {e}")
        return False

def test_post_contact_short_phone():
    """Test POST /api/contact with phone too short (< 10 chars)"""
    print("\n=== Testing POST /api/contact with short phone ===")
    
    invalid_data = {
        "name": "Ana Martinez",
        "email": "ana@email.com",
        "phone": "123456789",  # 9 digits
        "message": "Mensaje de prueba para validar teléfono muy corto según especificaciones."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            print("✅ POST /api/contact with short phone: SUCCESS (correctly rejected)")
            return True
        else:
            print(f"❌ POST /api/contact: Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ POST /api/contact: Exception occurred - {e}")
        return False

def test_post_contact_long_phone():
    """Test POST /api/contact with phone too long (> 20 chars)"""
    print("\n=== Testing POST /api/contact with long phone ===")
    
    invalid_data = {
        "name": "Luis Fernandez",
        "email": "luis@email.com",
        "phone": "123456789012345678901",  # 21 digits
        "message": "Mensaje de prueba para validar teléfono muy largo según especificaciones."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            print("✅ POST /api/contact with long phone: SUCCESS (correctly rejected)")
            return True
        else:
            print(f"❌ POST /api/contact: Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ POST /api/contact: Exception occurred - {e}")
        return False

def test_post_contact_invalid_phone():
    """Test POST /api/contact with non-numeric phone"""
    print("\n=== Testing POST /api/contact with non-numeric phone ===")
    
    invalid_data = {
        "name": "Pedro Gonzalez",
        "email": "pedro@email.com",
        "phone": "12345abcde",
        "message": "Mensaje de prueba para validar teléfono con caracteres no numéricos."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            print("✅ POST /api/contact with non-numeric phone: SUCCESS (correctly rejected)")
            return True
        else:
            print(f"❌ POST /api/contact: Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ POST /api/contact: Exception occurred - {e}")
        return False

def test_post_contact_short_message():
    """Test POST /api/contact with message too short (< 10 chars)"""
    print("\n=== Testing POST /api/contact with short message ===")
    
    invalid_data = {
        "name": "Sofia Lopez",
        "email": "sofia@email.com",
        "phone": "1234567890",
        "message": "Corto"  # 5 characters
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            print("✅ POST /api/contact with short message: SUCCESS (correctly rejected)")
            return True
        else:
            print(f"❌ POST /api/contact: Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ POST /api/contact: Exception occurred - {e}")
        return False

def test_post_contact_long_message():
    """Test POST /api/contact with message too long (> 1000 chars)"""
    print("\n=== Testing POST /api/contact with long message ===")
    
    long_message = "A" * 1001  # 1001 characters
    invalid_data = {
        "name": "Roberto Silva",
        "email": "roberto@email.com",
        "phone": "1234567890",
        "message": long_message
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            print("✅ POST /api/contact with long message: SUCCESS (correctly rejected)")
            return True
        else:
            print(f"❌ POST /api/contact: Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ POST /api/contact: Exception occurred - {e}")
        return False

def test_get_contact_messages():
    """Test GET /api/contact to retrieve saved messages"""
    print("\n=== Testing GET /api/contact ===")
    
    try:
        response = requests.get(f"{BASE_URL}/contact", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "data" in data:
                messages = data.get("data", [])
                print(f"✅ GET /api/contact: SUCCESS - Retrieved {len(messages)} messages")
                return True, messages
            else:
                print("❌ GET /api/contact: Invalid response structure")
                return False, []
        else:
            print(f"❌ GET /api/contact: Expected 200, got {response.status_code}")
            return False, []
            
    except Exception as e:
        print(f"❌ GET /api/contact: Exception occurred - {e}")
        return False, []

def test_get_contact_message_by_id(message_id):
    """Test GET /api/contact/{id} to retrieve specific message"""
    print(f"\n=== Testing GET /api/contact/{message_id} ===")
    
    try:
        response = requests.get(f"{BASE_URL}/contact/{message_id}", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "data" in data:
                print("✅ GET /api/contact/{id}: SUCCESS")
                return True
            else:
                print("❌ GET /api/contact/{id}: Invalid response structure")
                return False
        elif response.status_code == 404:
            print("⚠️ GET /api/contact/{id}: Message not found (404)")
            return True  # This is expected behavior for non-existent IDs
        else:
            print(f"❌ GET /api/contact/{id}: Expected 200 or 404, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ GET /api/contact/{id}: Exception occurred - {e}")
        return False

def run_all_tests():
    """Run all backend API tests"""
    print("🚀 Starting Backend API Tests for Ingeniería Automotriz Ríos")
    print(f"Base URL: {BASE_URL}")
    print("=" * 60)
    
    results = {}
    message_id = None
    
    # Test valid POST request first
    success, msg_id = test_post_contact_valid_data()
    results["POST /api/contact (valid)"] = success
    if msg_id:
        message_id = msg_id
    
    # Test validation errors
    results["POST /api/contact (invalid email)"] = test_post_contact_invalid_email()
    results["POST /api/contact (short name)"] = test_post_contact_short_name()
    results["POST /api/contact (long name)"] = test_post_contact_long_name()
    results["POST /api/contact (short phone)"] = test_post_contact_short_phone()
    results["POST /api/contact (long phone)"] = test_post_contact_long_phone()
    results["POST /api/contact (invalid phone)"] = test_post_contact_invalid_phone()
    results["POST /api/contact (short message)"] = test_post_contact_short_message()
    results["POST /api/contact (long message)"] = test_post_contact_long_message()
    
    # Test GET endpoints
    success, messages = test_get_contact_messages()
    results["GET /api/contact"] = success
    
    # Test GET by ID if we have a message ID
    if message_id:
        results["GET /api/contact/{id}"] = test_get_contact_message_by_id(message_id)
    else:
        # Test with a random ID to verify 404 handling
        results["GET /api/contact/{id}"] = test_get_contact_message_by_id(str(uuid.uuid4()))
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed!")
    else:
        print("⚠️ Some tests failed - check logs above for details")
    
    return results

if __name__ == "__main__":
    run_all_tests()