
Write-Host Restore service nuget packages
nuget Restore Service/Service.sln
nuget Install NUnit.ConsoleRunner -Version 3.9.0 -OutputDirectory Service/TestRunner

Write-Host Build service solution
msbuild /p:Configuration=Release Service/Service.sln

Write-Host Run service tests
Service/TestRunner/NUnit.ConsoleRunner.3.9.0/tools/nunit3-console.exe `
 Service/LivestreamApp.Api.Test/bin/Release/LivestreamApp.Api.Test.dll `
 Service/LivestreamApp.Apps.Test/bin/Release/LivestreamApp.Apps.Test.dll `
 Service/LivestreamApp.Server.Test/bin/Release/LivestreamApp.Server.Test.dll `
 Service/LivestreamApp.Shared.Test/bin/Release/LivestreamApp.Shared.Test.dll `
 --result=Service/TestRunner/NUnitResults.xml

Write-Host Restore client npm packages
Set-Location Client
npm install

Write-Host Build client
ng build --prod --deploy-url /app/ --base-href /app/

Write-Host Run client tests
ng test --watch=false

Write-Host Copy client files
Copy-Item -Path dist/* -Destination ../Service/bin/Release/Client -Recurse -Force

pause