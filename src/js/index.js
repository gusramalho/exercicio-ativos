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
	},

	update : function(id, value){
		this.ativos = this.ativos.map(ativo => (ativo.id == id) ? {...ativo, value} : ativo);
	}
}


const names = ["sparta", "ciclico", "fi", "multimercado", "top", "previdencia", 
							 "advisory", "icatu", "renda", "fixa", "crédito", "privado", 
							 "petrobras", "pn"];
							 
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


function generateRandomAtivo(){
				
	return new Ativo(0, randomName(), randomValue());

}


function createAtivoElement(ativo){
	
	let tr = document.createElement('tr');

	let checkBox = document.createElement("input");
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
	inputValue.setAttribute('value', ativo.value);

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



const changeTotalEvent = () => {

}


function main(){

	for (let i=0; i<3; i++){
		manager.add(generateRandomAtivo());
		console.log(manager.ativos);
	}

	let total = manager.total();
	document.querySelector('#total').value =  total;
	document.querySelector('#porcentagem_total').innerHTML = "100 %";
	document.querySelector('#restante').innerHTML = '(Restante: 0,00)';
	document.querySelector('#qtsAtivos').innerHTML = `(${manager.ativos.length})`;


	manager.ativos.map(ativo => { 
		document.querySelector('#table_ativos').appendChild(createAtivoElement(ativo));
		document.querySelector('#percent' + ativo.id).value = (ativo.value / total * 100).toFixed(2);

		document.querySelector('#value' + ativo.id).addEventListener("change", e => {
			const id = e.target.id.split('value')[1];
			manager.update(id, e.target.value);
			let restante = document.querySelector("#total").value - manager.total();
			document.querySelector('#restante').innerHTML = `(Restante: ${restante.toFixed(2)})`;	

		})
 
	});

	document.querySelector("#btnAdd").addEventListener("click", () => {

		const ativo = new Ativo(0, randomName(), 0);
		manager.add(ativo);
		document.querySelector("#table_ativos").appendChild(createAtivoElement(ativo));
		document.querySelector('#percent' + ativo.id).value = (ativo.value / manager.total() * 100).toFixed(2);
	});


	const inputTotal = document.querySelector('#total');

	inputTotal.addEventListener("change", event => { 
			let restante = event.target.value - total;
			document.querySelector('#restante').innerHTML = `(Restante: ${restante.toFixed(2)})`;	
	});






}

main();
















