# Setup environment for NDJSON geo data
# This script helps set up the environment variable needed for the geo data system

Write-Host "Setting up environment for NDJSON geo data..." -ForegroundColor Green

# Define the environment variable
$envVarName = "GEODATA_NDJSON_PATH"
$envVarValue = "C:\Users\Dell Latitude 5410\Blockchain_voting\backend_Vercel\geodata_full.ndjson"

# Check if the NDJSON file exists
if (Test-Path $envVarValue) {
    Write-Host "✅ NDJSON file found at: $envVarValue" -ForegroundColor Green
} else {
    Write-Host "❌ NDJSON file NOT found at: $envVarValue" -ForegroundColor Red
    Write-Host "Please check the file path and update this script if needed." -ForegroundColor Yellow
    exit 1
}

# Set environment variable for current session
$env:GEODATA_NDJSON_PATH = $envVarValue
Write-Host "✅ Environment variable set for current session: $envVarName = $envVarValue" -ForegroundColor Green

# Create .env.local file
$envLocalPath = Join-Path $PSScriptRoot ".env.local"
$envLocalContent = "$envVarName=$envVarValue"

try {
    Set-Content -Path $envLocalPath -Value $envLocalContent -Force
    Write-Host "✅ Created .env.local file at: $envLocalPath" -ForegroundColor Green
    Write-Host "Content: $envLocalContent" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Failed to create .env.local file: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "You may need to create it manually with the content: $envLocalContent" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Restart your development server" -ForegroundColor White
Write-Host "2. Visit /test-ndjson to test the geo data system" -ForegroundColor White
Write-Host "3. The registration page should now load geo data from the NDJSON file" -ForegroundColor White

Write-Host ""
Write-Host "To make this permanent, you can:" -ForegroundColor Yellow
Write-Host "1. Add the environment variable to your system environment variables" -ForegroundColor White
Write-Host "2. Or always run this script before starting the development server" -ForegroundColor White
