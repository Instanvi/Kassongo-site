@echo off
echo ================================================
echo Starting Kasongo OCR Service
echo ================================================
echo.

cd "%~dp0python-ocr-service"

echo Checking for virtual environment...
if not exist "venv\Scripts\activate.bat" (
    echo [ERROR] Virtual environment not found!
    echo.
    echo Please run SETUP-OCR-SERVICE.bat first
    pause
    exit /b 1
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo Starting Python OCR API on port 8000...
echo Press Ctrl+C to stop the service
echo.
echo ================================================
echo.

python app.py

pause
