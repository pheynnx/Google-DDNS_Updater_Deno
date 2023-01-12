# Google Dynamic DNS Updater Deno

## Start:

#### Setup domain list

1. Create a file in the folder root called 'domains.ts'
2. Setup an array of objects called 'domains' (see example below)
3. Fill the object will your Google DDNS credentials
4. Add as many objects in the array as needed for different hostnames
5. Export the domain array as default

```bash
// Example domains.ts file
const domains = [
  {
    hostname: '',
    username: '',
    password: '',
  },
];

export default domains;
```

6. Make sure you have Deno installed and run the command below

```bash
deno run --allow-read --allow-net Google-DDNS.ts
```

## Tools:

- Deno
- Base64
- Color

## How to run it with PM2 in a cron job

`pm2 start Google-DDNS.ts --interpreter="deno" --interpreter-args="run -A" --no-autorestart --instances 1 --cron "*/30 * * * *" --name DDNS-Deno`

#### This with rerun the script every 30 minutes; adjust the `*/30 * * * *` part to change the frequency
