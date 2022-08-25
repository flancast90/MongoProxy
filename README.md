# MongoProxy
> A simple, lightweight MongoDB Atlas proxy for circumstances where work firewall is blocking connection.

## Use-Cases
This script is built to be used in **NON-PRODUCTION** environments where a firewall is blocking the needed MongoDB ports (see https://stackoverflow.com/questions/27505665/hack-for-mongo-db-connection-refused-due-to-blocked-port-errno-10061), which seems to happen in many work/school environments. Please note that the script is the product of about 30 minutes of work, and as such is buggy and not optimized. In addition to this, only JS-specific methods work, utilizing the Mongoose library only.

## Setup
1. ``$ npm install``
2. ``$ npm start``
#### Credential Setup
1. The following environment variables must be configured for the script to work:
- ``mongoHost``: string like 'cluster0.nadsfi.mongodb.net'
- ``mongoPassword``: your Atlas DB-specific password
- ``mongoUser``: the DB-specific username (generally 'Admin')
- ``secret``: the Key for MongoProxy to require in requests to authenticate them. This must be present in the headers of the requesting-client as ``x-api-key``.

## Contributing
Contributions to this repo are encouraged via PR or Issues, and will be merged after review. 

## License
MIT