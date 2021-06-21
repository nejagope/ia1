
var idNodo = 0;

var matriz = [
        ['a', 'c', 1], ['a', 'e', 3], ['a', 'b', 4]
       ,['b', 'a', 4], ['b', 'e', 2], ['b', 'd', 5]
       ,['c', 'a', 1], ['c', 'e', 2], ['c', 'd', 3]
       ,['d', 'b', 5], ['d', 'c', 3], ['d', 'e', 1]
       ,['e', 'a', 3], ['e', 'b', 2], ['e', 'c', 2], ['e', 'd', 1]
    ];

function getDistancia(n1, n2){    
    for (var i = 0; i < matriz.length; i++){
        //console.log(matriz[i])
        var v = matriz[i];
        if (v[0] == n1 && v[1] == n2){
            //console.log(`hallada distancia de ${n1} a ${n2}: ${v[2]}`);
            return v[2];
        }        
    }       
    return -1;
}

/*
Nodo: 
    id: int
    valor: char (a, b, c, d, e)
    peso (int)
    ruta(array valores por ej. ['a', 'b'])
    visitado (bool)
    nodo Padre
*/
function crearNodo(valor, padre){
    var nodo =  {
        id: idNodo++,
        valor: valor,                
        visitado: false,
        padre: padre,
        getSucesores: function(){
            var sucesores = [];
            for (var i = 0; i < matriz.length; i++){                
                var v = matriz[i];
                if (v[0] == this.valor){                    
                    sucesores.push(crearNodo(v[1], this));
                }        
            }              
            return sucesores;
        }
    };
    if (padre){
        if (padre.ruta.length > 0){
            nodo.ruta = [];
            padre.ruta.forEach(v => nodo.ruta.push(v));
            nodo.ruta.push(valor);
        }else{
            nodo.ruta = [valor];
        }

        nodo.peso = padre.peso +  getDistancia(padre.valor, valor);
    }else{
        nodo.ruta = [valor];
        nodo.peso = 0;
    }
    
    return nodo;
        
}

function onlyUnique(nodo, index, self) {    
    for (var i = 0; i < self.length; i++){
        if (self[i].valor == nodo.valor && i == index){
            return true;
        }else if (self[i].valor == nodo.valor){
            return false;
        }
    }
    return false;
}


function crearArbol(){
     
    
    var lista = [];
    var valorInicial = 'a';
    lista.push(crearNodo(valorInicial, null));
    printLista(lista);
    
    let i = 0;
    var dot = '{';
    dot += `n${lista[0].id} [label="${lista[0].valor}"];`;

    while (lista.length > 0 && lista.length < 100 && i < 100){
        //if (!confirm('x'))
          //  break;
        var primerNodo = lista.shift();
        dot += `n${primerNodo.id} [label="${primerNodo.valor}"];`

        if (primerNodo.valor == valorInicial && primerNodo.ruta.length > 4){
            console.log(`hallada ruta ideal....:`)
            console.log(primerNodo.ruta);
            break;
        }else{
            var sucesores = primerNodo.getSucesores();
            //console.log(`sucesores de ${primerNodo.valor}: `)
            //console.log(sucesores);
            var unique = sucesores.filter(onlyUnique);
            unique.forEach((n, indx, self) => {
                dot += `n${n.id} [label="${n.valor}"];`;
                dot += `n${primerNodo.id} -> n${n.id} [label="${n.peso}"];`;
                if (n.valor == valorInicial 
                    && n.ruta.length > 4
                    && n.ruta.includes('a')
                    && n.ruta.includes('b')
                    && n.ruta.includes('c')
                    && n.ruta.includes('d')
                    && n.ruta.includes('e')
                    ){
                    print('Hallada ruta ideal');
                    console.log(`Hallada ruta ideal`)
                    console.log(n.ruta);
                    i = 100000000;
                }else if (n.valor != valorInicial){
                    lista.push(n);
                }
            });            
            lista.sort((n1, n2) => n1.peso - n2.peso);
        } 
        printLista(lista);      
        
        i++;
    }
    dot += '}';
    print(dot);
    return dot;
}

function printLista(lista){
    var html = '<p>';
    lista.forEach(n => {
        html += `${n.valor} (${n.peso}), `
    });
    html += '</p>'
    $("#divConsola").append(html);
}

function print(msg){
    var html = `<p>${msg}</p>`
    $("#divConsola").append(html);
}