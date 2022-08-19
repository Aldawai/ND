const express = require('express');
const fs = require("fs");
const app = express();

app.use(express.urlencoded({extended: false}));

let datas = {
	"users": [
		{
			"firstname": "Dawaï",
			"lastname": "Boubakari",
			"age": 20,
			"profession": "Développer"
		},
		{
			"firstname": "Madi",
			"lastname": "Vaniguil",
			"age": 27,
			"profession": "Ingenieur en reseau"
		},
		{
			"firstname": "Nom",
			"lastname": "Prénom",
			"age": 20,
			"profession": "profession"
		},
		{
			"firstname": "Nom",
			"lastname": "Prénom",
			"age": 20,
			"profession": "profession"
		},
		{
			"firstname": "Nom",
			"lastname": "Prénom",
			"age": 20,
			"profession": "profession"
		},
		{
			"firstname": "Nom",
			"lastname": "Prénom",
			"age": 20,
			"profession": "profession"
		}
	]
};

let data = '';
let apiTest;

async function Lire(){
	data = '';
	// Create a readable stream
	var readerStream = fs.createReadStream('donnees.json');
	// Set the encoding to be utf8.
	readerStream.setEncoding('UTF8');
	// Handle stream events --> data, end, and error
	readerStream.on('data', function(chunk) {
		data += chunk;
	});
	readerStream.on('end',function(){
		let the_data = JSON.parse(data);
		for (var i = 0; i < the_data.users.length; i++) {
			const reponse = the_data.users[i];
			apiTest = app.get(`/api/test/${i}`, (req, res) => {
				cors(req, res);
				res.send(reponse);
			});
		}
		console.log(the_data);
	});
	readerStream.on('error', function(err){
		console.log(err.stack);
	});
}

function Ecrire(content) {
	var writerStream = fs.createWriteStream('donnees.json');
	writerStream.write(content, 'utf8');
	writerStream.end();
	// Handle stream events --> finish, and error
	writerStream.on('finish', function() {
		console.log("Write completed.");
		console.log(content);
		Lire();
	});

	writerStream.on('error', function(err){
		console.log(err.stack);
	});
}

Lire();
app.get('/', (req, res) => {
	let data_test;
	data_test = JSON.parse(data);
	console.log(data, data_test);
	cors(req, res);
	// res.setHeader('Access-Control-Allow-Origin', '*');
	res.send(data_test);
})

app.post('/', (req, res) => {
	cors(req, res);
	let reponse = Object.getOwnPropertyNames(req.body);
	res.send(JSON.parse(reponse));
	console.log(JSON.parse(reponse));
})

app.post('/reg', (req,res)=>{
	cors(req, res);
	let reponse = Object.getOwnPropertyNames(req.body);
	let repo = JSON.parse(reponse);
	console.log(data);
	let don = JSON.parse(data),
	prenom = repo.prenom,
	nom = repo.nom,
	email = repo.email,
	age = repo.age,
	password = repo.password,
	nouveau = {
		"prenom": prenom,
		"nom": nom,
		"email": email,
		"age": age,
		"password": password
	};
	don.users.push(nouveau);
	Ecrire(JSON.stringify(don));
	res.send('success !');
});

app.post('/delete', (req,res)=>{
	// cors(req,res);
	let theNew = [];
	console.log(req.body);
	// console.log(`${req.body.nom} Deleted`);
	if (data !== undefined) {
		for (var i = 0; i < JSON.parse(data).users.length; i++) {
			const e = JSON.parse(data).users[i];
			console.log(e);	
			let nomF = req.body.nom;
			if (nomF.match(e.firstname)) {} else{
				theNew.push(e);
			}
		}
	}
	let nouv = theNew;
	let nouve = {};
	nouve.users = nouv;
	Ecrire(JSON.stringify(nouve)); 
});

const cors = (req, res) => {
//http://localhost:5500/
	res.setHeader('Access-Control-Allow-Origin', '*');
	// res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');
	// res.writeHead(200, {
	// 	'Content-Type': 'text/html'
	// };
};


module.exports = app;