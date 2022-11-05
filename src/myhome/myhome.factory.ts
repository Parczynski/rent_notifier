import { Estate } from '../classes/estate'
import { EstateFactory } from '../classes/estateFactory'


export interface MyHomeEstateResponse {
	price: string,
	product_id: string,
	photo: string,
	photos_count: string,
	order_date: string,
	area_size: string,
	floor: string,
	rooms: string,
	bedrooms: string,
	photo_ver: string,
	name_json: string,
	pathway_json: string
}

export class MyHomeFactory extends EstateFactory {

	convert( data: MyHomeEstateResponse ): Estate {
		const name_json = JSON.parse( data.name_json )
		const pathway_json = JSON.parse( data.pathway_json )

		return this.create( {
			id: data.product_id,
			price: parseInt( data.price ),
			address: `${name_json.ru}, ${pathway_json.ru}`,
			phone: '',
			images: Array( parseInt( data.photos_count ) ).fill( '' ).map( ( v, i ) => `https://static.my.ge/myhome/photos/${data.photo}/thumbs/${data.product_id}_${i+1}.jpg?v=${data.photo_ver}` ),
			description: '',
			link: `https://www.myhome.ge/ru/pr/${data.product_id}/`,
			rooms: parseInt( data.rooms ),
			bedrooms: parseInt( data.bedrooms ),
			area: parseInt( data.area_size ),
			date: new Date( data.order_date ),
			floor: parseInt( data.floor )
		} )
	}

}