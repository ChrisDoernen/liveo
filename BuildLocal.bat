@echo off

echo Restore nuget packages
nuget Restore Service/Service.sln
nuget Install NUnit.ConsoleRunner -Version 3.9.0 -OutputDirectory Service/TestRunner

echo Build solution
msbuild /p:Configuration=Release Service/Service.sln

echo Run tests
cd Service/TestRunner/NUnit.ConsoleRunner.3.9.0/tools
nunit3-console.exe ../../../../Service/LivestreamApp.Api.Test/bin/Release/LivestreamApp.Api.Test.dll^
 ../../../../Service/LivestreamApp.Apps.Test/bin/Release/LivestreamApp.Apps.Test.dll^
 ../../../../Service/LivestreamApp.Server.Test/bin/Release/LivestreamApp.Server.Test.dll^
 ../../../../Service/LivestreamApp.Shared.Test/bin/Release/LivestreamApp.Shared.Test.dll

pause