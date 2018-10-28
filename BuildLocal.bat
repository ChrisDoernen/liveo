@echo off

echo Restore service nuget packages
nuget Restore Service/Service.sln
nuget Install NUnit.ConsoleRunner -Version 3.9.0 -OutputDirectory Service/TestRunner

echo Build service solution
msbuild /p:Configuration=Release Service/Service.sln

echo Run service tests
"Service/TestRunner/NUnit.ConsoleRunner.3.9.0/tools/nunit3-console.exe"^
 Service/LivestreamApp.Api.Test/bin/Release/LivestreamApp.Api.Test.dll^
 Service/LivestreamApp.Apps.Test/bin/Release/LivestreamApp.Apps.Test.dll^
 Service/LivestreamApp.Server.Test/bin/Release/LivestreamApp.Server.Test.dll^
 Service/LivestreamApp.Shared.Test/bin/Release/LivestreamApp.Shared.Test.dll^
 --result=Service/TestRunner/NUnitResults.xml

echo Restore client npm packages
cd Client
call npm install

echo Build client
call ng build --prod --deploy-url /app/ --base-href /app/

echo Run client tests
call ng test --watch=false

echo Copy client files
Xcopy /E /I /Y dist "../Service/bin/Release/Client"

pause