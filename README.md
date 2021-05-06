# Red Hat Professional Services Automation Front 

## NodeJS Version

Must be 10 must be version 10 or later

## Configure Environment

Set Hostname for relevant environment in `.env.dev` and `.env.prod`

## Setup

App created using Patternfky Seed Project - see `README-Patternfly.md` for more details

Install development/build dependencies
`npm install`

Start the development server
`npm run start:dev`

Run a production build
`npm run build`



## Local Dev

* dev / tested using node 10.15.0

* run local sso server

* run local backend

* npm i

* npm run start:dev

* in browser navigate to `http://localhost:9000/contractor-onboarding`

## React

Using version 16+ of React

Use FunctionalComponents and hooks rather than Class Compenents

## Dependencies

* axios
* react-async
* @patternfly/react-table 
* @react-keycloak/web  
* keycloak-js
* @patternfly/react-topology
* react-hook-form

## Local SSO Setup
see https://gitlab.consulting.redhat.com/contractor-onboarding/contractor-onboarding-parent/-/blob/master/README.md for local SSO setup

import the sso/keycloak from `ssoConfig/realm-contractor-onboarding.json`

sso config / component is in `src/app/services/sso/SSOProvider.tsx`

the App is wrapped in `src/app/index.tsx`

axios headers and interceptor bearer auth token set in `src/app/services/httpService/HttpService.tsx`

## INJECTING VARIABLES IN BUILD PROCESS

https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5

Webpack has been configured to inject env variables during the build processes for both Dev and Prod builds.  

### Steps:

1. Configure variables in `.env.dev` and `.env.prod` files.  Name variables as `REACT_APP_<NAME>` e.g.
    ```
    REACT_APP_HOSTNAME=https://www.some.openshift.link
    REACT_APP_SSO_URL=https://sso-con-on-a.mike-ocp-4-459768-8e403d02da27f23cda259248b817e83d-0000.eu-gb.containers.appdomain.cloud/auth

    ```

2. In code, reference variables as `process.env.REACT_APP_<NAME>` e.g. 

    ```
    const host = process.env.REACT_APP_HOSTNAME || 'http://localhost:8280'
    ```

    ```
    const keycloak = new Keycloak({
        realm: 'contractor-onboarding',
        url: process.env.REACT_APP_SSO_URL || 'http://localhost:8880/auth',
        clientId: 'contractor-onboarding'
    })
    ```
3. To build for Dev environment run `npm run start:dev` - Project will start locally on port 9000

4. To build for Prod environment run `npm run build` - Project will be built into `./dist` folder

## INJECTING VARIABLES INTO CONTAINER ON OPENSHIFT

For Openshift deployments, as an alternative to configuring env variables before build, config values can be set in `src/config.json`

`config.sys` should then be mounted into the built website root folder in the Openshift container throught the Deployment Config, where is can be read using an AJAX call on startup by `src/app/utils/config.ts`

## THEMEING THE WHITELABEL SOLUTION FOR SPECIFIC CLIENTS
<hr >
The initial task to theme the React app came from IKEA. See below for the list of changes and the files affected. A future piece of work is to simplify this down to a 'zero' development effort so that this can be themed and deployed with a minimal number of configurations passed to a script.

## Themeing Changes
<hr >  

### Index.html `src/index.html`

Added font face to adhere to client design guidelines:  

```
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet" />
```

### App.css `src/app/app.css`

Adding global styles here. Apply the font face from above:  

```
    font-family: 'Noto Sans', sans-serif;
```

Adding background colour of white  
```
.pf-c-page {
    background-color: rgb(255, 255, 255);
}

.table-wrapper {
    padding: var(--pf-c-page__main-section--PaddingTop);
    background-color: rgb(255, 255, 255);
}
```

### Logo `src/app/assets/images/ikea-logo.png`

Added client logo

### Header.css `src/app/components/header.css`

Added border to logo and colour changes on some elements to match client colour scheme:

```
.pf-c-page__header {
    background-color: rgb(00,51,153);
}

.pf-c-page__header-nav {
    background-color: #003399;
}

.pf-c-brand {
    ...
    border: 1px solid rgb(255,204, 00);
    padding: 0px;
}

.h-title {
    color: rgb(255,204, 00);
    ...
}

.pf-m-current {
    color: rgb(255,204, 00) !important;
}

.pf-c-nav.pf-m-horizontal {
    --pf-c-nav__link--hover--Color: rgb(255,204, 00);
    --pf-c-nav__link--active--Color: rgb(255,204, 00);
    --pf-c-nav__link--focus--Color: rgb(255,204, 00);
    --pf-c-nav__link--m-current--Color: rgb(255,204, 00);
    --pf-c-nav__link--before--BorderColor: gb(255,204, 00);
}
```

### Header.tsx `src/app/components/header.tsx`

Add newly added image (logo):

```
import rH from '@app/assets/images/ikea-logo.png';
```

### CaseDetail.tsx `src/app/pages/caseDetail.tsx`

Add colour customisations to `Stepper` element:

```
<Stepper
    ...
    completeBarColor={'#003399'}
    activeColor={'#003399'}
    completeColor={'#003399'}
    completeTitleColor={'#003399'}
/>
```

### Cases.tsx `src/app/pages/cases.tsx`

Add colour customisations to Icons:

```
<Select
    toggleIcon={<FilterIcon color="#003399"/>}
    ...
>
...
<Select
    <SearchIcon color="#003399"/>
    ...
>
```

### Dashboard.css `src/app/pages/Dashboard`

Adding colours and border to Dashboard elements:

```
.active-qqq:after {
    ...
    border-color: rgb(0, 51, 153) transparent transparent;
}

.pf-c-page__main-section {
    background-color: white;
}

.pf-c-card {
    border: 1px solid rgb(00,51,153);
}

```

### Procedures.css `src/app/pages/procedures.css`

Adding custom colours:

```
.pf-c-button.pf-m-secondary {
    background-color: rgb(255,204, 00) !important;
}
```

