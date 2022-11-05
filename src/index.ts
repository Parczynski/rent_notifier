import { Collection } from './collection'
import { ConsoleHandler } from './handlers/console'
import { MyHomeCatalog } from './myhome/myhome'
import { InAppStorage } from './storage/inapp'
import dotenv from 'dotenv'

( async() => {

	dotenv.config()

	const storage = new InAppStorage()

	const handler = new ConsoleHandler()

	const collection = new Collection( handler )

	const myhome = new MyHomeCatalog( storage, {} )

	collection.addCatalog( myhome )

	await collection.init()

	const check = async () => {
		await collection.check()
		// setTimeout( check, parseInt( process.env.INTERVAL ) )
	}

	setTimeout( check, parseInt( process.env.INTERVAL ) )

} )()