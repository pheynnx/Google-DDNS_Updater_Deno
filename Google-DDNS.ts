// Created by Ericarthurc
// Version 0.0.2
// Last updated: 7/13/2020

import * as base64 from 'https://denopkg.com/chiefbiiko/base64/mod.ts';
import clc from 'https://deno.land/x/color/index.ts';

// Array of Google Dynamic DNS credentials
import domains from './domains.ts';

// Sends GET request for public IP
const response = await fetch('https://domains.google.com/checkip');
// Parses GET response as plain text; contains public IP
const publicIp = await response.text();

// Loops through array and communicates with Googles API
for (let i = 0; i < domains.length; i++) {
  // Google requires base64 authentication; encodes username and password
  // Authentication format = 'Basic base64[username:password]'
  const encoded = base64.fromUint8Array(
    new TextEncoder().encode(`${domains[i].username}:${domains[i].password}`)
  );

  // Sends POST request using authentication; public IP is set from URL query
  const setResponse = await fetch(
    `https://domains.google.com/nic/update?hostname=${domains[i].hostname}&myip=${publicIp}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encoded}`,
      },
    }
  );

  // Parses POST response as plain text
  const updateResponse = await setResponse.text();

  // Switch statment for console feedback
  switch (updateResponse) {
    case 'nohost':
    case 'badauth':
    case 'notfqdn':
    case 'badagent':
    case 'abuse':
    case '911':
    case 'conflict A':
    case 'conflict AAAA':
      console.log(
        `${clc.blue.text(domains[i].hostname)}: ${clc.red.text(updateResponse)}`
      );
      break;

    case `nochg ${publicIp}`:
      console.log(
        `${clc.blue.text(domains[i].hostname)}: ${clc.yellow.text(
          updateResponse
        )}`
      );
      break;
    default:
      console.log(
        `${clc.blue.text(domains[i].hostname)}: ${clc.green.text(
          updateResponse
        )}`
      );
      break;
  }
}

// Clears console color without new line
Deno.stdout.write(new TextEncoder().encode(clc.reset.text('')));
