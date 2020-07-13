# Google Dynamic DNS Updater (DENO)

## Start:

- Setup environmental variables

```bash
deno run --allow-read --allow-net Google-DDNS.ts
```

## Tools:

- Deno
- Base64
- Color

## Environmental Variables:

##### ./config.env

```bash
D1_HOST=
D1_USER=
D1_PASS=

D2_HOST=
D2_USER=
D2_PASS=
```

#### Add as many sets of variables you need for as many domains you need updated

#### Make sure to adjustthe domains array to reflect your number of domains
