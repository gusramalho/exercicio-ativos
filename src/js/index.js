class Ativo {
	constructor(id, name, value) {
		this.id = id;
		this.name = name;
		this.value = value;
	}
}

const names = ["sparta", "ciclico", "fi", "multimercado", "top", "previdencia", 
							 "advisory", "icatu", "renda", "fixa", "crédito", "privado", 
							 "petrobras", "pn"];

var currentId = 0;
var ativos = [];
var teste = [ 1, 2, 3];

function generateRandomName(){
	let name = "";
	let c = Math.floor(Math.random() * 4) + 1;
	
	for (let i = 0; i < c; i++){
		name += names[Math.floor(Math.random() * names.length)];
		name += (i != c-1) ? " " : "";
	}

	return name;
}

function generateRandomValue(){
	return (Math.random() * 10000 + 100).toFixed(2);
}

function generateRandomAtivo(){
	return new Ativo(currentId++, generateRandomName(), generateRandomValue());
}

function main(){

	for (let i=0; i<3; i++){
		ativos = [...ativos, generateRandomAtivo()];
		console.log(ativos);
	}



}

main();
















