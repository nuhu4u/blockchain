Write-Host "Starting Next.js development server..." -ForegroundColor Green

# Check if Next.js is installed
if (Test-Path "node_modules\next") {
    Write-Host "Next.js found in node_modules" -ForegroundColor Yellow
    
    # Try to find the next executable
    $nextBin = Get-ChildItem "node_modules\next\dist" -Recurse -Name "next*" | Where-Object { $_ -like "*bin*" -or $_ -like "*next*" } | Select-Object -First 1
    
    if ($nextBin) {
        Write-Host "Found Next.js executable: $nextBin" -ForegroundColor Green
        node "node_modules\next\dist\$nextBin" dev
    } else {
        Write-Host "Next.js executable not found. Trying alternative approach..." -ForegroundColor Yellow
        
        # Try to run Next.js directly from the main module
        $env:NODE_ENV = "development"
        node -e "
            const next = require('./node_modules/next');
            const dev = next({ dev: true });
            dev.prepare().then(() => {
                const server = require('http').createServer((req, res) => {
                    dev.getRequestHandler()(req, res);
                });
                server.listen(3000, () => {
                    console.log('Next.js server running on http://localhost:3000');
                });
            });
        "
    }
} else {
    Write-Host "Next.js not found in node_modules. Please install it first." -ForegroundColor Red
    Write-Host "Try: npm install next@15.2.4" -ForegroundColor Yellow
}

Write-Host "Press any key to continue..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
