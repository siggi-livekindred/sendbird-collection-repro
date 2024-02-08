
# Sendbird Collection Error Repro

## Setup
Locate Sendbird Application ID and update .env (see .env.example)
https://dashboard.sendbird.com/
```shell
echo "SENDBIRD_APP_ID=<token>" > .env   
```

## Run

```shell
npm install
npx pod-install ios
npx expo run:ios
```
