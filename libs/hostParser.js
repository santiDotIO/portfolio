require('dotenv').config();
class hostParser {
	
	constructor(VIRTUAL_HOST,PORT){
		let host = VIRTUAL_HOST || 'localhost';
		this.hostArray = host.split(',')
		this.cleanHost = '';
		
		if ( host == 'localhost' ) {
			return this.localhostString(PORT)
		}

		return this.makeHostString()

	}

	localhostString(port){
		console.log('localhostString');
		this.cleanHost = `http://localhost:${port}`;
	}
	
	makeHostString(){

		this.hostArray.forEach((hostname, index)=>{
			let newLine = (index !== this.hostArray.length-1)? '\n':'';
			this.cleanHost += `http://${hostname}/${newLine}`;
		})
	}

	log(){
		console.log(this.cleanHost);
	}

	isProd(prodHostName){
		let expression = new RegExp(prodHostName, 'g')
		return expression.test(this.cleanHost);
	}
}

module.exports = new hostParser(process.env.VIRTUAL_HOST, process.env.PORT);