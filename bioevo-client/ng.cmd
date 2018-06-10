@echo off
setlocal
set PATH=%~dp0target/node/;%PATH%
%~dp0node_modules/@angular/cli/bin/ng %*
@echo on