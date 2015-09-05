liggeran
========

How are you doing compared to your co-workers?
Most companies practice a silent _no transparency_ rule when it comes to wages. This only benefits the company and is not in the interest of the workers. That's what _liggeran_ want's to solve, by making it more transparent.

Add your email, years of work experience and current salary. Then compare with others from the same company.
You email is never disclosed and is only used to verify that you work for the company.


[![Build Status](https://travis-ci.org/liggeran/liggeran.png)](https://travis-ci.org/liggeran/liggeran)
[![Dependency Status](https://david-dm.org/liggeran/liggeran.png)](https://david-dm.org/liggeran/liggeran)
[![devDependency Status](https://david-dm.org/liggeran/liggeran/dev-status.png)](https://david-dm.org/liggeran/liggeran#info=devDependencies)
[ ![Codeship Status for liggeran/liggeran](https://codeship.com/projects/61994c30-5c77-0132-88d4-3269830c2e14/status)](https://codeship.com/projects/50853)


## Installing and running locally

### DB setup

	- Install Postgresql for your platform
	- Create the database ```createdb liggeran```
	- Add the uuid-ossp extensions for creating UUIDs
	```$ psql -d liggeran -c 'create extension "uuid-ossp"'```
	$ psql -h localhost -d liggeran -f plugins/liggeran-user/sql/database.sql

### Making the Node stuff work

	$ npm install
	$ npm start

## Testing

	$ npm test

## Deploying

The application is running on [Heroku](http://www.heroku.com), to deploy you must have access application. Then add the Heroku remote:

	$ npm test
	$ git remote add heroku git@heroku.com:liggeran-org.git
	# When you've made some update
	$ git push heroku master

The application is running on [http://www.liggeran.org](http://www.liggeran.org).
## Technology

### Postgresql

We deal with structured data, hence it made sense.

### Hapi

Easy to create modular service APIs

### MQTT

We use [mosca](https://github.com/mcollina/mosca) and [mqtt](https://www.npmjs.com/package/mqtt) for simple messaging
between the plugins and services instead of relying on just Hapi.

## Contributing?

Come join [our Slack](https://liggeran.slack.com/)

Read the project docs about things like [i18n](i18n.md).

I'd love for people to contribute, as I only have so much time. Here are some of the contributors:

* [jarib](//github.com/jarib)
* [sveisvei](//github.com/sveisvei)
* [ivarconr](//github.com/ivarconr)
* [thomanil](//github.com/thomanil)
* [elisabethirgens](//github.com/elisabethirgens)
