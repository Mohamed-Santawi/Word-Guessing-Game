@echo off
setlocal
set "MAVEN_OPTS=-Xmx512m"

echo Cleaning and compiling project...
call .\mvnw.cmd clean compile
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to compile project >&2
    goto :error
)

echo Running WordInit.java to create words.ser...
call .\mvnw.cmd exec:java@init-words
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to run WordInit.java >&2
    goto :error
)

echo Running ScoreInit.java to create scores.ser...
call .\mvnw.cmd exec:java@init-scores
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to run ScoreInit.java >&2
    goto :error
)

echo Verifying words.ser...
if exist "..\data\words.ser" (
    echo Success: words.ser created at ..\data\words.ser
) else (
    echo Error: words.ser not found >&2
    goto :error
)

echo Verifying scores.ser...
if exist "..\data\scores.ser" (
    echo Success: scores.ser created at ..\data\scores.ser
) else (
    echo Error: scores.ser not found >&2
    goto :error
)

goto :end

:error
set ERROR_CODE=1
exit /b %ERRORLEVEL%

:end
endlocal
exit /b 0