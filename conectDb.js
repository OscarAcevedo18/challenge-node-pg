require('dotenv').config()
const { Pool } = require('pg')

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
}
// patron Singleton instance
const Singleton = (() => {
	let instance
	function createInstance() {
		const classObj = new Pool(config)
		return classObj
	}
	return {
		getInstance: () => {
			if (!instance) {
				instance = createInstance()
				console.log(' Nueva conexión a la base de datos establecida')
			} else {
				console.log('Establecida la conexión a la base de datos')
			}
			return instance
		},
	}
})()
module.exports = Singleton;