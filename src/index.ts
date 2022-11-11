import { Collection } from './collection'
import { MyHomeCatalog } from './myhome/myhome'
import { InAppStorage } from './storage/inapp'
import dotenv from 'dotenv'
import { Telegram } from './handlers/telegram'

( async() => {

	dotenv.config()

	const storage = new InAppStorage()

	const handler = new Telegram( process.env.TG_TOKEN )

	process.env.TG_CHATS.split( ',' ).map( chat => handler.addChat( chat ) )

	const collection = new Collection( handler, storage )

	const myhome = new MyHomeCatalog( {
		cities: 8742159,
		OwnerTypeID: 1,
		FPriceTo: 650,
		e: '776481390.776472116.776471185.777654897.776734274.776998491.776460995.776458944.776463102.77646544'
	} )

	collection.addCatalog( myhome )

	console.log( 'Initial scan...' )
	await collection.init()

	console.log( 'Scan complete. Waiting for updates...' )

	const check = async () => {

		try {
			await collection.check()
			setTimeout( check, parseInt( process.env.INTERVAL ) )
		} catch( e ) {
			console.log( e )
		}
		
	}

	setTimeout( check, parseInt( process.env.INTERVAL ) )

} )()