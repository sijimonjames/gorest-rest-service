# gorest-rest-service
To automate CRUD services in https://gorest.co.in/ using Javascript, Plywright and / or Jest library (optional).

## System requirements
- Node.js 18+
- Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
 - macOS 13 Ventura, or later.
- Debian 12, Ubuntu 22.04, Ubuntu 24.04, on x86-64 and arm64 architecture.

## Installation
- Visual studio code is used as IDE, you can choose IDE of your choice.
- Verify node js and install / update if not found and add to PATH.
```
[mac]download and install node js then
>> export PATH=$PATH:/usr/local/bin
```
- to install playwright, run below command in the IDE terminal / command line. official website is https://playwright.dev/

clone project from;

https://github.com/sijimonjames/gorest-rest-service-tests.git

### For existing project / from a repo clone
use command:
```
npm ci
```

### For a new project
Type below commant in your IDE terminal
```
>> npm init playwright@latest
```

### install Faker data

npm install @faker-js/faker --save-dev

fake data is used to create user, as data is not so important for the api.

## Run tests

```
npx playwright test
npx playwright test --debug
```
### To show playwright report

```
npx playwright show-report
```


## CI-CD

Git hub actions will be invoked and run all tests when a push / update repo is done. This can be found under the actions tab of Github

https://github.com/sijimonjames/gorest-rest-service-tests/actions
