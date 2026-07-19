"""
Quick API Test Script
Tests the OCR service endpoints
"""

import requests
import sys

API_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    print("Testing /api/health endpoint...")
    try:
        response = requests.get(f"{API_URL}/api/health", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print("✅ Health check passed!")
            print(f"   Service: {data.get('service')}")
            print(f"   Version: {data.get('version')}")
            print(f"   Tesseract: {data.get('tesseract_available')}")
            return True
        else:
            print(f"❌ Health check failed with status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Is it running?")
        print("   Start with: python app.py")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_root():
    """Test root endpoint"""
    print("\nTesting / endpoint...")
    try:
        response = requests.get(f"{API_URL}/", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print("✅ Root endpoint works!")
            print(f"   Service: {data.get('service')}")
            print(f"   Endpoints: {list(data.get('endpoints', {}).keys())}")
            return True
        else:
            print(f"❌ Root endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_cors():
    """Test CORS headers"""
    print("\nTesting CORS headers...")
    try:
        headers = {
            'Origin': 'http://localhost:3000'
        }
        response = requests.options(f"{API_URL}/api/ocr/scan", headers=headers, timeout=5)
        if 'Access-Control-Allow-Origin' in response.headers:
            print("✅ CORS headers present")
            print(f"   Allow-Origin: {response.headers.get('Access-Control-Allow-Origin')}")
            return True
        else:
            print("❌ CORS headers missing")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("OCR API Test Suite")
    print("=" * 50)
    
    health_ok = test_health()
    root_ok = test_root()
    cors_ok = test_cors()
    
    print("\n" + "=" * 50)
    print("Test Summary")
    print("=" * 50)
    print(f"Health Check: {'✅ PASS' if health_ok else '❌ FAIL'}")
    print(f"Root Endpoint: {'✅ PASS' if root_ok else '❌ FAIL'}")
    print(f"CORS Headers: {'✅ PASS' if cors_ok else '❌ FAIL'}")
    
    if health_ok and root_ok and cors_ok:
        print("\n🎉 All tests passed! API is ready.")
        sys.exit(0)
    else:
        print("\n❌ Some tests failed. Check the output above.")
        sys.exit(1)
