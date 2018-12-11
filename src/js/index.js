class Ativo {
	constructor(id, name, value) {
		this.id = id;
		this.name = name;
		this.value = value;
	}
}

const manager = {
	currentId : 0,
	ativos : [],

	total : function(){
		//return this.ativos.reduce((total, ativo) => total + ativo.value);
		let total = 0;
		for (let i=0; i<this.ativos.length; i++)
			total += this.ativos[i].value;
		return total;
	},

	add : function(ativo){
		ativo.id = this.currentId++;
		this.ativos = [...this.ativos, ativo];
	},

	remove : function(id){
		this.ativos = this.ativos.filter(ativo => ativo.id != id);
	}
}

function generateRandomAtivo(){

	const names = ["sparta", "ciclico", "fi", "multimercado", "top", "previdencia", 
								 "advisory", "icatu", "renda", "fixa", "crédito", "privado", 
								 "petrobras", "pn"];
									
	return new Ativo(0, randomName(), randomValue());

	function randomName(){
		let name = "";
		let c = Math.floor(Math.random() * 4) + 1;
		
		for (let i = 0; i < c; i++){
			name += names[Math.floor(Math.random() * names.length)];
			name += (i != c-1) ? " " : "";
		}
	
		return name;
	}

	function randomValue(){
		return parseFloat((Math.random() * 10000 + 100).toFixed(2));
	}
}


function createAtivoElement(ativo){
	
	let tr = document.createElement('tr');

	let checkBox = document.createElement("checkbox");
	checkBox.setAttribute('type', 'checkbox');

	let tdCheckBox = document.createElement('td');
	tdCheckBox.appendChild(checkBox);

	let tdNomeAtivo = document.createElement('td');
	tdNomeAtivo.setAttribute('id', 'nome_ativo');
	tdNomeAtivo.setAttribute('class', 'right-border');
	tdNomeAtivo.appendChild(document.createTextNode(ativo.name));
	
	let inputValue = document.createElement('input');
	inputValue.setAttribute('id', 'value' + ativo.id);
	inputValue.setAttribute('type', 'number');

	let tdValue = document.createElement('td');
	tdValue.appendChild(document.createTextNode("R$"));
	tdValue.appendChild(inputValue);

	let inputPercent = document.createElement('input');
	inputPercent.setAttribute('id', 'percent' + ativo.id);
	inputPercent.setAttribute('type', 'number');

	let tdPercent = document.createElement('td');
	tdPercent.setAttribute('class', 'right-border');
	tdPercent.appendChild(inputPercent);

	let btnExcluir = document.createElement('button');
	btnExcluir.setAttribute('id', 'exluir' + ativo.id);
	btnExcluir.appendChild(document.createTextNode("X"));

	let tdExcluir = document.createElement('td');
	tdExcluir.setAttribute('class', 'hidden-button');
	tdExcluir.append(btnExcluir);

	tr.appendChild(tdCheckBox);
	tr.appendChild(tdNomeAtivo);
	tr.appendChild(tdValue);
	tr.appendChild(tdPercent);
	tr.appendChild(tdExcluir);

	return tr;
}
 
function main(){

	for (let i=0; i<3; i++){
		manager.add(generateRandomAtivo());
		console.log(manager.ativos);
	}


	manager.ativos.map(ativo => document.querySelector("#table_ativos").appendChild(createAtivoElement(ativo)));
}

main();
















