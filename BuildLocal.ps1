Write-Host Build local

$environment = Read-Host 'Please define the environment configuration. Type "release" or just hit enter for debug.'
$tests = Read-Host 'Please define test setup. Type "test" for test execution or just hit enter.'

if ($environment -eq 'release' -or $environment -eq 'Release') {
    $configuration = 'Release'
    $environment = '--prod'
} else {
    $configuration = 'debug'
    $environment = ''
}

if ($tests -eq 'test') {
    $executeTests = $true
} else {
    $executeTests = $false
}

Write-Host Restore service nuget packages
nuget Restore Service/Service.sln

Write-Host Build service solution
msbuild /p:Configuration=$configuration Service/Service.sln

Write-Host Restore client npm packages
Set-Location Client
npm install

Write-Host Build client
ng build $environment --deploy-url /app/ --base-href /app/

if ($executeTests) {
    Set-Location ..
    nuget Install NUnit.ConsoleRunner -Version 3.9.0 -OutputDirectory Service/TestRunner
    Write-Host Run service tests
    Service/TestRunner/NUnit.ConsoleRunner.3.9.0/tools/nunit3-console.exe `
     Service/LivestreamApp.Api.Test/bin/Release/LivestreamApp.Api.Test.dll `
     Service/LivestreamApp.Apps.Test/bin/Release/LivestreamApp.Apps.Test.dll `
     Service/LivestreamApp.Server.Test/bin/Release/LivestreamApp.Server.Test.dll `
     Service/LivestreamApp.Shared.Test/bin/Release/LivestreamApp.Shared.Test.dll `
     --result=Service/TestRunner/NUnitResults.xml

    Set-Location Client
    Write-Host Run client tests
    ng test --watch=false --browsers=ChromeHeadlessCI
}

Write-Host Copy client files
Remove-Item ../Service/bin/$configuration/Client -Recurse -Force
Copy-Item -Path dist/* -Destination ../Service/bin/$configuration/Client -Recurse -Force

Write-Host Build local succeeded -ForegroundColor Green
pause