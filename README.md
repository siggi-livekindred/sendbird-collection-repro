
# Sendbird Collection Error Repro

## Setup
Locate Sendbird Application ID and update .env (see .env.example)
https://dashboard.sendbird.com/
```shell
echo "EXPO_PUBLIC_SENDBIRD_APP_ID=<token>" > .env   
```

## Run

```shell
npm install
npx pod-install ios
npx expo run:ios
```

## Usage
Example app assumes users and channels exists.
User ID, Access Tokens and Channel URLs can be acquired via the Sendbird Dashboard.

https://dashboard.sendbird.com/
