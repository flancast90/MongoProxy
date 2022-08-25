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

## Usage
Assuming the API key is passed to the application, the following actions will help you get quickstarted with MongoProxy.
1. Add any Mongoose schemas you have to the ``schemas.mjs`` file. **As of now, schema names MUST be what they are referred to in requests! (for example, ``mongoose.schema('users')`` expects a schema of ``var users`` in ``schemas.mjs``**
2. Configure your request to point at ``/proxy/query`` as type "POST"
3. Ensure your API key is included in an ``x-api-key`` header.
4. Configure the request body to include the "mongoQuery" key:value as such (the value can include any valid mongoose function):
   ```js
   {
    "mongoQuery": "await mongoose.model('users').findOne({ username: 'flancast90@gmail.com' })"
    }
    ```
4. Send it! Any errors will be reported back in the ``error`` field.

## Contributing
Contributions to this repo are encouraged via PR or Issues, and will be merged after review. 

## License
MIT